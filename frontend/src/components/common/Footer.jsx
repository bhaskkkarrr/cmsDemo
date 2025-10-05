import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="container-fluid bg-light">
      <footer className="d-flex flex-wrap  justify-content-between align-items-center py-3 my-2 ">
        <div className="col-md-4 d-flex align-items-center justify-content-between">
          <span className="fw-bold blueText">© 2025 Company, Inc</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#" aria-label="Instagram">
              <FaInstagram className="fs-2 blueText" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#" aria-label="Facebook">
              <FaFacebook className="fs-2 blueText" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
