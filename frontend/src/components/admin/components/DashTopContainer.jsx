import StudentCount from "./StudentCount";
import ProfCount from "./ProfCount";
import styles from "./DashTopContainer.module.css";
const DashTopContainer = () => {
  return (
    <div className="row g-3 p-3">
      <div className="col-12 col-sm-6 col-lg-3 mt-lg-0">
        <div className={`rounded-4 shadow p-2 ${styles.stuDetailContainer}`}>
          <StudentCount />
        </div>
      </div>
      <div className="col-12 col-sm-6 col-lg-3 mt-lg-0">
        <div className={`rounded-4 shadow p-2 ${styles.proDetailContainer}`}>
          <ProfCount />
        </div>
      </div>
      <div className="col-12 col-sm-6 col-lg-3 mt-lg-0">
        <div className={`rounded-4 shadow p-2 ${styles.stuDetailContainer}`}>
          <StudentCount />
        </div>
      </div>
      <div className="col-12 col-sm-6 col-lg-3 mt-lg-0">
        <div className={`rounded-4 shadow p-2 ${styles.proDetailContainer}`}>
          <ProfCount />
        </div>
      </div>
    </div>
  );
};

export default DashTopContainer;
