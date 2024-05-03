import { Link } from "@inertiajs/react";
import {
    Avatar,
    Button,
    Container,
    Flex,
    Group,
    Paper,
    SimpleGrid,
    Table,
    Text,
    ThemeIcon,
} from "@mantine/core";
import { IconAccessible, IconEdit, IconPower } from "@tabler/icons-react";

export default function DeviceList({ data }) {
    const getColorForAlerts = (key, value) => {
        switch (key) {
            case "critical":
                return value > 0 ? "red" : "grey";
            case "warning":
                return value > 0 ? "yellow" : "grey";
            case "info":
                return value > 0 ? "blue" : "grey";
            default:
                return "black";
        }
    };

    const items =
        data.length > 0 ? (
            data.map((item, index) => (
                <Table.Tr key={item.id}>
                    <Table.Td>
                        <Group wrap="nowrap">
                            <Avatar src={item.avatar} size={70} radius={0} />
                            <div>
                                <Link
                                    href={route("device.show", { id: item.id })}
                                >
                                    <Text fz="sm" fw={500}>
                                        {item.machine_name}
                                    </Text>
                                </Link>
                                <Text fz="xs">{item.organization_ids}</Text>
                                <Text fz="xs" c="dimmed">
                                    {item.last_login}
                                </Text>
                            </div>
                        </Group>
                    </Table.Td>
                    <Table.Td>
                        <Group
                            gap={3}
                            wrap="nowrap"
                            justify="center"
                            align="center"
                        >
                            <IconPower
                                size={16}
                                color={
                                    item.status == "Online" ? "green" : "red"
                                }
                            />
                            <Text fz="sm" mt={2}>
                                {item.status}
                            </Text>
                        </Group>
                    </Table.Td>
                    <Table.Td>
                        <SimpleGrid cols={3} spacing="xs">
                            {Object.entries(item.alerts).map(([key, value]) => (
                                <Flex
                                    direction="column"
                                    align="center"
                                    justify="center"
                                    key={key}
                                >
                                    <ThemeIcon
                                        size={30}
                                        radius={60}
                                        variant="light"
                                        color={getColorForAlerts(key, value)}
                                    >
                                        {value}
                                    </ThemeIcon>
                                    <Text
                                        fz="xs"
                                        fw={700}
                                        mt={5}
                                        c={value > 0 ? "" : "dimmed"}
                                    >
                                        {key.charAt(0).toUpperCase() +
                                            key.substring(1)}
                                    </Text>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </Table.Td>
                    <Table.Td>
                        <Group gap={3} wrap="nowrap">
                            <IconEdit size={16} />
                            <Text fz="sm" mt={5}>
                                Manage ( {item.avail_patch} )
                            </Text>
                        </Group>
                    </Table.Td>
                    <Table.Td ta="center">
                        <Button
                            leftSection={<IconAccessible />}
                            variant="default"
                            radius={60}
                            size="sm"
                            disabled
                        >
                            Try to connect
                        </Button>
                    </Table.Td>
                    <Table.Td ta="center">
                        <Button variant="default" radius={60} size="sm">
                            Manage
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ))
        ) : (
            <Table.Tr>
                <Table.Td colSpan={10} ta="center">
                    No devices listed.
                </Table.Td>
            </Table.Tr>
        );
    return (
        <Table.ScrollContainer minWidth={800} mt="md">
            <Table striped highlightOnHover withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th ta="center">Details</Table.Th>
                        <Table.Th ta="center">Availability</Table.Th>
                        <Table.Th>Alerts</Table.Th>
                        <Table.Th>Available Patches</Table.Th>
                        <Table.Th ta="center">Remote Access</Table.Th>
                        <Table.Th ta="center">Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>{items}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}
