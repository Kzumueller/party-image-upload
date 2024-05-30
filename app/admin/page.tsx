import {AdminContextProvider} from "@/components/admin/AdminContextProvider";
import {AdminSubscriber} from "@/components/admin/AdminSubscriber";
import {UsersTable} from "@/components/admin/UsersTable";

export default function AdminPage() {
    return <AdminContextProvider>
        <AdminSubscriber />
        <UsersTable />
    </AdminContextProvider>;
}