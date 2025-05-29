"use client";

import { useEffect, useMemo, useState } from "react";
import { generateFakeUsers, User } from "./lib/generateUsers";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableColumnHeader from "@/components/sortable-column-header";
import { ColumnKey, DEFAULT_COLUMNS, columnLabels } from "./lib/columns";
import { FixedSizeList as List } from "react-window";

const ROW_HEIGHT = 48;
const VISIBLE_ROWS = 12;

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [columns, setColumns] = useState<ColumnKey[]>(DEFAULT_COLUMNS);
  const [sortConfig, setSortConfig] = useState<{
    key: ColumnKey;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("users");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUsers(parsed);
      } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        const fakeUsers = generateFakeUsers(500);
        localStorage.setItem("users", JSON.stringify(fakeUsers));
        setUsers(fakeUsers);
      }
    } else {
      const fakeUsers = generateFakeUsers(500);
      localStorage.setItem("users", JSON.stringify(fakeUsers));
      setUsers(fakeUsers);
    }
  }, []);

  const handleSort = (key: ColumnKey) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const sortedUsers = useMemo(() => {
    if (!sortConfig) return users;

    const { key, direction } = sortConfig;

    return [...users].sort((a, b) => {
      let aValue: string | number = a[key] ?? "";
      let bValue: string | number = b[key] ?? "";

      if (key === "fullName") {
        aValue = `${a.firstName} ${a.lastName}`;
        bValue = `${b.firstName} ${b.lastName}`;
      }

      if (key === "dsr") {
        const getDSR = (date: string) =>
          Math.floor(
            (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
          );
        aValue = getDSR(a.registeredDate);
        bValue = getDSR(b.registeredDate);
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return direction === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [users, sortConfig]);

  return (
    <main className="p-8 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Naiad's User Table</h1>

      <div className="overflow-x-auto border border-gray-700 rounded">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (active.id !== over?.id) {
              setColumns((cols) => {
                const oldIndex = cols.indexOf(active.id as ColumnKey);
                const newIndex = cols.indexOf(over?.id as ColumnKey);
                return arrayMove(cols, oldIndex, newIndex);
              });
            }
          }}
        >
          <SortableContext
            items={columns}
            strategy={horizontalListSortingStrategy}
          >
            <div className="min-w-[900px] w-full">
              <div className="grid grid-cols-8 bg-white sticky top-0 z-10 border-b border-gray-700">
                {columns.map((col) => (
                  <div
                    key={col}
                    className="p-2 border-r border-gray-300 text-sm font-medium text-left"
                  >
                    <SortableColumnHeader
                      id={col}
                      label={columnLabels[col]}
                      onSort={() => handleSort(col)}
                      isSorted={sortConfig?.key === col}
                      sortDirection={
                        sortConfig?.key === col ? sortConfig.direction : null
                      }
                    />
                  </div>
                ))}
              </div>
              <List
                height={ROW_HEIGHT * VISIBLE_ROWS}
                itemCount={sortedUsers.length}
                itemSize={ROW_HEIGHT}
                width="100%"
              >
                {({ index, style }) => {
                  const user = sortedUsers[index];
                  const fullName = `${user.firstName} ${user.lastName}`;
                  const dsr = Math.floor(
                    (Date.now() - new Date(user.registeredDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  return (
                    <div
                      key={user.id}
                      style={style}
                      className="grid grid-cols-8 w-full border-b border-gray-200"
                    >
                      {columns.map((col) => {
                        let value;
                        if (col === "fullName") value = fullName;
                        else if (col === "dsr") value = dsr;
                        else if (col === "registeredDate")
                          value = new Date(user[col]).toLocaleDateString();
                        else value = user[col];

                        return (
                          <div
                            key={col}
                            className="p-2 border-r border-gray-100 text-sm truncate"
                          >
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </List>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </main>
  );
};

export default Home;
