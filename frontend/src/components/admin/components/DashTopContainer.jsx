import StudentCount from "./StudentCount";
import ProfCount from "./ProfCount";
const DashTopContainer = () => {
  return (
    <div className="row g-3 p-3">
      <div className="col-12 col-sm-6 col-lg-3 mt-lg-0">
        <StudentCount />
      </div>
      <div className="col-12 col-sm-6 col-lg-3 mt-lg-0">
        <ProfCount />
      </div>
      <div className="col-12 col-sm-6 col-lg-3 mt-lg-0">
        <StudentCount />
      </div>
      <div className="col-12 col-sm-6 col-lg-3 mt-lg-0">
        <ProfCount />
      </div>
    </div>
  );
};

export default DashTopContainer;
