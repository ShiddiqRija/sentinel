import { Paper, Tabs, rem } from "@mantine/core";
import { IconDeviceDesktop, IconUsers } from "@tabler/icons-react";
import ContactView from "./ContactView";
import DeviceView from "./DeviceView";

export default function DetailInfo({ organization }) {
    const iconStyle = { width: rem(12), height: rem(12) };

    return (
        <Paper shadow="md" p="xs">
            <Tabs variant="outline" defaultValue="devices">
                <Tabs.List>
                    <Tabs.Tab
                        value="contacts"
                        leftSection={<IconUsers style={iconStyle} />}
                    >
                        Contacts
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="devices"
                        leftSection={<IconDeviceDesktop style={iconStyle} />}
                    >
                        Devices
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="contacts" mt="md">
                    <ContactView organizationId={organization.id} />
                </Tabs.Panel>

                <Tabs.Panel value="devices" mt="md">
                    <DeviceView />
                </Tabs.Panel>
            </Tabs>
        </Paper>
    );
}
