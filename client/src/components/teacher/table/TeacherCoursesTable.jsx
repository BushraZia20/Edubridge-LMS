import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../StatusBadge";

const MyCoursesTable = ({ data }) => {
  const navigate = useNavigate();

  const handleView = (courseId) => {
    // navigate(`/teacher/course-details/${courseId}`);
    navigate(`/course-details/${courseId}`);
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Course Title",
      cell: ({ getValue }) => (
        <span className="text-gray-800 font-medium">{getValue()}</span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "enrollments",
      header: "Enrollments",
      cell: ({ row }) => (
        <span className="text-gray-800">{row.original.enrollments ?? "-"}</span>
      ),
    },
    {
      id: "completion",
      header: "Completion Rate",
      cell: ({ row }) => (
        <span className="text-gray-800">{row.original.completion ?? "-"}</span>
      ),
    },
    {
      id: "updated",
      header: "Last Updated",
      cell: ({ row }) => (
        <span className="text-gray-800">{row.original.updated ?? "-"}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-4 text-sm">
          <FaEdit
            className="text-blue-600 cursor-pointer hover:opacity-80"
            onClick={() => row.original.onEdit?.()}
          />

          <FaTrash
            className="text-red-500 cursor-pointer hover:opacity-80"
            onClick={() => row.original.onDelete?.()}
          />

          <FaExternalLinkAlt
            className="text-gray-700 cursor-pointer hover:opacity-80"
            onClick={() => handleView(row.original._id)}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-[#f3f3f3] text-gray-600">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-5 py-4 text-left font-medium tracking-wide"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-100 last:border-none hover:bg-[#fafafa] transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-5 py-4 text-sm text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCoursesTable;
