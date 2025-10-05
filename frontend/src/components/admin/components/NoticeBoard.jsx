import { IoMdNotifications } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { notices } from "../../../store/noticeApi";

import NoticeItem from "./Notices";

export default function NoticeBoard() {
  const navigate = useNavigate();
  const handleOnClickEditIcon = () => {
    navigate("/admin/notice");
  };
  return (
    <div className="shadow rounded-4 bg-light p-3 row m-3 ">
      <div className="fw-bold mb-3 fs-4 d-flex justify-between align-items-center">
        <div className="d-flex align-items-center">
          <IoMdNotifications className="blueTextfs-3" />
          Notice Board
        </div>

        <div className="flex space-x-2">
          {/* Edit */}
          <button
            onClick={handleOnClickEditIcon}
            className="p-2 bg-blueish-tint hover:bg-gray-200 rounded-full transition rounded-start-3"
            title="Edit"
          >
            <MdEdit className="w-5 h-5 text-greenish" />
          </button>

          {/* Delete */}
          <button
            onClick={handleOnClickEditIcon}
            className="p-2 bg-blueish-tint hover:bg-red-100 rounded-full transition"
            title="Delete"
          >
            <MdDelete className="w-5 h-5 text-red-600" />
          </button>

          {/* Add */}
          <button
            onClick={handleOnClickEditIcon}
            className="p-2 bg-blueish-tint hover:bg-gray-200 rounded-full transition rounded-end-3"
            title="Add"
          >
            <IoMdAdd className="w-5 h-5 text-greenish" />
          </button>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {notices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </ul>
    </div>
  );
}
