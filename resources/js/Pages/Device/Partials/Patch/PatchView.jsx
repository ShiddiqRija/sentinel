import { Button, Modal, Tabs, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import AvailableTable from "./AvailableTable";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { host } from "@/Utils/Socket";
import InstalledTable from "./InstalledTable";

export default function PatchView({
    user,
    machine,
    opened,
    closeable = true,
    closeModal = () => {},
}) {
    const socket = useRef();
    const [refresh, setRefresh] = useState(false);
    const [reload, setReload] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [patchesInstalled, setPatchesInstalled] = useState([]);
    const [patchesAvail, setPatchesAvail] = useState([]);

    const fetchPatches = async () => {
        const response = await fetch(
            route("device.patches", { device: machine.id })
        );
        const data = await response.json();
        setPatchesInstalled([]);
        setPatchesAvail([]);

        data.patches.map((patch) => {
            console.log(patch);
            if (patch.type === "installed") {
                setPatchesInstalled((prevInstalled) => [
                    ...prevInstalled,
                    patch,
                ]);
            } else if (patch.type === "available") {
                setPatchesAvail((prevAvail) => [...prevAvail, patch]);
            }
        });
    };

    useEffect(() => {
        setCurrentUser(user);
        fetchPatches();
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-agent", user.id);
        }
    }, [currentUser]);

    useEffect(() => {
        if (refresh) {
            socket.current.on("patches-res", (message) => {
                if (message) {
                    fetchPatches();
                }

                setRefresh(false);
            });
        }
        if (reload) {
            fetchPatches();
        }
    }, [refresh, reload]);

    const close = () => {
        if (closeable) {
            closeModal();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={`Patch Management for ${machine.machine_name}`}
            size="100%"
        >
            <Text fz="sm">View and install available Windows updates</Text>

            <Tabs variant="default" defaultValue="available" mt="md">
                <Tabs.List>
                    <Tabs.Tab value="available">
                        Available Patches (
                        {patchesAvail ? patchesAvail.length : 0})
                    </Tabs.Tab>
                    <Tabs.Tab value="installed">
                        Installed Patches (
                        {patchesInstalled ? patchesInstalled.length : 0})
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="available">
                    {patchesAvail && (
                        <AvailableTable
                            socket={socket}
                            user={user}
                            machine={machine}
                            patchesList={patchesAvail}
                            refresh={setRefresh}
                            reload={setReload}
                        />
                    )}
                </Tabs.Panel>
                <Tabs.Panel value="installed">
                    {patchesInstalled && (
                        <InstalledTable
                            socket={socket}
                            user={user}
                            machine={machine}
                            patchesList={patchesInstalled}
                        />
                    )}
                </Tabs.Panel>
            </Tabs>
        </Modal>
    );
}
