import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/student/Navbar";
import Footer from "../../components/common/Footer";

const QuizAttempt = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question:
        'What is the correct syntax to output "Hello, World" in Python?',
      options: [
        'print "Hello, World"',
        'echo("Hello, World")',
        'print("Hello, World")',
        'System.out.print("Hello, World")',
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "Which of the following is a valid variable name in Python?",
      options: ["2name", "my-name", "my_name", "my name"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "What data type is the result of: type(5.0)?",
      options: ["int", "str", "float", "bool"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question:
        "Which of the following is used to get input from the user in Python?",
      options: ["input()", "get()", "scan()", "prompt()"],
      correctAnswer: 0,
    },
  ];

  const [answers, setAnswers] = useState({});

  const handleSelect = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const storageKey = `quiz-score-${courseId}-${moduleId}-${lessonId}`;
    const previousScore = Number(localStorage.getItem(storageKey));

    const highestScore = Math.max(score, previousScore || 0);

    localStorage.setItem(storageKey, highestScore);

    navigate(`/student-course/${courseId}/${moduleId}/${lessonId}/quiz`);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 flex flex-col">
        <div className="flex-1 px-8 lg:px-24 py-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-xl font-semibold">Quiz: Python Basics</h1>
              <p className="text-sm text-gray-500 mt-1">
                4 Questions • 20 minutes • 4 points
              </p>
            </div>

            <div className="text-sm font-medium text-gray-700">00:00</div>
          </div>

          <div className="space-y-8">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="border border-yellow-400 rounded-xl p-6"
              >
                <h2 className="font-medium mb-4">
                  {index + 1}. {q.question}
                </h2>

                <div className="space-y-3">
                  {q.options.map((opt, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === i}
                        onChange={() => handleSelect(q.id, i)}
                        className="accent-yellow-500"
                      />
                      <span className="text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md font-medium"
            >
              Submit
            </button>

            <button className="border border-gray-300 px-6 py-2 rounded-md">
              Save draft
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default QuizAttempt;
