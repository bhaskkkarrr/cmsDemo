import StudentRow from "../../components/student/StudentRow";
import SkeletonRow from "../../components/common/SkeletonRow";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import StudentViewCard from "../../components/student/StudentViewCard";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { StudentContext } from "../../context/StudentContext";

const AdminStudents = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const {
    handleOnDelete,
    getAllStudents,
    onSubmit,
    isLoading,
    student,
    setSelectedStudent,
    selectedStudent,
  } = useContext(StudentContext);

  const submitHandler = (data) => onSubmit(data, reset);
  return (
    <div className="table-responsive  text-blueish col-12 col-sm-10 col-md-9 col-lg-10 p-3 ">
      <div className="container-fluid p-md-4 py-2 px-0 d-flex justify-content-between align-middle flex-wrap">
        <div className="fw-bold fs-1 m-2 ">All Stduents List</div>
        <div className="bg-greenish d-flex py-1 px-4 m-2 rounded-4 text-white fs-4 fs-md-1">
          <div className="d-flex fs-2 py-2">
            <IoIosPersonAdd />
          </div>
          <div className="d-flex p-2">Add Student</div>
        </div>
      </div>
      <div className="overflow-x-auto shadow-sm rounded-3 bg-white">
        <table className="table table-borderless mb-0  ">
          <thead className="table-custom-head">
            <tr>
              <th></th>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Phone Number</th>
              <th>Father's Name</th>
              <th>Parent's Number</th>
              <th>DOB</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />) // show 5 skeleton rows
              : student.map((student) => (
                  <StudentRow
                    key={student._id}
                    student={student}
                    onView={() => setSelectedStudent(student)}
                    onDelete={() => handleOnDelete(student)}
                  />
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {/* <div className="flex items-center justify-center mt-4 ">
        <div className="flex items-center justify-between w-full max-w-80 font-medium text-blueish">
          <button
            type="button"
            aria-label="prev"
            className="rounded-5 border text-blueish hover:bg-slate-100/70 active:scale-95 transition-all px-3 py-1"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            style={{ cursor: "pointer" }}
            disabled={page === 1}
          >
            <IoIosArrowBack />
          </button>

          <span>
            Page {page} of {totalPages}
            {isFetching && (
              <small className="text-muted ms-2">(Updating…)</small>
            )}
          </span>

          <button
            type="button"
            aria-label="next"
            className="rounded-5 border text-blueish hover:bg-slate-100/70 active:scale-95 transition-all px-3 py-1"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div> */}

      {selectedStudent && (
        <div
          className="fixed inset-0 bg-blueish-bigtint flex items-center justify-center z-50"
          onClick={() => setSelectedStudent(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <StudentViewCard
              student={selectedStudent}
              onClose={() => setSelectedStudent(null)}
            />
          </div>
        </div>
      )}

      {/* Add Form */}
      <div className=" mt-5 mb-5 d-flex justify-content-center">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="card shadow-sm border-0 "
        >
          <div className="card-header greenBg text-white py-3">
            <h4 className="mb-0">Add New Student</h4>
            <p className="mb-0 mt-1 text-white small">
              Please provide the following information
            </p>
          </div>
          <div className="card-body p-4">
            <div className="row g-3">
              {/* Personal Information Section */}
              <div className="col-12">
                <h5 className="greenText mb-3">Personal Information</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name*</label>
                    <input
                      className={`form-control ${
                        errors.first_name ? "is-invalid" : ""
                      }`}
                      type="text"
                      placeholder="Enter first name"
                      {...register("first_name", {
                        required: {
                          value: true,
                          message: "First name required",
                        },
                      })}
                    />
                    {errors.first_name && (
                      <div className="invalid-feedback">
                        {errors.first_name.message}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter last name"
                      {...register("last_name")}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input
                      className="form-control"
                      type="date"
                      {...register("dob")}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <div className="d-flex gap-4 mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Male"
                          id="male"
                          {...register("gender")}
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Female"
                          id="female"
                          {...register("gender")}
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Roll Number */}
                  <div className="col-md-6">
                    <label className="block">Roll Number*</label>
                    <input
                      type="text"
                      {...register("roll_number")}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>

                  {/* Section */}
                  <div className="col-md-6">
                    <label className="block">Section</label>
                    <input
                      type="text"
                      {...register("section")}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>

                  {/* Course */}
                  <div className="col-md-6">
                    <label className="block">Class</label>
                    <input
                      className={`form-control ${
                        errors.course ? "is-invalid" : ""
                      }`}
                      type="text"
                      {...register("course", {
                        required: {
                          value: true,
                          message: "Class is required",
                        },
                      })}
                    />
                    {errors.course && (
                      <div className="invalid-feedback">
                        {errors.course.message}
                      </div>
                    )}
                  </div>

                  {/* Admission Year */}
                  <div className="col-md-6">
                    <label className="block">Admission Year</label>
                    <input
                      type="number"
                      {...register("admission_year")}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>

                  {/* Current Status */}
                  <div className="col-md-6">
                    <label className="block">Current Status</label>
                    <select
                      className="form-control"
                      {...register("current_status")}
                    >
                      <option value="Active">Active</option>
                      <option value="Graduated">Graduated</option>
                      <option value="Dropped">Dropped</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Transferred">Transferred</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Parent's Information Section */}
              <div className="col-12">
                <h5 className="greenText mb-3">Parent's Information</h5>
                <div className="row g-3">
                  {/* Father */}
                  <div className="col-md-6">
                    <label className="block">Father's Name</label>
                    <input
                      type="text"
                      {...register("father_name")}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="block">Father's Number</label>
                    <input
                      type="text"
                      {...register("father_number")}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>

                  {/* Mother */}
                  <div className="col-md-6">
                    <label className="block">Mother's Name</label>
                    <input
                      type="text"
                      {...register("mother_name")}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="block">Mother's Number</label>
                    <input
                      type="text"
                      {...register("mother_number")}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>

                  {/* Guardian */}
                  <div className="col-md-6">
                    <label className="block">Guardian's Name</label>
                    <input
                      type="text"
                      {...register("guardian_name")}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="block">Guardian's Number</label>
                    <input
                      type="text"
                      {...register("guardian_number")}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="col-12">
                <h5 className="greenText mb-3">Contact Information</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Email Address*</label>
                    <input
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      type="email"
                      placeholder="Enter email address"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email required",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact Number</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter contact number"
                      {...register("contact_number")}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter complete address"
                      {...register("address")}
                    />
                  </div>
                </div>
              </div>

              {/* Account Security Section */}
              <div className="col-12">
                <h5 className="greenText mb-3">Account Security</h5>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Password*</label>
                    <input
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      type="password"
                      placeholder="Enter password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password required",
                        },
                      })}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer bg-light p-4 text-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="greenBg rounded-4 text-white py-1 fs-5 px-3"
            >
              {isSubmitting ? "Adding..." : "Add "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminStudents;
