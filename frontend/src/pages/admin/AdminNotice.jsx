import { useState, useRef, useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import AddNotice from "../../components/admin/components/AddNotice";
import { MdEdit, MdDelete } from "react-icons/md";

const AdminNotice = () => {
  const token = localStorage.getItem("token");
  const [notice, setNotice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const getAllNotices = async () => {
    try {
      setIsLoading(true);
      let r = await fetch("http://localhost:5174/api/notice/notices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await r.json();
      console.log("All notices", res);

      if (r.ok) {
        setNotice(res.notices);
        setShowForm(false);
      }
    } catch (er) {
      console.log("Error in fetchinng all notices", er.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnDelete = async (id) => {
    try {
      let r = await fetch(`http://localhost:5174/api/notice/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await r.json();
      console.log("Delete Notice", res);

      if (r.ok) {
        setNotice((p) => p.filter((t) => t._id !== id));
      }
    } catch (e) {
      console.log("Error deleting notice", e);
    }
  };

  useEffect(() => {
    getAllNotices();
  }, []);
  return (
    <div className="col-12 col-sm-10 col-md-9 col-lg-10">
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
                  className="flex items-center gap-2  bg-greenish p-2 fs-5 rounded-4 text-white rounded-full hover:bg-greenish-400 transition"
                >
                  <IoMdAdd size={20} /> Add Notice
                </button>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div>
              <ul className="animate-pulse">
                <li colSpan="8" className="h-24 mb-2 bg-gray-300 rounded"></li>
                <li colSpan="8" className="h-24 mb-2 bg-gray-300 rounded"></li>
                <li colSpan="8" className="h-24 mb-2 bg-gray-300 rounded"></li>
                <li colSpan="8" className="h-24 mb-2 bg-gray-300 rounded"></li>
                <li colSpan="8" className="h-24 mb-2 bg-gray-300 rounded"></li>
              </ul>
            </div>
          ) : (
            <>
              {notice.map((notice) => (
                <div key={notice._id} className="">
                  <li className="list-group-item ">
                    <div className="fw-bold d-flex justify-between flex-wrap">
                      <div className="d-flex ">{notice.title}</div>
                      <div className="d-flex  text-greenish">
                        <div className="badge me-2 me-lg-4 badge-success d-flex bg-greenish justify-content-center align-items-center">
                          {notice.submitted_on}
                        </div>
                        <div className="d-flex fs-4">
                          <MdEdit className="me-2 cursor-pointer" />
                          <MdDelete
                            className="cursor-pointer"
                            onClick={() => handleOnDelete(notice._id)}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mb-1">{notice.body}</p>
                    <div className="d-flex justify-content-end">
                      <span className="fw-bold">By: </span>
                      {notice.submitted_by}
                    </div>
                  </li>
                </div>
              ))}
            </>
          )}
        </ul>
      </div>

      {/* Add Notice Button */}

      {/* Hover Card / Popup */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-blueish-bigtint z-50">
          <div ref={cardRef} className="p-6 rounded-lg w-75">
            <AddNotice getAllNotices={getAllNotices} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotice;
