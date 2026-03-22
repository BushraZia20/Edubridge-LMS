import { useNavigate } from "react-router-dom";

const steps = [
  {
    id: 1,
    label: "Basic Information",
    path: "/teacher/create-course/step-1",
  },
  {
    id: 2,
    label: "Curriculum Builder",
    path: "/teacher/create-course/step-2",
  },
  {
    id: 3,
    label: "Confirmation",
    path: "/teacher/create-course/step-3",
  },
];

const CreateCourseSteps = ({ currentStep = 1, orientation = "vertical" }) => {
  const navigate = useNavigate();

  /* =======================
     HORIZONTAL (MOBILE)
  ======================= */
  if (orientation === "horizontal") {
    return (
      <div className="flex justify-between items-center mb-8">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              onClick={() => navigate(step.path)}
              className="flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                  ${
                    isActive || isCompleted
                      ? "bg-yellow-400 text-black"
                      : "border border-gray-300 text-gray-400"
                  }
                `}
              >
                {isCompleted ? "✓" : step.id}
              </div>

              <span
                className={`text-[10px] mt-1 text-center ${
                  isActive ? "text-black font-semibold" : "text-gray-400"
                }`}
              >
                STEP {step.id}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  /* =======================
     VERTICAL (DESKTOP)
  ======================= */
  return (
    <div className="w-48">
      <div className="relative flex flex-col gap-12">
        <div className="absolute left-3.5 top-3 h-full w-px bg-gray-200" />

        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              onClick={() => navigate(step.path)}
              className="relative flex items-start gap-4 cursor-pointer"
            >
              <div
                className={`z-10 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold
                  ${
                    isActive || isCompleted
                      ? "bg-yellow-400 text-black"
                      : "bg-white border border-gray-300 text-gray-400"
                  }
                `}
              >
                {isCompleted ? "✓" : step.id}
              </div>

              <div className="pt-0.5">
                <p className="text-[11px] font-semibold text-gray-400 tracking-widest">
                  STEP {step.id}
                </p>
                <p
                  className={`text-sm ${
                    isActive ? "font-semibold text-black" : "text-gray-600"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateCourseSteps;
