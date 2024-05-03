import { Box, Modal, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { host } from "@/Utils/Socket";
import PoweShellContainer from "./PowerShell/PowerShellContainer";

export default function PowershellUI({
    user,
    machine,
    opened,
    closeable = true,
    closeModal = () => {},
}) {
    const socket = useRef();
    const [currentCommand, setCurrentCommand] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setCurrentUser(user);
        setCurrentCommand(machine);
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-agent", currentUser.id);
            socket.current.emit("send-cmd", {
                recipient: currentCommand.id,
                sender: user.id,
                message: "Initiate Powershell",
                shell: "powershell",
                type: "init-shell",
            });
            setOpen(true);
        }
    }, [currentUser]);

    const handleCommandChange = (command) => {
        setCurrentCommand(command);
    };

    const close = () => {
        if (closeable) {
            socket.current.emit("send-cmd", {
                recipient: currentCommand.id,
                sender: user.id,
                message: "Terminate Powershell",
                shell: "powershell",
                type: "dispose-shell",
            });
            closeModal();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={machine.machine_name + " - PowerShell"}
            size="70%"
        >
            {open && (
                <PoweShellContainer
                    currentCommand={currentCommand}
                    socket={socket}
                    user={user}
                />
            )}
        </Modal>
    );
}
