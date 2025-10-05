import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import SideBar from "../../components/common/SideBar";
import Footer from "../../components/common/Footer";
import {
  RiDashboardHorizontalFill,
  RiNotificationBadgeFill,
} from "react-icons/ri";
import { BiSolidMessageDetail } from "react-icons/bi";

function StudentLayout() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <RiDashboardHorizontalFill className="me-2 fs-4 greenText " />,
    },
    {
      name: "Notice",
      icon: <RiNotificationBadgeFill className="me-2 fs-4 greenText" />,
    },
    {
      name: "Message",
      icon: <BiSolidMessageDetail className="me-2 fs-4 greenText" />,
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isSidebarOpen]);

  return (
    <div>
      <div className="d-flex flex-column min-vh-100">
        <Header onToggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="d-flex flex-grow-1">
          <div className="d-none d-sm-block col-sm-2 col-md-3 col-lg-2 bg-light">
            <div className="h-100">
              <SideBar menuItems={menuItems} />
            </div>
          </div>
          <Outlet />
          <div
            className={`d-sm-none mobile-sidebar-overlay ${
              isSidebarOpen ? "show" : ""
            }`}
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden={!isSidebarOpen}
          >
            <div
              className="mobile-sidebar-content bg-light"
              onClick={(e) => e.stopPropagation()}
            >
              <SideBar
                onClose={() => setIsSidebarOpen(false)}
                menuItems={menuItems}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default StudentLayout;
