export default function CategoryCard({ title, desc }) {
  return (
    <div
      className="
        rounded-2xl
        p-6
        bg-white
        border
        border-gray-200
        shadow-[0_6px_24px_rgba(0,0,0,0.06)]
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
      "
    >
      <h3 className="font-semibold text-lg text-gray-900">{title}</h3>

      {desc && <p className="text-gray-500 text-sm mt-2 leading-6">{desc}</p>}
    </div>
  );
}
