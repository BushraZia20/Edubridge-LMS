import { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";

const AddQuizForm = ({ onClose, onSave }) => {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 1,
    },
  ]);

  useEffect(() => {
    console.log("questions", questions);
  }, [questions]);

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswer = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 1,
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleDone = () => {
    onSave({
      title: quizTitle,
      description,
      questions,
    });
    onClose();
  };

  return (
    <div className="space-y-8">
      {/* Quiz Title */}
      <input
        type="text"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="
          w-full border border-gray-200 rounded-xl
          px-5 py-3 text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-yellow-400
        "
      />

      {/* Description */}
      <input
        type="text"
        placeholder="Short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="
          w-full border border-gray-200 rounded-xl
          px-5 py-3 text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-yellow-400
        "
      />

      {/* QUESTIONS */}
      <div className="space-y-10">
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="border border-gray-200 rounded-2xl p-6 bg-white space-y-6"
          >
            {/* Question Header */}
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">
                Question {qIndex + 1}
              </h4>

              {questions.length > 1 && (
                <button
                  onClick={() => removeQuestion(qIndex)}
                  className="text-sm text-red-500 flex items-center gap-1"
                >
                  <FiTrash />
                  Remove
                </button>
              )}
            </div>

            {/* Question Input */}
            <input
              type="text"
              placeholder="Write your question here"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="
                w-full border border-gray-200 rounded-xl
                px-5 py-3 text-sm
                focus:outline-none focus:ring-2 focus:ring-yellow-400
              "
            />

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.options.map((opt, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  className="
                    w-full border border-gray-200 rounded-xl
                    px-4 py-2.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-yellow-400
                  "
                />
              ))}
            </div>

            {/* Correct Answer */}
            <select
              value={q.correctAnswer}
              onChange={(e) =>
                handleCorrectAnswer(qIndex, Number(e.target.value))
              }
              className="
                w-full border border-gray-200 rounded-xl
                px-5 py-3 text-sm bg-white
                focus:outline-none focus:ring-2 focus:ring-yellow-400
              "
            >
              <option value={1}>Correct Answer: Option 1</option>
              <option value={2}>Correct Answer: Option 2</option>
              <option value={3}>Correct Answer: Option 3</option>
              <option value={4}>Correct Answer: Option 4</option>
            </select>
          </div>
        ))}
      </div>

      {/* Add Question */}
      <div className="flex justify-end">
        <button
          onClick={addQuestion}
          className="
            flex items-center gap-2
            px-6 py-3
            border border-gray-300
            rounded-xl
            text-sm
            bg-white
            hover:bg-gray-50
          "
        >
          <FiPlus />
          Add Question
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          onClick={onClose}
          className="
            px-8 py-3
            border border-gray-300
            rounded-xl
            text-sm
            bg-white
          "
        >
          Cancel
        </button>

        <button
          onClick={handleDone}
          className="px-8 py-3 bg-yellow-400 rounded-xl text-sm font-medium"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AddQuizForm;
