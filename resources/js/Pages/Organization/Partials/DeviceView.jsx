import { Group, Table, Text, TextInput, rem } from "@mantine/core";
import { IconPower, IconSearch } from "@tabler/icons-react";

const data = [
    {
        name: "WIN-0001",
        user_login: "Admin",
        email: "rob_wolf@gmail.com",
        rate: 22,
        status: "online",
    },
    {
        name: "WIN-0001",
        user_login: "Admin",
        email: "rob_wolf@gmail.com",
        rate: 22,
        status: "online",
    },
    {
        name: "WIN-0001",
        user_login: "Admin",
        email: "rob_wolf@gmail.com",
        rate: 22,
        status: "offline",
    },
    {
        name: "WIN-0001",
        user_login: "Admin",
        email: "rob_wolf@gmail.com",
        rate: 22,
        status: "online",
    },
];

export default function DeviceView() {
    const items = data.map((item, index) => (
        <Table.Tr key={index}>
            <Table.Td>
                <Group gap="sm">
                    <IconPower
                        size={40}
                        color={item.status == "online" ? "green" : "red"}
                    />
                    <div>
                        <Text fz="sm" fw={500}>
                            {item.name}
                        </Text>
                        <Text c="dimmed" fz="xs">
                            {item.user_login}
                        </Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.email}</Text>
                <Text fz="xs" c="dimmed">
                    Email
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">${item.rate.toFixed(1)} / hr</Text>
                <Text fz="xs" c="dimmed">
                    Rate
                </Text>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <div>
                <TextInput
                    placeholder="Search..."
                    leftSectionPointerEvents="none"
                    leftSection={
                        <IconSearch
                            style={{ width: rem(16), height: rem(16) }}
                        />
                    }
                    onChange={(event) => {
                        console.log("Search");
                    }}
                />
            </div>

            <Table.ScrollContainer minWidth={800} mt="sm">
                <Table verticalSpacing="md">
                    <Table.Tbody>{items}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
}
