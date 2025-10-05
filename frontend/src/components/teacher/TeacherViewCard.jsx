import { useState, useRef } from "react";

const teacherViewCard = ({ teacher }) => {
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
      className="relative w-80 h-96 rounded-xl p-px bg-gray-900 text-gray-800 overflow-hidden shadow-lg cursor-pointer"
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
          {teacher.first_name + " " + teacher.last_name}
        </h2>

        <ul className="list-unstyled  text-sm text-white font-medium mb-4">
          <li className="d-flex">
            <div className="fw-bold text-greenish me-1">Phone:</div>
            {teacher.contact_number || "NA"}
          </li>
          <li className="d-flex">
            <div className="fw-bold text-greenish me-1">Email:</div>{" "}
            {teacher.email}
          </li>
          <li className="d-flex">
            <div className="fw-bold text-greenish me-1">Gender:</div>{" "}
            {teacher.gender || "NA"}
          </li>
          <li className="d-flex">
            <div className="fw-bold text-greenish me-1">DOB:</div>{" "}
            {teacher.dob || "NA"}
          </li>
          <li className="d-flex">
            <div className="fw-bold text-greenish me-1">Department: </div>{" "}
            {teacher.department || "NA"}
          </li>
          <li className="d-flex">
            <div className="fw-bold text-greenish me-1">Designation: </div>{" "}
            {teacher.designation || "NA"}
          </li>
          <li className="d-flex">
            <div className="fw-bold text-greenish me-1">Subjects: </div>{" "}
            {teacher.subjects || "NA"}
          </li>
          <li className="d-flex">
            <div className="fw-bold text-greenish me-1">Experience: </div>{" "}
            {teacher.experience + " " + "years" || "NA"}
          </li>
          <li className="d-flex">
            <div className="fw-bold text-greenish me-1">Address: </div>{" "}
            {teacher.address || "NA"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default teacherViewCard;
