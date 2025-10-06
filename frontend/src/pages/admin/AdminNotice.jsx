import { useContext } from "react";
import { IoMdNotifications, IoMdAdd } from "react-icons/io";
import style from "./AdminNotice.module.css";
import AddNotice from "../../components/admin/components/AddNotice";
import { MdEdit, MdDelete } from "react-icons/md";
import { NoticeContext } from "../../context/NoticeContext";

const AdminNotice = () => {
  const {
    getAllNotices,
    notices,
    isLoading,
    handleOnDelete,
    setShowForm,
    showForm,
    cardRef,
  } = useContext(NoticeContext);

  return (
    <div className="flex-1 p-4">
      {/* Notice List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 blueText">
              <IoMdNotifications className="w-8 h-8" />
              <h1 className="text-2xl font-semibold">Notice Board</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-greenish text-white rounded-full hover:bg-greenish-400 transition-colors duration-200 font-medium rounded-5"
            >
              <IoMdAdd className="w-5 h-5" />
              Add Notice
            </button>
          </div>

          {/* Notices List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-24 bg-gray-100 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {notices.map((notice) => (
                  <div key={notice._id} className={`${style.noticeItem}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">
                        {notice.title}
                      </h4>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                          {notice.submitted_on}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 hover:bg-blue-200 rounded-5 bg-blue-100 transition-colors duration-200"
                            aria-label="Edit notice"
                          >
                            <MdEdit className="w-5 h-5 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleOnDelete(notice._id)}
                            className="p-2 hover:bg-red-200 rounded-5 transition-colors duration-200 bg-red-100"
                            aria-label="Delete notice"
                          >
                            <MdDelete className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{notice.body}</p>
                    <div className="flex justify-end items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium">By:</span>
                      <span>{notice.submitted_by}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Notice Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={cardRef}
            className="bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-4 overflow-hidden"
          >
            <AddNotice getAllNotices={getAllNotices} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotice;
