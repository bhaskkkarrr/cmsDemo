import { react, useState } from "react";
import TeacherEditIcon from "./TeacherEditIcon";
import { FaUser } from "react-icons/fa";

const TeacherRow = ({ teacher, onView, onDelete }) => {
  const [selected, setSelected] = useState(false);

  return (
    <tr className={selected ? "table-primary" : ""}>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => setSelected(!selected)}
        />
      </td>
      <td className="d-flex align-items-center">
        {/* Profile */}
        {/* <div className="avatar">
          <div className="mask mask-squircle h-12 w-12 me-2 fs-1">
            <img
              src="https://img.daisyui.com/images/profile/demo/3@94.webp"
              alt="Avatar Tailwind CSS Component"
              className="rounded-5"
            />
          </div>
        </div> */}
        <div>
          <div className="fw-semibold">
            {teacher.first_name + " " + teacher.last_name}
          </div>
          <small className="text-muted">{teacher.email}</small>
        </div>
      </td>
      <td>{teacher.contact_number}</td>
      <td>{teacher.department}</td>
      <td>{teacher.designation}</td>
      <td>{teacher.subjects}</td>
      <td>
        <TeacherEditIcon onView={onView} onDelete={onDelete} teacher={teacher} />
      </td>
    </tr>
  );
};

export default TeacherRow;
