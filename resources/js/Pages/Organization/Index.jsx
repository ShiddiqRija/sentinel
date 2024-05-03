import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import OrganizationList from "./Partials/OrganizationList";

export default function Index({ auth, organizations }) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Orgaization" />

            <div className="p-1">
                <OrganizationList data={organizations.data} />
            </div>
        </Authenticated>
    );
}
