import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import BASE_API from "../../utils/baseApi";

export const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const cardRef = useRef(null);
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const onSubmit = async (data, resetForm) => {
    try {
      console.log(data);
      data.submitted_by = formatName(data.submitted_by);
      const r = await fetch(`${BASE_API}/notice/add`, {
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
        const newNotice = res.newNotice;
        setNotices((prev) => [newNotice, ...prev]);
        setShowForm(false);
        if (resetForm) resetForm();
      }
    } catch (error) {
      console.log("Frontend error", error);
    }
  };

  const getAllNotices = async () => {
    try {
      setIsLoading(true);
      let r = await fetch(`${BASE_API}/notice/notices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await r.json();
      console.log("All notices", res);

      if (r.ok) {
        const sortedNotices = res.notices.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotices(sortedNotices);
      }
    } catch (er) {
      console.log("Error in fetchinng all notices", er.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnDelete = async (id) => {
    try {
      let r = await fetch(`${BASE_API}/notice/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await r.json();
      console.log("Delete Notice", res);

      if (r.ok) {
        setNotices((p) => p.filter((t) => t._id !== id));
      }
    } catch (e) {
      console.log("Error deleting notice", e);
    }
  };

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

  // Fetch notices initially
  useEffect(() => {
    getAllNotices();
  }, []);

  return (
    <NoticeContext.Provider
      value={{
        getAllNotices,
        notices,
        isLoading,
        handleOnDelete,
        onSubmit,
        showForm,
        setShowForm,
        cardRef,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};
