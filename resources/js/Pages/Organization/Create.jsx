import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import OrganizationForm from "./Partials/OrganizationForm";

export default function Create({ auth }) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Create Organization" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <OrganizationForm type="create" />
                </div>
            </div>
        </Authenticated>
    );
}
