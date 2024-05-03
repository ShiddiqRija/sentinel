import {
    Button,
    Container,
    Flex,
    Group,
    Table,
    Text,
    TextInput,
    rem,
} from "@mantine/core";
import { IconRefresh, IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";

export default function InstalledTable({ socket, user, machine, patchesList }) {
    const getWU = () => {
        socket.current.emit("send-cmd", {
            recipient: machine.id,
            sender: user.id,
            message: "Request Windows Update Information",
            type: "get-wua",
        });
    };

    const items = patchesList.map((item) => (
        <Table.Tr key={item.title}>
            <Table.Td w={450}>{item.title}</Table.Td>
            <Table.Td w={300}>{item.classification}</Table.Td>
            <Table.Td>{item.support_product}</Table.Td>
            <Table.Td>{dayjs(item.date).format("MMM D, YYYY")}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Container my="md" fluid>
            <Flex
                direction={{ base: "column", sm: "row" }}
                rowGap={{ base: "md" }}
                justify="space-between"
                align="center"
                mt="md"
            >
                <TextInput
                    placeholder="Search..."
                    leftSectionPointerEvents="none"
                    leftSection={
                        <IconSearch
                            style={{ width: rem(16), height: rem(16) }}
                        />
                    }
                    onChange={(event) => {
                        console.log(event.target.value);
                    }}
                />

                <Group>
                    <Text fz="sm">Last updated: a minute ago</Text>

                    <Button
                        variant="default"
                        leftSection={<IconRefresh size={14} />}
                        onClick={getWU}
                    >
                        Refresh
                    </Button>
                </Group>
            </Flex>
            <Table.ScrollContainer minWidth={800} mt="md">
                <Table highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Classification</Table.Th>
                            <Table.Th>Supported Products</Table.Th>
                            <Table.Th>Installed Date</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>{items}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
}
