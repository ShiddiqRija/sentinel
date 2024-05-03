import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeviceList from "./Partials/DeviceList";
import { Container, Paper } from "@mantine/core";

export default function Index({ auth, devices }) {
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Devices" />

            <div className="p-1">
                <Container my="sm" fluid>
                    <Paper p="sm" radius="sm" withBorder>
                        <DeviceList data={devices.data} />
                    </Paper>
                </Container>
            </div>
        </AuthenticatedLayout>
    );
}
