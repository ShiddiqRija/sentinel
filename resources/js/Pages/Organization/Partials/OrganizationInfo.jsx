import { router } from "@inertiajs/react";
import { Button, Grid, Group, Image, Paper, Space, Text } from "@mantine/core";

export default function OrganizationInfo({ item }) {
    return (
        <Grid>
            <Grid.Col span={{ base: 6, xl: 12 }}>
                <Paper
                    shadow="md"
                    p="sm"
                    radius="sm"
                    className="space-y-1"
                    align="center"
                >
                    {item.logo ? (
                        <Image
                            src={`../${item.logo}`}
                            p="sm"
                            h={200}
                            w="auto"
                        />
                    ) : (
                        <Image
                            radius="md"
                            src={null}
                            h={200}
                            fallbackSrc="https://placehold.co/600x400?text=Organzation+Logo"
                        />
                    )}

                    <Space h="md" />
                    <Text fz="sm">Organzation Name</Text>
                    <Text fw={150} c="dimmed">
                        {item.name}
                    </Text>
                </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 6, xl: 12 }}>
                <Paper shadow="md" p="sm" radius="sm" className="space-y-1">
                    <Text fz="sm" fw={700}>
                        Address
                    </Text>
                    <Text fw={150} c="dimmed">
                        {item.address}
                    </Text>

                    <Text fz="sm" fw={700}>
                        City
                    </Text>
                    <Text fw={150} c="dimmed">
                        {item.city}
                    </Text>

                    <Text fz="sm" fw={700}>
                        State
                    </Text>
                    <Text fw={150} c="dimmed">
                        {item.state}
                    </Text>

                    <Text fz="sm" fw={700}>
                        Zip
                    </Text>
                    <Text fw={150} c="dimmed">
                        {item.zip}
                    </Text>
                    <Text fz="sm" fw={700}>
                        Country
                    </Text>
                    <Text fw={150} c="dimmed">
                        {item.country}
                    </Text>
                </Paper>

                <Button
                    mt="xs"
                    fullWidth
                    onClick={() =>
                        router.visit(
                            route("organization.edit", { id: item.id })
                        )
                    }
                >
                    Edit Organization
                </Button>
            </Grid.Col>
        </Grid>
    );
}
