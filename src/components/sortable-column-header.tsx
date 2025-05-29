"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MouseEvent } from "react";
import { GripVertical } from "lucide-react";

interface Props {
  id: string;
  label: string;
  isSorted: boolean;
  sortDirection: "asc" | "desc" | null;
  onSort: () => void;
}

const SortableColumnHeader = ({
  id,
  label,
  isSorted,
  sortDirection,
  onSort,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onSort();
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      className="border border-gray-300 p-2 text-left bg-white sticky top-0 z-10 select-none"
    >
      <div className="flex items-center gap-2">
        {/* Drag handle only has drag listeners */}
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={24} className="text-gray-500" />
        </span>

        <button
          onClick={handleClick}
          className="flex items-center gap-1 font-medium text-sm"
        >
          {label}
          {isSorted && (
            <span className="text-xs">
              {sortDirection === "asc" ? "▲" : "▼"}
            </span>
          )}
        </button>
      </div>
    </th>
  );
};

export default SortableColumnHeader;
