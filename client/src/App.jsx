import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import OnboardingStep1 from "./pages/auth/student-onboarding/OnboardingStep1";
import OnboardingStep2 from "./pages/auth/student-onboarding/OnboardingStep2";
import OnboardingStep3 from "./pages/auth/student-onboarding/OnboardingStep3";
import OnboardingStep4 from "./pages/auth/student-onboarding/OnboardingStep4";

import StudentHome from "./pages/student/StudentHome";
import StudentDashboard from "./pages/student/StudentDashboard";
import EnrolledCourses from "./pages/student/EnrolledCourses";
import CourseDetailsForStudent from "./pages/student/CourseDetailsForStudent";

import LessonPlayer from "./pages/student/LessonPlayer";
import QuizPage from "./pages/student/QuizPage";
import QuizAttempt from "./pages/student/QuizAttempt";
import StudentInfo from "./pages/student/StudentInfo";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherOnboarding from "./pages/auth/teacher-onboarding/TeacherOnboarding";
import TeachingPreferences from "./pages/auth/teacher-onboarding/TeachingPreferences";
import MyCourses from "./pages/teacher/MyCourses";
import CreateCourseStep1 from "./pages/teacher/create-course/CreateCourseStep1";
import CreateCourseStep2 from "./pages/teacher/create-course/CreateCourseStep2";
import CreateCourseStep3 from "./pages/teacher/create-course/CreateCourseStep3";
import CourseDetailsForTeacher from "./pages/teacher/CourseDetailsForTeacher";
import StudentsList from "./pages/teacher/StudentsList";
import CourseDetails from "./components/common/CourseDetails";
import StudentProfile from "./pages/teacher/StudentProfile";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import CertificateView from "./pages/student/CertificateView";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<OnboardingStep1 />} />
      <Route path="/onboarding-step-2" element={<OnboardingStep2 />} />
      <Route path="/onboarding-step-3" element={<OnboardingStep3 />} />
      <Route path="/onboarding-step-4" element={<OnboardingStep4 />} />
      <Route path="/teacher-onboarding" element={<TeacherOnboarding />} />
      <Route path="/teaching-preferences" element={<TeachingPreferences />} />

      {/* STUDENT ROUTES */}
      <Route path="/student-home" element={<StudentHome />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/s-enrolled-courses" element={<EnrolledCourses />} />
      <Route
        path="/CourseDetailsForStudent/:courseId"
        element={<CourseDetailsForStudent />}
      />
      <Route
        path="/student-course/:courseId/:moduleId/:lessonId"
        element={<CourseDetails />}
      />

      <Route
        path="/student-course/:courseId/:moduleId/:lessonId/learn"
        element={<LessonPlayer />}
      />
      <Route
        path="/student-course/:courseId/:moduleId/:lessonId/quiz"
        element={<QuizPage />}
      />
      <Route
        path="/student-course/:courseId/:moduleId/:lessonId/quiz/attempt"
        element={<QuizAttempt />}
      />
      <Route path="/student-profile" element={<StudentInfo />} />
      <Route path="/certificate/:courseId" element={<CertificateView />} />

      {/* TEACHER ROUTES */}
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/t-my-courses" element={<MyCourses />} />
      <Route
        path="/teacher/create-course/step-1"
        element={<CreateCourseStep1 />}
      />
      <Route
        path="/teacher/create-course/step-2"
        element={<CreateCourseStep2 />}
      />
      <Route
        path="/teacher/create-course/step-3"
        element={<CreateCourseStep3 />}
      />
      <Route path="/teacher/students" element={<StudentsList />} />
      <Route path="/teacher/students/:id" element={<StudentProfile />} />
      {/* <Route path="/teacher/course/:courseId" element={<CourseDetails />} /> */}
      <Route
        path="/course-details/:courseId"
        element={<CourseDetailsForTeacher />}
      />

      <Route path="/teacher-profile" element={<TeacherProfile />} />
    </Routes>
  );
};

export default App;
