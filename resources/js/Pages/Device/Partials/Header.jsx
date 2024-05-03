import {
    Anchor,
    Button,
    Grid,
    Group,
    Paper,
    SimpleGrid,
    Text,
} from "@mantine/core";

export default function Header({ data }) {
    return (
        <Paper p="sm" radius="sm" mt="sm" withBorder>
            <Grid justify="center" align="center">
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Grid>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            <Text
                                fz="sm"
                                fw={700}
                                ta={{ base: "start", lg: "end" }}
                            >
                                Machine Name
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            <Text fz="sm" ta="start">
                                {data.machine_name}
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Grid mt={-15}>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            <Text
                                fz="sm"
                                fw={700}
                                ta={{ base: "start", lg: "end" }}
                            >
                                Workgroup
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            <Text fz="sm" ta="start">
                                {data.domain}
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Grid mt={-15}>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            <Text
                                fz="sm"
                                fw={700}
                                ta={{ base: "start", lg: "end" }}
                            >
                                Availability Monitoring
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            <Text fz="sm" ta="start">
                                Disabled Edit
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Grid mt={-15}>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            <Text
                                fz="sm"
                                fw={700}
                                ta={{ base: "start", lg: "end" }}
                            >
                                Device Added
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            <Text fz="sm" ta="start">
                                {data.created_at}
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Grid mt={-15}>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            <Text
                                fz="sm"
                                fw={700}
                                ta={{ base: "start", lg: "end" }}
                            >
                                Last Seen
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            <Text fz="sm" ta="start">
                                Now
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Grid mt={-15}>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            <Text
                                fz="sm"
                                fw={700}
                                ta={{ base: "start", lg: "end" }}
                            >
                                Last Logged User
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            <Text fz="sm" ta="start">
                                {data.user_logon} (Since: {data.last_logon})
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Grid mt={-15}>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            <Text
                                fz="sm"
                                fw={700}
                                ta={{ base: "start", lg: "end" }}
                            >
                                Last Reboot Time
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            <Text fz="sm" ta="start">
                                {data.last_reboot}
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Grid mt={-15}>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            <Text
                                fz="sm"
                                fw={700}
                                ta={{ base: "start", lg: "end" }}
                            >
                                IP Address
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            <Text fz="sm" ta="start">
                                {data.network.map((item) =>
                                    item.is_primary != "" ? item.ip_address : ""
                                )}
                            </Text>
                        </Grid.Col>
                    </Grid>
                    <Grid mt={-15}>
                        <Grid.Col span={{ base: 12, lg: 5 }}>
                            <Text
                                fz="sm"
                                fw={700}
                                ta={{ base: "start", lg: "end" }}
                            >
                                Organization
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 7 }}>
                            <Text fz="sm">
                                <Anchor
                                    href={route("organization.show", {
                                        id: data.organization.id,
                                    })}
                                    fz="sm"
                                >
                                    {data.organization.name}
                                </Anchor>
                            </Text>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 5 }} offset={1}>
                    <SimpleGrid cols={6}>
                        <Button>0</Button>
                        <Button>0</Button>
                        <Button>0</Button>
                        <Button>0</Button>
                        <Button>0</Button>
                        <Button>0</Button>
                    </SimpleGrid>
                </Grid.Col>
            </Grid>
        </Paper>
    );
}
