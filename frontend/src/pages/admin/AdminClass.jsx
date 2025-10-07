import { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import { ClassContext } from "../../context/ClassContext";

const AdminClass = () => {
  const {
    isLoading,
    setClasses,
    classes,
    onSubmit,
    getAllClasses,
    showAddModal,
    setShowAddModal,
    handleDelete,
    editing,
    setEditing,
    onUpdate,
  } = useContext(ClassContext);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    class_name: "",
    section: "",
    class_text: "",
    room: "",
    capacity: "",
    class_teacher: "",
  });

  const submitHandler = async (data) => {
    if (editing) {
      // Edit existing class
      const res = await onUpdate(editing._id, data);

      if (res?.success) {
        setClasses((prev) =>
          prev.map((c) => (c._id === editing._id ? { ...c, ...data } : c))
        );
        setShowAddModal(false);
        setEditing(null);
      } else if (res?.errors) {
        // Handle backend validation errors
        res.errors.forEach((err) => {
          setError(err.field, { type: "manual", message: err.message });
        });
      } else {
        console.log("Error updating class", res);
      }
    } else {
      // Edit new
      const res = await onSubmit(data);
      console.log("Response field", res);
      if (res?.success) {
        await getAllClasses();
        reset();
        setShowAddModal(false);
      } else if (res?.errors?.length > 0) {
        // Loop through each backend validation error
        res.errors.forEach((err) => {
          setError(err.field, {
            type: "manual",
            message: err.message,
          });
        });
      }
    }
  };

  const handleUpdate = (classItem) => {
    setEditing(classItem);
    setShowAddModal(true);
    reset(classItem);
  };
  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-gradient-to-r from-greenish-20 to-greenish-10 rounded-xl shadow-sm border border-blue-100">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="w-12 h-12 bg-gradient-to-br from-greenish to-greenish-400 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Class Management
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Organize and manage your classes
            </p>
          </div>
        </div>
        <button
          className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-greenish to-greenish-400 text-white rounded-3 font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-full sm:w-auto"
          onClick={() => setShowAddModal(true)}
        >
          + Add Class
        </button>
      </div>

      {/* Class Cards */}
      <div className="mt-2 row g-4">
        {isLoading
          ? // Loading skeleton
            [...Array(4)].map((_, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="placeholder-glow">
                      <div className="placeholder col-6 mb-3"></div>
                      <div className="placeholder col-4 mb-2"></div>
                      <div className="placeholder col-8 mb-2"></div>
                      <div className="placeholder col-7"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : classes.map((classItem) => (
              <div key={classItem._id} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body ">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold blueText mb-0">
                        {classItem.class_name ? classItem.class_name : "NA"}
                      </h5>
                      <div className="badge greenBg">
                        Section {classItem.section ? classItem.section : "NA"}
                      </div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Class teacher:</small>
                      <div className="fw-semibold">
                        {classItem.class_teacher
                          ? classItem.class_teacher
                          : "NA"}
                      </div>
                    </div>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <small className="text-muted">Room No:</small>
                        <div className="fw-semibold">
                          {classItem.room ? classItem.room : "NA"}
                        </div>
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="progress mb-3" style={{ height: "10px" }}>
                      <div
                        className="progress-bar greenBg"
                        role="progressbar"
                        style={{
                          width: `${
                            (classItem.studentsEnrolled
                              ? classItem.studentsEnrolled
                              : 10 / classItem.capacity) * 100
                          }%`,
                        }}
                        aria-valuenow={
                          (classItem.studentsEnrolled
                            ? classItem.studentsEnrolled
                            : 10 / classItem.capacity) * 100
                        }
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        {classItem.studentsEnrolled} / {classItem.capacity}
                        students
                      </small>
                      <div>
                        <button
                          className=" btn-link blueText rounded-circle bg-blueish-100 hover:bg-blueish-200 p-2 me-1"
                          onClick={() => handleUpdate(classItem)}
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          className=" btn-link text-danger p-2 rounded-circle bg-red-100 hover:bg-red-200"
                          onClick={() => handleDelete(classItem._id)}
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <>
          {/* Backdrop behind modal */}
          <div
            className="modal-backdrop fade show"
            style={{
              zIndex: 1040,
            }}
          ></div>

          {/* Modal itself */}
          <div
            className="modal fade show d-block"
            style={{
              zIndex: 1050,
              backgroundColor: "rgba(0,0,0,0.05)", // optional
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editing ? "Editing Class" : "Add New Class"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setEditing(null); // clear editing first
                      reset({
                        class_name: "",
                        section: "",
                        class_text: "",
                        room: "",
                        capacity: "",
                        class_teacher: "",
                      }); // reset all form fields
                      setShowAddModal(false); // then hide modal
                    }}
                  ></button>
                </div>

                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-8">
                        <label className="form-label">Class Name</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("class_name")}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Section</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("section")}
                        />
                      </div>
                      {/* Class Text */}
                      <div className="col-md-4 ">
                        <label className="form-label">Class Text*</label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.class_text ? "is-invalid" : ""
                          }`}
                          {...register("class_text", {
                            required: {
                              value: true,
                              message: "Class text is required",
                            },
                          })}
                        />
                        {errors.class_text && (
                          <div className="invalid-feedback">
                            {errors.class_text.message}
                          </div>
                        )}
                      </div>

                      {/* Room No */}
                      <div className="col-md-6">
                        <label className="form-label">Room No.</label>
                        <input
                          type="number"
                          className={`form-control ${
                            errors.room ? "is-invalid" : ""
                          }`}
                          {...register("room")}
                        />
                        {errors.room && (
                          <div className="invalid-feedback">
                            {errors.room.message}
                          </div>
                        )}
                      </div>

                      {/* Room Capacity */}
                      <div className="">
                        <label className="form-label">Class capacity</label>
                        <input
                          type="number"
                          className="form-control"
                          {...register("capacity")}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Class teacher</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register("class_teacher")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditing(null); // clear editing first
                        reset({
                          class_name: "",
                          section: "",
                          class_text: "",
                          room: "",
                          capacity: "",
                          class_teacher: "",
                        }); // reset all form fields
                        setShowAddModal(false); // then hide modal
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Create Class
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminClass;
