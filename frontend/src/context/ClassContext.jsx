import { createContext, useContext, useEffect, useState } from "react";
import BASE_API from "../../utils/baseApi";
import { AuthContext } from "./AuthContext";

export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [editing, setEditing] = useState(null);

  const onSubmit = async (data) => {
    try {
      let r = await fetch(`${BASE_API}class/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await r.json();
      console.log("Class response", res);
      return res;
    } catch (error) {
      console.log("Error in adding class", error);
    }
  };

  const getAllClasses = async () => {
    try {
      setIsLoading(true);
      let r = await fetch(`${BASE_API}class/classes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await r.json();
      console.log("classes", res);
      setClasses(res.classes);
    } catch (error) {
      console.log("Error in fetching all classes", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data - Replace with actual API call
  useEffect(() => {
    getAllClasses();
  }, []);

  const handleDelete = async (id) => {
    try {
      let r = await fetch(`${BASE_API}class/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await r.json();
      if (r.ok) {
        await getAllClasses();
      }
    } catch (error) {
      console.log("Error in deleting class", error);
    }
  };

  const onUpdate = async (id, data) => {
    console.log("ID", id);
    try {
      let r = await fetch(`${BASE_API}class/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const res = await r.json();
      console.log("update res", res);
      return res;
    } catch (error) {
      console.log("Error in Updating class", error);
    }
  };
  return (
    <ClassContext.Provider
      value={{
        isLoading,
        classes,
        setClasses,
        onSubmit,
        getAllClasses,
        showAddModal,
        setShowAddModal,
        handleDelete,
        editing,
        setEditing,
        onUpdate,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
