import { createContext } from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import BASE_API from "../../utils/baseApi";

export const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const onSubmit = async (data, resetForm) => {
    console.log("add teacher", data);
    data.first_name = formatName(data.first_name);
    data.last_name = formatName(data.last_name);
    data.address = formatName(data.address);
    data.department = data.department.toUpperCase();
    data.designation = formatName(data.designation);
    try {
      let r = await fetch(`${BASE_API}teacher/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let res = await r.json();
      console.log(res);
      if (r.ok) {
        await getAllTeachers();
        if (resetForm) resetForm();
      }
    } catch (e) {
      console.log("Error in creating teacher", e);
    }
  };

  const getAllTeachers = async () => {
    try {
      setIsLoading(true);
      let r = await fetch(`${BASE_API}teacher/teachers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await r.json();
      console.log("Get all teachers res:", res);
      if (r.ok) {
        setTeachers(res.teachers);
      }
    } catch (e) {
      console.log("Error in fetchinng all teachers", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnDelete = async (id) => {
    const ID = id._id;
    try {
      let r = await fetch(`${BASE_API}teacher/${ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await r.json();
      console.log("Deleting teacher", res);
      if (r.ok) {
        setTeachers((prev) =>
          prev.filter((t) => {
            console.log(t);
            return t._id !== ID;
          })
        );
      }
    } catch (e) {
      console.log("Error deleting teacher", e);
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);
  return (
    <TeacherContext.Provider
      value={{
        onSubmit,
        getAllTeachers,
        selectedTeacher,
        handleOnDelete,
        isLoading,
        setSelectedTeacher,
        teachers,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
