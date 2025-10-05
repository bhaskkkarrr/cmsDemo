import { react, useState } from "react";
import EditIcons from "../admin/components/EditIcons";

const StudentRow = ({ student, onView, onDelete }) => {
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
          <div className="mask mask-squircle h-12 w-12 me-2">
            <img
              src="https://img.daisyui.com/images/profile/demo/3@94.webp"
              alt="Avatar Tailwind CSS Component"
              className="rounded-5"
            />
          </div>
        </div> */}
        <div>
          <div className="fw-semibold">
            {student.first_name + " " + student.last_name}
          </div>
          <small className="text-muted">{student.email}</small>
        </div>
      </td>
      <td>{student.roll_number}</td>
      <td>{student.course}</td>
      <td>{student.contact_number}</td>
      <td>{student.father_name}</td>
      <td>{student.father_number}</td>
      <td>{student.dob}</td>
      <td>
        <EditIcons onView={onView} onDelete={onDelete} student={student} />
      </td>
    </tr>
  );
};

export default StudentRow;
