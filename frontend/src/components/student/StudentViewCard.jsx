import { useState, useRef } from "react";

const StudentViewCard = ({ student }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative w-80 h-full rounded-xl p-px bg-gray-900 text-gray-800 overflow-hidden shadow-lg cursor-pointer"
    >
      <div
        className={`pointer-events-none blur-3xl rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-300 size-60 absolute z-0 transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ top: position.y - 120, left: position.x - 120 }}
      />

      <div className="relative z-10 bg-gray-900/75 p-6 h-full w-full rounded-[11px] flex flex-col items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full shadow-md my-4"
        />

        <h2 className="text-2xl font-bold text-white mb-1">
          {student.first_name + " " + student.last_name}
        </h2>

        <ul className="list-unstyled  text-sm text-white font-medium mb-4">
          <li className="d-flex">
            <div className="text-greenish me-1">DOB:</div>
            {student.dob}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Contact Number</div>
            {student.contact_number}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Address: </div>
            {student.address ? student.address : "NA"}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Class:</div>
            {student.course} {student.section}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Gender:</div>
            {student.gender}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Admission year:</div>
            {student.admission_year}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Roll No:</div>
            {student.roll_number}
          </li>

          <div className="d-flex fw-bold fs-3">Parent's Information</div>
          <li className="d-flex">
            <div className="text-greenish me-1">Father's Name:</div>
            {student.father_name}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Father's Number:</div>
            {student.father_number}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Mother Name:</div>
            {student.mother_name ? student.mother_name : "NA"}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Mother's Number:</div>
            {student.mother_number ? student.mother_number : "NA"}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Guardian Name:</div>
            {student.guardian_name ? student.guardian_name : "NA"}
          </li>
          <li className="d-flex">
            <div className="text-greenish me-1">Guardian Number:</div>
            {student.guardian_number ? student.guardian_number : "NA"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentViewCard;
