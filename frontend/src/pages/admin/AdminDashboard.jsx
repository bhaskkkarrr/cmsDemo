import DashTopContainer from "../../components/admin/components/DashTopContainer";
import NoticeBoard from "../../components/admin/components/NoticeBoard";
import RightSideBar from "../../components/admin/components/RightSideBar";
import StudentRatio from "../../components/admin/components/StudentRatio";
import Messages from "../../components/admin/components/MessageContainer";
import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
const AdminDashboard = () => {

  return (
    <div className="row m-3">
      <div className="px-0 col-12 col-lg-8 mb-3 mb-md-0">
        <DashTopContainer />
        <div className="col-12 px-0">
          <NoticeBoard />
        </div>
      </div>
      <div className="px-0 col-12 col-sm-6 col-lg-4 d-none d-lg-inline">
        <RightSideBar />
      </div>
      <div className="d-flex flex-wrap d-lg-none col-12 px-0 ">
        <div className="col-12 col-md-6">
          <StudentRatio />
        </div>
        <div className="col-12 col-md-6">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
