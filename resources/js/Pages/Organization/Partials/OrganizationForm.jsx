import { useForm, usePage } from "@inertiajs/react";
import {
    Button,
    FileInput,
    Group,
    Paper,
    Stack,
    TextInput,
} from "@mantine/core";
import { useEffect } from "react";

export default function OrganizationForm({ type }) {
    const { organization } = usePage().props;
    const { data, setData, post, put, errors, processing } = useForm({
        id: "",
        name: "",
        phone: "",
        fax: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        logo: null,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (type === "create") {
            post(route("organization.store"));
        } else {
            put(route("organization.update", { id: data.id }));
        }
    };

    useEffect(() => {
        if (type === "edit") {
            setData({
                id: organization.id,
                name: organization.name || "",
                phone: organization.phone || "",
                fax: organization.fax || "",
                address: organization.address || "",
                city: organization.city || "",
                state: organization.state || "",
                zip: organization.zip || "",
                country: organization.country || "", 
            });
        }
    }, []);

    return (
        <Paper radius="md" p="xl" withBorder>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <TextInput
                        label="Name"
                        placeholder="Organization Name"
                        value={data.name}
                        onChange={(event) =>
                            setData("name", event.target.value)
                        }
                        required
                        error={errors.name}
                    />

                    <TextInput
                        label="Phone"
                        placeholder="Phone Number"
                        value={data.phone}
                        onChange={(event) =>
                            setData("phone", event.target.value)
                        }
                        required
                        error={errors.phone}
                    />

                    <TextInput
                        label="Fax"
                        placeholder="Fax Number"
                        value={data.fax}
                        onChange={(event) => setData("fax", event.target.value)}
                        error={errors.fax}
                    />

                    <TextInput
                        label="Address"
                        placeholder="Address"
                        value={data.address}
                        onChange={(event) =>
                            setData("address", event.target.value)
                        }
                        required
                        error={errors.address}
                    />

                    <Group grow>
                        <TextInput
                            label="City"
                            placeholder="City"
                            value={data.city}
                            onChange={(event) =>
                                setData("city", event.target.value)
                            }
                            required
                            error={errors.city}
                        />

                        <TextInput
                            label="State"
                            placeholder="State"
                            value={data.state}
                            onChange={(event) =>
                                setData("state", event.target.value)
                            }
                            required
                            error={errors.state}
                        />
                    </Group>

                    <Group grow>
                        <TextInput
                            label="Zip"
                            placeholder="Zip"
                            value={data.zip}
                            onChange={(event) =>
                                setData("zip", event.target.value)
                            }
                            required
                            error={errors.zip}
                        />

                        <TextInput
                            label="Country"
                            placeholder="Country"
                            value={data.country}
                            onChange={(event) =>
                                setData("country", event.target.value)
                            }
                            required
                            error={errors.country}
                        />
                    </Group>

                    <FileInput
                        label="Logo"
                        placeholder="Organization Logo"
                        value={data.logo}
                        onChange={(event) => setData("logo", event)}
                        error={errors.logo}
                    />
                </Stack>

                <Button type="submit" mt="md" disabled={processing}>
                    Save
                </Button>
            </form>
        </Paper>
    );
}
