import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import OrganizationList from "./Partials/OrganizationList";

export default function Index({ auth }) {
    const { organizations } = usePage().props;

    return (
        <Authenticated user={auth.user}>
            <Head title="Orgaization" />

            <div className="p-4 pr-6">
                <OrganizationList data={organizations.data} />
            </div>
        </Authenticated>
    );
}
