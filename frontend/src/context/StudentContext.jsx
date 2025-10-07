import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import BASE_API from "../../utils/baseApi";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const onSubmit = async (data, resetForm) => {
    data.first_name = formatName(data.first_name);
    data.last_name = formatName(data.last_name);
    data.address = formatName(data.address);
    data.section = formatName(data.section);
    data.course = formatName(data.course);
    data.father_name = formatName(data.father_name);
    data.mother_name = formatName(data.mother_name);
    data.guardian_name = formatName(data.guardian_name);
    try {
      let r = await fetch(`${BASE_API}/student/create`, {
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
        await getAllStudents();
        if (resetForm) resetForm();
      }
    } catch (e) {
      console.log("Error in creating student", e);
    }
  };

  const getAllStudents = async () => {
    try {
      setIsLoading(true);
      let r = await fetch(`${BASE_API}/student/students`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await r.json();
      console.log("Get all students res:", res);
      if (r.ok) {
        setStudent(res.students);
      }
    } catch (e) {
      console.log("Error in fetchinng all students", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnDelete = async (id) => {
    const ID = id._id;
    try {
      let r = await fetch(`${BASE_API}/student/${ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await r.json();
      console.log("Deleting student", res);
      if (r.ok) {
        setStudent((prev) =>
          prev.filter((t) => {
            console.log(t);
            return t._id !== ID;
          })
        );
      }
    } catch (e) {
      console.log("Error deleting student", e);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        handleOnDelete,
        getAllStudents,
        onSubmit,
        isLoading,
        student,
        setSelectedStudent,
        selectedStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
