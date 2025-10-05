import { FaArrowDownLong } from "react-icons/fa6";
import { useTeachers } from "../../../store/teacherApi";

const ProfCount = () => {
  const { data: allTeachers = [], isLoading, error } = useTeachers();

  const totalCount = allTeachers.length;
  if (error)
    return <p className="text-center text-danger">Error loading teachers</p>;
  return (
    <div>
      <span className="badge rounded-pill  text-danger d-flex">
        <FaArrowDownLong className="fw-bold" />
        <span>4%</span>
      </span>
      <ul className="list-unstyled">
        {isLoading ? (
          <li className="fs-2 fw-bold animate-pulse">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </li>
        ) : (
          <li className="fs-2 fw-bold">{totalCount}</li>
        )}

        <li className=" text-muted-small">Professors</li>
      </ul>
    </div>
  );
};
export default ProfCount;
