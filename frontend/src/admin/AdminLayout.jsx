import AdminHeader from "./AdminHeader";

function AdminLayout({children}){
    return(
        <div className="admin-layout">
            <AdminHeader/>
            <main className="admin-main">
                {children}
            </main>
        </div>
    );
}
export default AdminLayout;