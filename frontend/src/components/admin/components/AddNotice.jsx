import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdNotifications } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function AddNotice({ getAllNotices }) {
  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const token = localStorage.getItem("token");
  const onSubmit = async (data) => {
    try {
      console.log(data);
      data.submitted_by = formatName(data.submitted_by);
      const r = await fetch("http://localhost:5174/api/notice/add", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await r.json();
      console.log("Adding Notice", res);
      if (r.ok) {
        await getAllNotices();
        reset();
      }
    } catch (error) {
      console.log("Frontend error", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="greenBg text-white px-4 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <IoMdNotifications className="fs-4" />
            <h5 className="mb-0">Create New Notice</h5>
          </div>
          <button
            type="button"
            className="btn btn-link text-white p-0"
            onClick={() => document.dispatchEvent(new MouseEvent("mousedown"))}
          >
            <IoMdClose className="fs-4" />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="row g-3">
          {/* Author Name */}
          <div className="col-12 col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                {...register("submitted_by", {
                  required: {
                    value: true,
                    message: "Author name is required",
                  },
                })}
                placeholder="Enter your name"
              />
              <label>Author Name*</label>
            </div>
          </div>

          {/* Date */}
          <div className="col-12 col-md-6">
            <div className="form-floating">
              <input
                type="date"
                className="form-control"
                {...register("submitted_on")}
              />
              <label>Notice Date*</label>
            </div>
          </div>

          {/* Title */}
          <div className="col-12">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Enter notice title"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
              />
              <label>Notice Title*</label>
            </div>
          </div>

          {/* Content */}
          <div className="col-12">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Enter notice content"
                style={{ height: "150px" }}
                {...register("body", {
                  required: {
                    value: true,
                    message: "Notice content is required",
                  },
                })}
              ></textarea>
              <label>Notice Content*</label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-12 text-end">
            <button
              type="submit"
              className="py-2 rounded-4 fw-bold greenBg text-white px-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Posting...
                </>
              ) : (
                "Post Notice"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNotice;
