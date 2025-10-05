import React from "react";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const TeacherEditIcon = ({ onEdit, onDelete, onView, teacher }) => {
  return (
    <div>
      <div className="flex space-x-2">
        {/* Edit */}
        <button
          onClick={onEdit}
          className="p-2 hover:bg-gray-200 rounded-full transition rounded-3"
          title="Edit"
        >
          <MdEdit className="w-5 h-5 text-greenish" />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(teacher._id)}
          className="p-2 hover:bg-red-100 rounded-3 transition"
          title="Delete"
        >
          <MdDelete className="w-5 h-5 text-red-600" />
        </button>

        <button
          onClick={() => onView(teacher)} // ✅ pass teacher up
          className="p-2 hover:bg-gray-200 transition rounded-3"
          title="View"
        >
          <FaEye className="w-5 h-5 text-greenish" />
        </button>
      </div>
    </div>
  );
};

export default TeacherEditIcon;
