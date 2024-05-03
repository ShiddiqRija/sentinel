import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Container, Grid, Paper } from "@mantine/core";
import OrganizationInfo from "./Partials/OrganizationInfo";
import DetailInfo from "./Partials/DetailInfo";

export default function Show({ auth, organization, devices }) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Organization Show" />

            <div className="p-1">
                <Container my="sm" fluid>
                    <Grid>
                        <Grid.Col span={{ base: 12, xl: 2.5 }}>
                            <OrganizationInfo item={organization} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xl: 9.5 }}>
                            <DetailInfo organization={organization} devices={devices} />
                        </Grid.Col>
                    </Grid>
                </Container>
            </div>
        </Authenticated>
    );
}
