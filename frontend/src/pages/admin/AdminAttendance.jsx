import { useContext, useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { StudentContext } from "../../context/StudentContext";

const AdminAttendance = () => {
  const { getAllStudents, student } = useContext(StudentContext);
  // const [attendance, setAttendance] = useState(sampleStudents);
  const [filterDate, setFilterDate] = useState("");
  const [search, setSearch] = useState("");

  // Handler for bulk marking
  const markAll = (status) => {
    setAttendance((prev) => prev.map((a) => ({ ...a, status })));
  };

  // Filter logic
  // const filtered = attendance.filter(
  //   (a) =>
  //     (!filterDate || a.date === filterDate) &&
  //     (a.name.toLowerCase().includes(search.toLowerCase()) ||
  //       a.id.toString().includes(search))
  // );

  // const data = [
  //   {
  //     name: "TotalAttendance",
  //     count: attendance.length,
  //     fill: "#f8f9fa",
  //   },
  //   {
  //     name: "Late",
  //     count: attendance.filter((s) => s.status === "Late").length,
  //     fill: "#facc15",
  //   },
  //   {
  //     name: "Absent",
  //     count: attendance.filter((s) => s.status === "Absent").length,
  //     fill: "#dc3545",
  //   },
  //   {
  //     name: "Present",
  //     count: attendance.filter((s) => s.status === "Present").length,
  //     fill: "#28a745",
  //   },
  // ];
  return (
    <div className="col-12 col-sm-10 col-md-9 col-lg-10 ">
      <div className="m-3 rounded-4 shadow-lg p-3 bg-white ">
        <div className="d-flex flex-wrap align-items-start justify-content-lg-between">
          {/* Filters */}
          <div className="d-flex flex-wrap">
            {/* SEARCH */}
            <div className="flex items-center border pl-2 mt-2 mt-lg-0 bg-white rounded-full">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 30 30"
                  fill="#6B7280"
                >
                  <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
                </svg>
              </div>
              <input
                type="text"
                className="text-sm text-gray-500"
                placeholder="Search by Name/Id"
              />
              <div className="d-flex justify-center align-middle">
                <button
                  type="submit"
                  className="bg-greenish m-2 w-100 px-2 rounded-5 text-sm text-white "
                >
                  Search
                </button>
              </div>
            </div>
            {/* DATE */}
            <div className="bg-white rounded-full ms-lg-2 me-md-4 mt-2 mt-lg-0 border">
              <label className="block text-sm font-medium ps-2">Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 rounded-full w-48"
              />
            </div>
          </div>

          {/* Statistics */}
          {/* <div className="d-flex flex-wrap justify-content-end my-3 my-lg-0 mb-lg-3 ">
            <div className="bg-light p-4 rounded-5 shadow border-4 ">
              <h2 className="text-lg d-flex font-semibold mb-3 greenText  ">
                Attendance Summary
              </h2>
              <div className="">
                <div className="mb-2 relative ">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="10%"
                      outerRadius="100%"
                      barSize={15}
                      data={data}
                    >
                      <RadialBar
                        minAngle={15}
                        background
                        clockWise
                        dataKey="count"
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bulk Marking */}
        {/* <div className="flex gap-3 justify-content-center my-3">
          <button
            onClick={() => markAll("Present")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Mark All Present
          </button>
          <button
            onClick={() => markAll("Absent")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Mark All Absent
          </button>
          <button
            onClick={() => markAll("Late")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Mark All Late
          </button>
        </div> */}

        {/* Table */}
        <div className="overflow-x-auto shadow rounded-3">
          <table className="w-full border-collapse">
            <thead className="bg-greenish-tint">
              <tr>
                <th className="border p-3 text-left">Student ID</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Course</th>
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {student.map((student) => (
                <tr key={student.roll_number} className="hover:bg-gray-50">
                  <td className="border p-3">{student.roll_number}</td>
                  <td className="border p-3">{student.first_name}</td>
                  <td className="border p-3">{student.course}</td>
                  <td className="border p-3">{student.date}</td>
                  <td className="border p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        student.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : student.status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="border p-3 space-x-2">
                    <button className="px-2 py-1 bg-blue-100 me-2 mb-2 hover:bg-blue-200 rounded">
                      Edit
                    </button>
                    <button className="px-2 py-1 bg-red-100 hover:bg-red-200 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No records found
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
