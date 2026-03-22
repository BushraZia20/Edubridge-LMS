const StatusBadge = ({ status }) => {
  const styles = {
    published: "bg-green-100 text-green-700",
    draft: "bg-yellow-100 text-yellow-700",
    archived: "bg-red-100 text-red-600",
  };

  const labels = {
    published: "Published",
    draft: "Draft",
    archived: "Archived",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
};

export default StatusBadge;
