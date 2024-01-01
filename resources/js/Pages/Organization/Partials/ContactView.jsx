import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useDisclosure } from "@mantine/hooks";
import {
    Alert,
    Avatar,
    Button,
    Group,
    Modal,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import {
    IconAt,
    IconInfoCircle,
    IconPhoneCall,
    IconPlus,
} from "@tabler/icons-react";
import axios from "axios";
import classes from "./css/ContactList.module.css";

export default function ContactView({ organizationId }) {
    const theme = useMantineTheme();
    const [formType, setFormType] = useState("create");
    const [contacts, setContacts] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);

    const { data, setData, reset, processing } = useForm({
        organization_ids: organizationId,
        id: "",
        name: "",
        email: "",
        phone: "",
    });

    const items = contacts.map((item, index) => (
        <UnstyledButton
            key={index}
            bg={theme.colors["blue"][1]}
            onClick={() => {
                setFormType("edit");
                open();
                editContact(item.id);
            }}
        >
            <Group wrap="nowrap">
                <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                    size={94}
                    radius="md"
                />
                <div>
                    <Text fz="lg" fw={500} className={classes.name}>
                        {item.name}
                    </Text>

                    <Group wrap="nowrap" gap={10} mt={3}>
                        <IconAt
                            stroke={1.5}
                            size="1rem"
                            className={classes.icon}
                        />
                        <Text fz="xs" c="dimmed">
                            {item.email}
                        </Text>
                    </Group>

                    <Group wrap="nowrap" gap={10} mt={5}>
                        <IconPhoneCall
                            stroke={1.5}
                            size="1rem"
                            className={classes.icon}
                        />
                        <Text fz="xs" c="dimmed">
                            {item.phone}
                        </Text>
                    </Group>
                </div>
            </Group>
        </UnstyledButton>
    ));

    const fetchContact = async () => {
        const { data } = await axios.get(
            route("organization.contact.list", { organization: organizationId })
        );

        setContacts(data.contacts);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiEndPoint =
            formType === "create"
                ? route("organization.contact.store", {
                      organization: organizationId,
                  })
                : route("organization.contact.update", {
                      organization: organizationId,
                      contact: data.id,
                  });

        try {
            const response = await (formType === "create"
                ? axios.post
                : axios.put)(apiEndPoint, data);

            //Change this log to react-hot-toast
            console.log(response.data.message);
            console.log(response);
            if (response.status === 200) {
                reset();
                close();
                fetchContact();
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const editContact = async (id) => {
        const { data } = await axios.get(
            route("organization.contact.edit", {
                organization: organizationId,
                contact: id,
            })
        );

        setData({
            organization_ids: organizationId,
            id: data.contact.id || "",
            name: data.contact.name || "",
            email: data.contact.email || "",
            phone: data.contact.phone || "",
        });
    };

    useEffect(() => {
        fetchContact();
    }, []);

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => {
                    reset();
                    close();
                }}
                title="Contact Form"
                centered
            >
                <form onSubmit={handleSubmit}>
                    <Stack>
                        <TextInput
                            label="Organization Id"
                            value={data.organization_ids}
                            required
                            disabled
                        />

                        <TextInput
                            label="Name"
                            placeholder="Name"
                            value={data.name}
                            onChange={(event) =>
                                setData("name", event.target.value)
                            }
                            required
                        />

                        <TextInput
                            label="Email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(event) =>
                                setData("email", event.target.value)
                            }
                            required
                        />

                        <TextInput
                            label="Phone"
                            placeholder="Phone"
                            value={data.phone}
                            onChange={(event) =>
                                setData("phone", event.target.value)
                            }
                            required
                        />
                    </Stack>

                    <Button type="submit" mt="md" disabled={processing}>
                        {formType === "create" ? "Save" : "Update"}
                    </Button>
                </form>
            </Modal>

            <Button
                leftSection={<IconPlus size={16} />}
                onClick={() => {
                    setFormType("create");
                    open();
                }}
            >
                Add Contact
            </Button>

            <SimpleGrid mt="md" cols={{ base: 1, md: 3, xl: 4 }}>
                {items}
            </SimpleGrid>

            {items.length === 0 && (
                <Alert
                    color="blue"
                    title="Organization contact"
                    icon={<IconInfoCircle />}
                >
                    No contact data found
                </Alert>
            )}
        </>
    );
}
