import { useState, useRef, useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import AddNotice from "../../components/admin/components/AddNotice";
import { MdEdit, MdDelete } from "react-icons/md";
import { notices } from "../../store/noticeApi";

const StudentNotice = () => {
  const [showForm, setShowForm] = useState(false);
  const cardRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };
    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  return (
    <div className="">
      {/* Notice List */}
      <div className="shadow rounded-4 bg-light p-3 m-3 ">
        <ul className="list-group list-group-flush">
          <div className="fw-bold mb-3 fs-2">
            <div className="d-flex justify-between align-items-center blueText">
              <div className="d-flex align-items-center ">
                <IoMdNotifications className="me-2" />
                Notice Board
              </div>
              <div className="">
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 bg-greenish p-2 fs-5 rounded-4 text-white rounded-full hover:bg-greenish-400 transition"
                >
                  <IoMdAdd size={20} /> Add Notice
                </button>
              </div>
            </div>
          </div>
          {notices.map((notice) => (
            <div key={notice.id}>
              <li className="list-group-item">
                <h6 className="fw-bold d-flex justify-between">
                  {notice.title}
                  <div className="badge badge-success d-flex bg-greenish justify-content-center align-items-center">
                    {notice.date}
                  </div>
                  <div className="d-flex fs-4 text-greenish">
                    <MdEdit className="me-2 cursor-pointer" />
                    <MdDelete className="cursor-pointer" />
                  </div>
                </h6>
                <p className="mb-1">{notice.content}</p>
                <div className="d-flex justify-content-end">
                  <span className="fw-bold">By: </span>
                  {notice.submittedBy}
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>

      {/* Add Notice Button */}

      {/* Hover Card / Popup */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-blueish-bigtint z-50">
          <div ref={cardRef} className="bg-white p-6 rounded-lg shadow-lg w-75">
            <AddNotice />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentNotice;
