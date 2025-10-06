import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminNotice from "./pages/admin/AdminNotice";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudentPage";
import AdminFinance from "./pages/admin/AdminFinance";
import Page404 from "./pages/404Page";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./guard/ProtectedRoute";
import Signup from "./pages/signup";
import StudentDashboard from "./pages/student/StudentDashboard";
import MessagePage from "./pages/student/MessagePage";
import StudentNotice from "./pages/student/StudentNotice";
import StudentLayout from "./components/student/StudentLayout";
import TeacherLayout from "./components/teacher/TeacherLayout";
import { AuthProvider } from "./context/AuthContext";
import { NoticeProvider } from "./context/NoticeContext";
import AdminExam from "./pages/admin/AdminExam";
import { StudentProvider } from "./context/StudentContext";
import { TeacherProvider } from "./context/TeacherContext";
function App() {
  return (
    <AuthProvider>
      <TeacherProvider>
        <StudentProvider>
          <NoticeProvider>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />

              {/* Admin */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="attendance" element={<AdminAttendance />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="notice" element={<AdminNotice />} />
                <Route path="teachers" element={<AdminTeachers />} />
                <Route path="examination" element={<AdminExam />} />
                <Route path="finance" element={<AdminFinance />} />
              </Route>

              {/* Teachers */}
              {/* <Route
          path="teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher", "admin"]}>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="students" element={<Students />} />
          <Route path="notice" element={<Notice />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="message" element={<MessagePage />} />
        </Route> */}

              {/* Student */}
              <Route
                path="student"
                element={
                  <ProtectedRoute allowedRoles={["student", "admin"]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<StudentDashboard />} />
                {/* <Route path="dashboard" element={<Dashboard />} /> */}
                <Route path="notice" element={<StudentNotice />} />
                <Route path="message" element={<MessagePage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </NoticeProvider>
        </StudentProvider>
      </TeacherProvider>
    </AuthProvider>
  );
}

export default App;
