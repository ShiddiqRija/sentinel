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
import { IconCheck, IconRefresh, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function AvailableTable({
    socket,
    user,
    machine,
    patchesList,
    refresh,
    reload,
}) {
    const getWU = () => {
        socket.current.emit("send-cmd", {
            recipient: machine.id,
            sender: user.id,
            message: "Request Windows Update Information",
            type: "get-wua",
        });

        refresh(true);
    };

    const installWU = async (item) => {
        socket.current.emit("send-cmd", {
            recipient: machine.id,
            sender: user.id,
            message: item.title,
            type: "run-wua",
        });

        const { data } = await axios.put(
            route("device.patch.install", { patches: item.id })
        );

        if (data.status == "success") {
            reload(true);
        }
    };

    const items = patchesList.map((item) => (
        <Table.Tr key={item.title}>
            <Table.Td w={450}>{item.title}</Table.Td>
            <Table.Td w={300}>{item.classification}</Table.Td>
            <Table.Td>{item.support_product}</Table.Td>
            <Table.Td>{item.file_size}</Table.Td>
            <Table.Td>
                {item.rebootRequired ? <IconCheck size={14} /> : ""}
            </Table.Td>
            <Table.Td>{item.is_present && "Available"}</Table.Td>
            <Table.Td ta="center">
                <Button radius={60} size="sm" onClick={(e) => installWU(item)}>
                    Install
                </Button>
            </Table.Td>
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
                    <Text fz="sm">
                        Last updated:{" "}
                        {patchesList.length > 0
                            ? dayjs(patchesList[0].created_at).fromNow() > 24
                                ? patchesList[0].created_at
                                : dayjs(patchesList[0].created_at).fromNow()
                            : "-"}
                    </Text>

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
                            <Table.Th>Size</Table.Th>
                            <Table.Th>Reboot Required</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th ta="center">Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>{items}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Container>
    );
}
