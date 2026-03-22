import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FiChevronDown, FiBookOpen } from "react-icons/fi";
import { MessageCircle } from "lucide-react";
import Navbar from "../../components/teacher/Navbar";
import Footer from "../../components/common/Footer";

const CourseDetailsForTeacher = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModule, setOpenModule] = useState(null);

  const [commentsMap, setCommentsMap] = useState({});
  const [openDiscussion, setOpenDiscussion] = useState(null);
  const [replyBox, setReplyBox] = useState(null);
  const [replyText, setReplyText] = useState("");

  // ================= FETCH COURSE =================
  const fetchCourse = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) setCourse(data.course);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  // ================= FETCH COMMENTS =================
  const fetchComments = async (moduleId, lessonId) => {
    const res = await fetch(
      `http://localhost:5000/api/comments/${courseId}/${moduleId}/${lessonId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status === 401) {
      console.log("Unauthorized - token missing or invalid");
      return;
    }

    const data = await res.json();

    if (data.success) {
      setCommentsMap((prev) => ({
        ...prev,
        [lessonId]: data.comments,
      }));
    }
  };

  // ================= SEND REPLY =================
  const sendReply = async (moduleId, lessonId, parentId) => {
    if (!replyText.trim()) return;

    await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseId,
        moduleId,
        lessonId,
        message: replyText,
        parentComment: parentId,
      }),
    });

    setReplyText("");
    setReplyBox(null);
    fetchComments(moduleId, lessonId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Course not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 space-y-14">
        {/* HEADER */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex gap-6 flex-col sm:flex-row">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt="thumbnail"
                  className="w-full sm:w-56 h-36 object-cover rounded-2xl"
                />
              )}

              <div className="space-y-4">
                <h1 className="text-3xl font-semibold text-gray-900">
                  {course.title}
                </h1>

                <p className="text-gray-500 max-w-2xl">
                  {course.shortDescription}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <span>
                    <strong>Category:</strong> {course.category || "-"}
                  </span>
                  <span>
                    <strong>Level:</strong> {course.level || "-"}
                  </span>
                  <span>
                    <strong>Duration:</strong> {course.duration || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODULES */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Course Modules
          </h2>

          {course.modules?.map((module, moduleIndex) => {
            const isOpen = openModule === module._id;

            const moduleTitle = module.title?.toLowerCase().includes("module")
              ? module.title
              : `Module ${moduleIndex + 1}: ${module.title}`;

            return (
              <div
                key={module._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <div
                  onClick={() => setOpenModule(isOpen ? null : module._id)}
                  className="flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {moduleTitle}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {module.lessons?.length || 0} Lessons ·{" "}
                      {module.quizzes?.length || 0} Quizzes
                    </p>
                  </div>

                  <FiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {isOpen && (
                  <div className="px-6 pb-8 space-y-6 border-t border-gray-100">
                    {module.lessons?.map((lesson, i) => {
                      const lessonComments = commentsMap[lesson._id] || [];

                      const mainComments = lessonComments.filter(
                        (c) => !c.parentComment,
                      );

                      const replies = lessonComments.filter(
                        (c) => c.parentComment,
                      );

                      return (
                        <div
                          key={lesson._id}
                          className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                        >
                          <div className="flex items-start gap-4">
                            <FiBookOpen className="text-yellow-500 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {i + 1}. {lesson.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Duration: {lesson.duration || "-"}
                              </p>
                            </div>
                          </div>

                          {/* VIEW DISCUSSION BUTTON */}
                          <button
                            onClick={() => {
                              fetchComments(module._id, lesson._id);
                              setOpenDiscussion(
                                openDiscussion === lesson._id
                                  ? null
                                  : lesson._id,
                              );
                            }}
                            className="text-xs text-yellow-600 flex items-center gap-1"
                          >
                            <MessageCircle size={14} />
                            {openDiscussion === lesson._id
                              ? "Hide Discussion"
                              : "View Discussion"}
                          </button>

                          {/* DISCUSSION */}
                          {openDiscussion === lesson._id && (
                            <div className="space-y-4 mt-4">
                              {mainComments.map((comment) => (
                                <div
                                  key={comment._id}
                                  className="bg-white rounded-lg shadow-sm p-4"
                                >
                                  <p className="text-sm font-semibold">
                                    {comment.userId?.fullName}
                                  </p>

                                  <p className="text-sm text-gray-600 mt-1">
                                    {comment.message}
                                  </p>

                                  <button
                                    onClick={() => setReplyBox(comment._id)}
                                    className="text-xs text-yellow-600 mt-2"
                                  >
                                    Reply
                                  </button>

                                  {replyBox === comment._id && (
                                    <div className="mt-2">
                                      <textarea
                                        className="w-full bg-gray-100 rounded-lg p-2 text-sm"
                                        rows="2"
                                        value={replyText}
                                        onChange={(e) =>
                                          setReplyText(e.target.value)
                                        }
                                      />
                                      <button
                                        onClick={() =>
                                          sendReply(
                                            module._id,
                                            lesson._id,
                                            comment._id,
                                          )
                                        }
                                        className="mt-2 bg-yellow-400 text-white px-4 py-1 rounded text-xs"
                                      >
                                        Send
                                      </button>
                                    </div>
                                  )}

                                  {/* REPLIES */}
                                  <div className="mt-3 space-y-2">
                                    {replies
                                      .filter(
                                        (r) => r.parentComment === comment._id,
                                      )
                                      .map((reply) => (
                                        <div
                                          key={reply._id}
                                          className="bg-yellow-50 border border-yellow-200 rounded p-2"
                                        >
                                          <p className="text-xs font-semibold">
                                            {reply.userId?.fullName}
                                          </p>
                                          <p className="text-xs">
                                            {reply.message}
                                          </p>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailsForTeacher;
