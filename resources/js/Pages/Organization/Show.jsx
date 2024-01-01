import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Container, Grid, Paper } from "@mantine/core";
import OrganizationInfo from "./Partials/OrganizationInfo";
import DetailInfo from "./Partials/DetailInfo";

export default function Show({ auth }) {
    const { organization } = usePage().props;

    return (
        <Authenticated user={auth.user}>
            <Head title="Organization Show" />

            <div className="p-4 pr-6">
                <Container my="md" fluid>
                    <Grid>
                        <Grid.Col span={{ base: 12, xl: 3 }}>
                            <OrganizationInfo item={organization} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xl: 9 }}>
                            <DetailInfo organization={organization} />
                        </Grid.Col>
                    </Grid>
                </Container>
            </div>
        </Authenticated>
    );
}
