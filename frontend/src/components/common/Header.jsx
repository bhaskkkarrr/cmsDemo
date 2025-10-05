import { BiSolidMessageDetail } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import styles from "./Header.module.css";
import { RiMenuLine } from "react-icons/ri";

const Header = ({ onToggleSidebar }) => {
  return (
    <div className="px-3 py-2 bg-light headerSt">
      <div className="container-fluid flex-wrap d-flex justify-content-between align-items-center px-0">
        <div className="container-fluid flex-wrap d-flex justify-content-between justify-content-md-start align-items-center col-10 col-md-7">
          <div className="d-flex align-items-center me-md-4 me-lg-5">
            {/* user icon for >= sm */}
            <FaUser className="fs-1 d-none d-sm-block blueText" />

            {/* menu icon only on xs */}
            <RiMenuLine
              className="fs-1 d-sm-none ms-2 "
              onClick={onToggleSidebar}
              style={{ cursor: "pointer" }}
              aria-label="Open menu"
            />

            <a
              href="/"
              className="fs-4 fw-semibold d-none blueTextd-md-inline text-decoration-none  ms-lg-3"
            ></a>
          </div>

          <div className="flex items-center border pl-3 gap-2 bg-greenish-tint border-gray-500/30 h-[46px] rounded-md overflow-hidden max-w-md col-10 rounded-5 col-md-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 30 30"
              fill="#6B7280"
            >
              <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
            </svg>
            <input
              type="text"
              placeholder="Search for products"
              className="w-full h-full outline-none text-sm"
            />
          </div>
        </div>

        <div className="text-end col-2 col-md-5">
          <ul className="nav col-12 col-lg-auto my-2 justify-content-center justify-content-md-end align-items-center my-md-0 text-small">
            <li
              className={`rounded-circle d-none d-md-flex me-3 d-flex justify-content-center align-items-center ${styles.icon}`}
              style={{ backgroundColor: "#227C9D" }}
            >
              <a href="#" className="text-light">
                <BiSolidMessageDetail className="fs-4" />
              </a>
            </li>
            <li
              className={`rounded-circle d-none d-md-flex me-3 d-flex justify-content-center align-items-center ${styles.icon}`}
              style={{ backgroundColor: "#227C9D" }}
            >
              <a href="#" className="text-light">
                <IoMdNotifications className="fs-4" />
              </a>
            </li>
            <li>
              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li className="nav-item d-flex align-items-center">
                  <div className="me-2 d-none text-end d-md-inline">
                    <div className="fw-bold">Henry Sharma</div>
                    <div className="text-muted small">Admin</div>
                  </div>
                  <FaUser
                    size={28}
                    className="rounded-circle bg-secondary text-white p-1"
                  />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
