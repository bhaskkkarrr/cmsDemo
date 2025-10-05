import { FaArrowUpLong } from "react-icons/fa6";
import { useStudents } from "../../../store/studentApi";
const StudentCount = () => {
  const { data: allStudents = [], isLoading, error } = useStudents();
  const totalCount = allStudents.length;
  if (error)
    return <p className="text-center text-danger">Error loading students</p>;

  return (
    <div className="me-3">
      <span className="badge rounded-pill d-flex">
        <FaArrowUpLong className="fw-bold" />
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
        <li className=" text-muted-small">Students</li>
      </ul>
    </div>
  );
};
export default StudentCount;
