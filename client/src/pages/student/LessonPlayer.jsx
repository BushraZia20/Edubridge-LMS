import { useParams, Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { FileText, Settings, Maximize, Minimize } from "lucide-react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Navbar from "../../components/student/Navbar";
import Footer from "../../components/common/Footer";
import FeedbackStudent from "../../components/student/FeedbackStudent";

// ================= YOUTUBE HELPER =================
const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
  );
  return match ? match[1] : null;
};

const LessonPlayer = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const playerRef = useRef(null);
  const plyrInstance = useRef(null);
  const containerRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [markedComplete, setMarkedComplete] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ================= FETCH COURSE =================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/student/${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = await res.json();

        if (data.success) {
          setCourse(data.course);
          setCompletedLessons(data.completedLessons || []);
        } else {
          navigate("/s-enrolled-courses");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [courseId]);

  // useEffect(() => {
  //   if (!course) return;
  //   if (!playerRef.current) return;

  //   if (plyrInstance.current) {
  //     plyrInstance.current.destroy();
  //   }

  //   const player = new Plyr(playerRef.current, {
  //     controls: [
  //       "play",
  //       "progress",
  //       "current-time",
  //       "duration",
  //       "mute",
  //       "volume",
  //       "settings",
  //       "fullscreen",
  //     ],
  //     youtube: {
  //       noCookie: true,
  //       rel: 0,
  //     },
  //   });

  //   plyrInstance.current = player;

  //   let interval = null;

  //   // Resume from localStorage
  //   const savedTime = localStorage.getItem(`progress-${lessonId}`);
  //   player.on("ready", () => {
  //     if (savedTime) {
  //       player.currentTime = parseFloat(savedTime);
  //     }
  //   });

  //   // START tracking
  //   player.on("play", () => {
  //     if (interval) return; // 🚀 prevent multiple intervals

  //     interval = setInterval(() => {
  //       const current = player.currentTime;
  //       const duration = player.duration;

  //       if (!duration) return;

  //       const percent = Math.floor((current / duration) * 100);

  //       setProgress(percent);

  //       // Save locally
  //       localStorage.setItem(`progress-${lessonId}`, current);

  //       // Send to backend
  //       // fetch(
  //       //   `http://localhost:5000/api/student/courses/${courseId}/${moduleId}/${lessonId}/progress`,
  //       //   {
  //       //     method: "PUT",
  //       //     headers: {
  //       //       "Content-Type": "application/json",
  //       //       Authorization: `Bearer ${token}`,
  //       //     },
  //       //     body: JSON.stringify({ progress: percent }),
  //       //   }
  //       // );

  //       fetch(
  //   `http://localhost:5000/api/student/courses/${courseId}/${moduleId}/${lessonId}/progress`,
  //   {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ progress: percent }),
  //   }
  // )
  //   .then(res => res.json())
  //   .then(data => {
  //     if (data.success) {
  //       console.log("Progress Updated:", data);

  //       // Example: store in localStorage
  //       localStorage.setItem(
  //         `progress-${data.courseId}-${data.moduleId}-${data.lessonId}`,
  //         data.progress
  //       );

  //       if (data.completed) {
  //         setMarkedComplete(true);
  //       }
  //     }
  //   });

  //       if (percent >= 90) {
  //         setMarkedComplete(true);
  //       }

  //     }, 10000);
  //   });

  //   // STOP tracking
  //   const stopInterval = () => {
  //     if (interval) {
  //       clearInterval(interval);
  //       interval = null;
  //     }
  //   };

  //   player.on("pause", stopInterval);
  //   player.on("ended", () => {
  //     stopInterval();
  //     setMarkedComplete(true);
  //   });

  //   return () => {
  //     stopInterval();
  //     player.destroy();
  //   };

  // }, [course, lessonId]);

  useEffect(() => {
    if (!course) return;
    if (!playerRef.current) return;

    // Destroy old player if exists
    if (plyrInstance.current) {
      plyrInstance.current.destroy();
    }

    const player = new Plyr(playerRef.current, {
      controls: [
        "play",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
      youtube: {
        noCookie: true,
        rel: 0,
      },
    });

    plyrInstance.current = player;

    let interval = null;

    // Resume from localStorage
    const savedTime = localStorage.getItem(`progress-${lessonId}`);
    player.on("ready", () => {
      if (savedTime) {
        player.currentTime = parseFloat(savedTime);
      }
    });

    // ================= START TRACKING =================
    player.on("play", () => {
      if (interval) return; // prevent multiple intervals

      interval = setInterval(() => {
        const current = player.currentTime;
        const duration = player.duration;

        if (!duration) return;

        let percent = Math.floor((current / duration) * 100);

        // 🔥 Force 100 when >=95
        if (percent >= 95) {
          percent = 100;
        }

        setProgress(percent);

        // Save locally
        localStorage.setItem(`progress-${lessonId}`, current);

        // Send to backend every 2 seconds
        fetch(
          `http://localhost:5000/api/student/courses/${courseId}/${moduleId}/${lessonId}/progress`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ progress: percent }),
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.completed) {
              setMarkedComplete(true);
            }
          })
          .catch((err) => console.error("Progress error:", err));
      }, 2000); // ✅ every 2 seconds
    });

    // ================= STOP TRACKING =================
    const stopInterval = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    player.on("pause", stopInterval);
    player.on("ended", () => {
      stopInterval();
      setProgress(100);
      setMarkedComplete(true);

      // Final force update to DB
      fetch(
        `http://localhost:5000/api/student/courses/${courseId}/${moduleId}/${lessonId}/progress`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ progress: 100 }),
        },
      );
    });

    return () => {
      stopInterval();
      player.destroy();
    };
  }, [course, lessonId]);

  if (!course) return <div className="pt-24 px-10">Loading...</div>;

  const module = course.modules.find((m) => m._id === moduleId);
  if (!module) return <div className="pt-24 px-10">Module not found</div>;

  const combinedLessons = [
    ...module.lessons.map((l) => ({ ...l, type: "video" })),
    ...module.quizzes.map((q) => ({ ...q, type: "quiz" })),
  ];

  const lesson = combinedLessons.find((l) => l._id === lessonId);
  if (!lesson) return <div className="pt-24 px-10">Lesson not found</div>;

  const ytId = getYouTubeId(lesson.videoUrl);

  const isCompleted = (id) => completedLessons.includes(id);

  const getLessonPath = (l, mId) =>
    l.type === "quiz"
      ? `/student-course/${courseId}/${mId}/${l._id}/quiz`
      : `/student-course/${courseId}/${mId}/${l._id}/learn`;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 flex flex-col">
        <div className="flex flex-1 px-8 lg:px-16 py-10 gap-12">
          {/* SIDEBAR (UNCHANGED) */}
          <div className="hidden md:block w-72">
            <div className="bg-white border border-gray-200 rounded-xl p-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <h2 className="text-lg font-semibold mb-6">{course.title}</h2>

              <div className="space-y-6">
                {course?.modules?.map((mod, modIdx) => {
                  const modCombined = [
                    ...(mod.lessons || []).map((l) => ({
                      ...l,
                      type: "video",
                    })),
                    ...(mod.quizzes || []).map((q) => ({
                      ...q,
                      type: "quiz",
                      duration: "Quiz",
                    })),
                  ];
                  return (
                    <div key={mod._id}>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Module {modIdx + 1}: {mod.title}
                      </p>
                      <div className="space-y-2">
                        {modCombined.map((l) => {
                          const isActive =
                            l._id === lesson._id && mod._id === moduleId;
                          const done = isCompleted(l._id);
                          return (
                            <Link
                              key={l._id}
                              to={getLessonPath(l, mod._id)}
                              className={`block rounded-lg p-4 border transition-all ${
                                isActive
                                  ? "bg-gray-200 border-gray-300"
                                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0">
                                  {done ? (
                                    <div className="w-6 h-6 flex items-center justify-center border rounded bg-green-100 text-green-600 text-xs font-bold">
                                      ✓
                                    </div>
                                  ) : l.type === "video" ? (
                                    <div className="w-6 h-6 flex items-center justify-center border rounded">
                                      ▶
                                    </div>
                                  ) : (
                                    <div className="w-6 h-6 flex items-center justify-center border rounded">
                                      ≡
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    {l.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {l.duration}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1">
            {lesson.type === "video" ? (
              <div className="flex justify-center">
                <div className="w-full max-w-5xl">
                  <div
                    ref={containerRef}
                    className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
                  >
                    <div className="relative bg-black aspect-video">
                      {ytId ? (
                        <div
                          ref={playerRef}
                          data-plyr-provider="youtube"
                          data-plyr-embed-id={ytId}
                        />
                      ) : (
                        <video
                          ref={playerRef}
                          controls
                          className="w-full h-full object-contain"
                        >
                          <source src={lesson.videoUrl} type="video/mp4" />
                        </video>
                      )}
                    </div>

                    {/* CONTROLS BAR (UNCHANGED UI AREA) */}
                    <div className="px-6 py-4 border-t bg-white">
                      <div className="flex flex-wrap items-center gap-4">
                        {markedComplete || isCompleted(lessonId) ? (
                          <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                            ✓ Completed
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">
                            {progress}% watched
                          </span>
                        )}

                        <button
                          onClick={() => {
                            if (!document.fullscreenElement) {
                              containerRef.current.requestFullscreen();
                              setIsFullscreen(true);
                            } else {
                              document.exitFullscreen();
                              setIsFullscreen(false);
                            }
                          }}
                          className="ml-auto"
                        >
                          {isFullscreen ? <Minimize /> : <Maximize />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {lesson.description && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h3 className="text-base font-semibold mb-2">
                        About this lesson
                      </h3>
                      <p className="text-sm text-gray-600">
                        {lesson.description}
                      </p>
                    </div>
                  )}

                  <div>
                    <FeedbackStudent />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border rounded-2xl shadow-md p-10 text-center">
                <FileText className="mx-auto mb-4 w-10 h-10 text-gray-700" />
                <h2 className="text-xl font-semibold mb-4">{lesson.title}</h2>
                <Link
                  to={`/student-course/${course._id}/${module._id}/${lesson._id}/quiz`}
                  className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-md font-medium"
                >
                  Start Quiz
                </Link>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default LessonPlayer;
