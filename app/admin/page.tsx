import {AdminContextProvider} from "@/components/admin/AdminContextProvider";
import {AdminSubscriber} from "@/components/admin/AdminSubscriber";
import {UserManagement} from "@/components/admin/UserManagement";

export default function AdminPage() {
    return <AdminContextProvider>
        <AdminSubscriber />
        <UserManagement />
    </AdminContextProvider>;
}