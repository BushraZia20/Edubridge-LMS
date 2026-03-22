export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-4 mb-2">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>

      {subtitle && (
        <p className="text-gray-600 mt-2 text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
