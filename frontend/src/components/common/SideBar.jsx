import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const SideBar = ({ onClose, menuItems }) => {
  const { logout } = useContext(AuthContext);
  const otherItems = [
    { name: "Profile", icon: <FaUser className="me-2 fs-4 greenText" /> },
    { name: "Setting", icon: <IoSettings className="me-2 fs-4 greenText" /> },
    { name: "Log out", icon: <TbLogout2 className="me-2 fs-4 greenText" /> },
  ];

  return (
    <div className="flex-shrink-0 p-2 sidebar vh-100 px-md-3 bg-light">
      <ul className="list-unstyled">
        {/* Menu Section */}
        <li>
          <div className="text-muted small d-none d-md-inline">Menu</div>
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={`${item.name.toLowerCase()}`}
                  className={({ isActive }) =>
                    `link-body-emphasis p-2 d-inline-flex align-items-center text-decoration-none w-100 ${
                      isActive ? "sideBarActive" : ""
                    }`
                  }
                  onClick={onClose}
                >
                  {item.icon}
                  <span className="fs-6 d-sm-none d-md-inline">
                    {item.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </li>

        <li className="border-top my-3"></li>

        {/* Other Section */}
        <li>
          <div className="text-muted small d-none d-md-inline">Other</div>
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            {otherItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  // to={`/${item.name.toLowerCase().replace(" ", "-")}`}
                  to={`/`}
                  className={({ isActive }) =>
                    `link-body-emphasis p-2 d-inline-flex align-items-center text-decoration-none w-100 ${
                      isActive ? "sideBarActive" : ""
                    }`
                  }
                  onClick={logout}
                >
                  {item.icon}
                  <span className="fs-6 d-sm-none d-md-inline">
                    {item.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
