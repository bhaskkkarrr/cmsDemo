import { useContext } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { StudentContext } from "../../../context/StudentContext";

const StudentCount = () => {
  const { student } = useContext(StudentContext);
  return (
    <div className="blueBg p-4 p-lg-2 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border-4 border-gray-100">
      <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-full font-medium text-sm mb-4">
        <FaArrowUpLong className="animate-bounce" />
        <span>4%</span>
      </div>

      <div className="space-y-1">
        <h3 className="text-white text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text ">
          {student.length}
        </h3>
        <p className="text-white text-sm font-medium uppercase tracking-wide">
          Students
        </p>
      </div>
    </div>
  );
};

export default StudentCount;
