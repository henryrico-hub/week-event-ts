import { Outlet } from "react-router-dom";
import Header from "src/components/Admin/AdminHead";
import Footer from "../Footer";
// import AppHeader from "../Admin/AdminHeader";

function AdminLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default AdminLayout;
