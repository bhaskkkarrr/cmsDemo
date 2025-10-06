import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "TotalStudents",
    count: 200,
    fill: "#f8f9fa",
  },
  {
    name: "Girls",
    count: 70,
    fill: "#227c9d",
  },
  {
    name: "Boys",
    count: 130,
    fill: "#17c3b2",
  },
];

const StudentRatio = () => {
  return (
    <div className="shadow rounded-4 bg-light d-flex flex-column col-lg-11 mx-3 mb-lg-3 mb-3 p-2">
      {/* Title */}
      <div className="d-flex justify-between align-items-center text-blueish fs-2 mx-3">
        <span className="fs-2 fw-bold text-blueish ">Students</span>
        <span>
          <HiDotsHorizontal />
        </span>
      </div>

      {/* Chart */}
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
            <RadialBar minAngle={15} background clockWise dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="d-flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <FaMale className=" fs-1 text-greenish" />
          <FaFemale className=" fs-1 text-blueish" />
        </div>
      </div>

      {/* Bottom */}
      <div className=" d-flex justify-content-around pb-2">
        <div className="fs-5 fw-bold d-flex flex-column align-items-start">
          <div
            className="bg-greenish p-1 rounded-circle my-1"
            style={{ height: "15px", width: "15px" }}
          ></div>
          <span>Boys</span>
          <span>{data[2].count}</span>
        </div>
        <div className="fs-5 fw-bold d-flex flex-column align-items-start">
          <div
            className="bg-blueish rounded-circle p-1 my-1"
            style={{ height: "15px", width: "15px" }}
          ></div>
          <span>Girls</span>
          <span>{data[1].count}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentRatio;
