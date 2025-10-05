import { createContext, useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { tokenStr } = useContext(AuthContext);
  const [school, setSchool] = useState(null);

  const getSchool = async () => {
    let r 
    /*= await fetch("http://localhost:5174/api/user/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenStr}`,
      },
    });

    const res = await r.json();
    console.log("School Response", res);

    if (r.ok) {
      setSchool(res.school);
    } else {
      setSchool(null);
    }*/
  };

  useEffect(() => {
    if (tokenStr) {
      getSchool();
    }
  }, [tokenStr]);
  return (
    <AdminContext.Provider value={{ school, getSchool }}>
      {children}
    </AdminContext.Provider>
  );
};
