import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

export default function Hero({ hasCourses, scrollToRecommended }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (hasCourses) {
      navigate("/s-enrolled-courses");
    } else {
      scrollToRecommended();
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid md:grid-cols-2 gap-10 items-center">
      {/* LEFT */}
      <div className="animate-hero-text text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.2]">
          Welcome back, <br />
          <span>John!</span>
        </h1>

        <p className="text-gray-600 mt-5 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
          Ready to continue your journey in UI/UX and AI? Let’s keep learning
          and building your future — one course at a time.
        </p>

        <button
          onClick={handleClick}
          className="
            mt-8
            bg-yellow-400
            hover:bg-yellow-500
            transition-all
            px-8 sm:px-10
            py-3 sm:py-4
            rounded-full
            font-semibold
            text-base sm:text-lg
            shadow-md
            hover:shadow-lg
            hover:scale-[1.02]
          "
        >
          {hasCourses ? "Resume My Course" : "Start Learning"}
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex justify-center animate-hero-fade">
        <div
          className="
          bg-yellow-400 
          rounded-full 
          flex 
          items-center 
          justify-center
          w-60 h-60 
          sm:w-80 sm:h-80
          md:w-[480px] md:h-[480px]
          lg:w-[560px] lg:h-[560px]
        "
        >
          <img
            src={assets.herosectionrightimg}
            alt="Learning Illustration"
            className="
              animate-float
              w-40 sm:w-56 
              md:w-[320px] 
              lg:w-[390px]
            "
          />
        </div>
      </div>
    </section>
  );
}
