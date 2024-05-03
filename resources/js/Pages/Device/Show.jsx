import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button, Container, Flex, Grid, Menu, Text } from "@mantine/core";
import Header from "./Partials/Header";
import SystemInformation from "./Partials/SystemInfomation";
import { useDisclosure } from "@mantine/hooks";
import PowershellUI from "./Partials/PowershellUI";
import PatchView from "./Partials/Patch/PatchView";

export default function Show({ auth, device, disks, usages }) {
    const [patchOpened, { open: openPatch, close: closePatch }] =
        useDisclosure(false);
    const [powerShellOpened, { open: openPowerShell, close: closePowerShell }] =
        useDisclosure(false);

    const closeModal = () => {
        closePowerShell();
        closePatch();
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Device Agent" />

            <div className="p-1">
                <Container my="sm" fluid>
                    <Flex
                        direction={{ base: "column", sm: "row" }}
                        rowGap={{ base: "md" }}
                        justify="space-between"
                        align="center"
                        mt="md"
                    >
                        <Text fz="xl" fw={700}>
                            {device.machine_name}
                        </Text>

                        <div>
                            <Menu withArrow position="bottom">
                                <Menu.Target>
                                    <Button variant="default">Manage</Button>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item onClick={openPatch}>
                                        Patch Management
                                    </Menu.Item>

                                    <Menu.Divider />

                                    <Menu.Item>Command Prompt</Menu.Item>
                                    <Menu.Item onClick={openPowerShell}>
                                        Powersheel
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>

                            <Button variant="default">Edit</Button>
                        </div>
                    </Flex>

                    <Header data={device} />

                    {/* Chart  */}

                    <SystemInformation device={device} disks={disks} usages={usages} />

                    {powerShellOpened && (
                        <PowershellUI
                            user={auth.user}
                            machine={device}
                            opened={powerShellOpened}
                            closeModal={closeModal}
                        />
                    )}

                    {patchOpened && (
                        <PatchView
                            user={auth.user}
                            machine={device}
                            opened={patchOpened}
                            closeModal={closeModal}
                        />
                    )}
                </Container>
            </div>
        </Authenticated>
    );
}
