import { Button } from "antd";
// import { CgWebsite } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "src/utils/helpers";

type Props = {
  setUser: (user: any) => void;
  user: any;
};

const AppHeader = ({ user, setUser }: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setUser(undefined);
    navigate("/admin", { replace: true });
  };

  return (
    <div>
      {user ? (
        <div className="py-4 flex flex-col lg:flex-row lg:items-center gap-2">
          <NavLink className="px-0 md:px-4" to="/admin/profile" type="link">
            {user.username}
          </NavLink>
          <Button type="primary" onClick={handleLogout}>
            Cerrar sesion
          </Button>
        </div>
      ) : (
        <>
          <NavLink
            to="/admin"
            style={{
              padding: "6px 16px",
              background: "#1677ff",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
              marginRight: "8px",
              display: "inline-block",
            }}
          >
            Login
          </NavLink>
          <NavLink
            style={{
              padding: "6px 16px",
              background: "#fff",
              color: "#000",
              borderRadius: "4px",
              textDecoration: "none",
              marginRight: "8px",
              display: "inline-block",
            }}
            to="/admin/signup"
            type="primary"
          >
            SignUp
          </NavLink>
        </>
      )}
    </div>
  );
};

export default AppHeader;
