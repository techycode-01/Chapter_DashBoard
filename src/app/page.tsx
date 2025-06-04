"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import chaptersData from "../lib/chapters.json";
import {
  CheckCircle,
  Atom,
  Flask,
  MathOperations,
  Book,
  ArrowUp,
  ArrowDown,
  Moon,
} from "@phosphor-icons/react";

export default function Home() {
  // Dynamically get all subjects from chapters.json
  const subjects = Array.from(new Set(chaptersData.map((ch) => ch.subject)));
  const [subject, setSubject] = useState(subjects[0] || "Physics");
  // Filters and sort state
  const [filters, setFilters] = useState({
    class: "",
    unit: "",
    status: "",
    weak: false,
  });
  const [sortAsc, setSortAsc] = useState(true);
  const [sortBy] = useState("chapter"); // or "solved"
  const [dark, setDark] = useState(false);

  // Make dark mode affect the entire page
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (dark) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }, [dark]);

  // Unique filter options
  const uniqueClasses = Array.from(
    new Set(
      chaptersData.filter((ch) => ch.subject === subject).map((ch) => ch.class)
    )
  );
  const uniqueUnits = Array.from(
    new Set(
      chaptersData.filter((ch) => ch.subject === subject).map((ch) => ch.unit)
    )
  );

  // Filtering logic
  let filteredChapters = chaptersData.filter(
    (ch) =>
      ch.subject === subject &&
      (filters.class ? ch.class === filters.class : true) &&
      (filters.unit ? ch.unit === filters.unit : true) &&
      (filters.status ? ch.status === filters.status : true) &&
      (!filters.weak || ch.isWeakChapter === true)
  );

  // Sorting logic
  filteredChapters = filteredChapters.sort((a, b) => {
    if (sortBy === "chapter") {
      return sortAsc
        ? a.chapter.localeCompare(b.chapter)
        : b.chapter.localeCompare(a.chapter);
    } else if (sortBy === "solved") {
      return sortAsc
        ? (a.questionSolved ?? 0) - (b.questionSolved ?? 0)
        : (b.questionSolved ?? 0) - (a.questionSolved ?? 0);
    }
    return 0;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-background border-r flex-col py-6 px-4">
        <div className="flex items-center gap-2 mb-8">
          <span className="bg-orange-100 p-2 rounded-full">
            <CheckCircle size={24} weight="fill" className="text-orange-500" />
          </span>
          <div>
            <div className="font-bold text-lg">JEE Main</div>
            <div className="text-xs text-gray-400">
              2025 - 2009 | 173 Papers | 15825 Qs
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {subjects.map((subj) => (
            <button
              key={subj}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                subject === subj
                  ? "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => {
                setSubject(subj);
                setFilters({ class: "", unit: "", status: "", weak: false }); // Reset filters on subject change
              }}
            >
              {subj === "Physics" && <Atom size={18} />}
              {subj === "Chemistry" && (
                <Flask size={18} className="text-green-500" />
              )}
              {subj === "Mathematics" && (
                <MathOperations size={18} className="text-blue-500" />
              )}
              {subj} PYQs
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 px-2 sm:px-4 md:px-10 py-4 md:py-8">
        {/* Subject selector for mobile */}
        <nav className="flex md:hidden gap-2 flex-wrap w-full pb-2 mb-2">
          {subjects.map((subj) => (
            <button
              key={subj}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${
                subject === subj
                  ? "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-800"
              }`}
              style={{ minWidth: 0 }}
              onClick={() => {
                setSubject(subj);
                setFilters({ class: "", unit: "", status: "", weak: false });
              }}
            >
              {subj === "Physics" && (
                <Atom size={18} className="text-orange-500" />
              )}
              {subj === "Chemistry" && (
                <Flask size={18} className="text-green-500" />
              )}
              {subj === "Mathematics" && (
                <MathOperations size={18} className="text-blue-500" />
              )}
              {subj} PYQs
            </button>
          ))}
        </nav>
        <div className="mb-4 flex flex-col items-center">
          <div className="flex w-full items-center justify-between gap-1 flex-wrap">
            <div className="text-lg font-bold text-black-600 flex items-center justify-center gap-2 w-full text-center">
              {subject === "Physics" && <Atom size={20} />}
              {subject === "Chemistry" && (
                <Flask size={20} className="text-green-500" />
              )}
              {subject === "Mathematics" && (
                <MathOperations size={20} className="text-blue-500" />
              )}
              {subject} PYQs
            </div>
            <button
              className="ml-2 p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <Moon size={20} />
              ) : (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="text-base sm:text-md font-semibold text-center mt-1">
            Chapter-wise Collection of {subject} PYQs
          </div>
        </div>
        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row gap-2 mb-2 flex-wrap items-stretch sm:items-center">
          {/* Class Filter */}
          <select
            className="border rounded px-3 py-1 text-sm text-foreground bg-background"
            value={filters.class}
            onChange={(e) =>
              setFilters((f) => ({ ...f, class: e.target.value }))
            }
          >
            <option className="text-foreground bg-background" value="">
              Class
            </option>
            {uniqueClasses.map((cls) => (
              <option
                className="text-foreground bg-background"
                key={cls}
                value={cls}
              >
                {cls}
              </option>
            ))}
          </select>
          {/* Unit Filter */}
          <select
            className="border rounded px-3 py-1 text-sm text-foreground bg-background"
            value={filters.unit}
            onChange={(e) =>
              setFilters((f) => ({ ...f, unit: e.target.value }))
            }
          >
            <option className="text-foreground bg-background" value="">
              Units
            </option>
            {uniqueUnits.map((unit) => (
              <option
                className="text-foreground bg-background"
                key={unit}
                value={unit}
              >
                {unit}
              </option>
            ))}
          </select>
          {/* Status Filter */}
          <select
            className="border rounded px-3 py-1 text-sm text-foreground bg-background"
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value }))
            }
          >
            <option className="text-foreground bg-background" value="">
              Status
            </option>
            {Array.from(
              new Set(
                chaptersData
                  .filter((ch) => ch.subject === subject)
                  .map((ch) => ch.status)
              )
            ).map((status) => (
              <option
                className="text-foreground bg-background"
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
          {/* Not Started Filter (status) */}
          <button
            className={`border rounded px-2 py-1 text-xs sm:text-sm w-full sm:w-auto ${
              filters.status === "Not Started"
                ? "bg-orange-100 text-orange-600"
                : ""
            }`}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                status: f.status === "Not Started" ? "" : "Not Started",
              }))
            }
          >
            Not Started
          </button>
          {/* Weak Chapters Toggle */}
          <button
            className={`border rounded px-2 py-1 text-xs sm:text-sm w-full sm:w-auto ${
              filters.weak ? "bg-orange-100 text-orange-600" : ""
            }`}
            onClick={() => setFilters((f) => ({ ...f, weak: !f.weak }))}
          >
            Weak Chapters
          </button>
          {/* Sort Button */}
          <button
            className="sm:ml-auto flex items-center gap-1 border rounded px-2 py-1 text-xs sm:text-sm text-gray-500 w-full sm:w-auto"
            onClick={() => setSortAsc((a) => !a)}
            title={sortAsc ? "Sort Descending" : "Sort Ascending"}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
            {sortAsc ? "A-Z" : "Z-A"}
          </button>
        </div>
        <div className="text-xs text-gray-500 mb-2">
          Showing all chapters ({filteredChapters.length})
        </div>
        {/* Chapter List */}
        <div className="space-y-2">
          {filteredChapters.map((chapter, idx) => (
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border rounded-lg px-2 sm:px-4 py-2 sm:py-3 hover:shadow-sm transition cursor-pointer text-foreground bg-background"
              key={idx}
            >
              <div className="flex items-center gap-2">
                <Book size={18} className="text-orange-500" />
                <span className="font-medium text-gray-800">
                  {chapter.chapter}
                </span>
              </div>
              <div className="flex items-center gap-6 text-xs text-gray-600">
                <span>
                  2025: {chapter.yearWiseQuestionCount["2025"] ?? 0} Qs{" "}
                  <ArrowUp size={14} className="inline text-green-500" />
                </span>
                <span>
                  2024: {chapter.yearWiseQuestionCount["2024"] ?? 0} Qs{" "}
                  <ArrowDown size={14} className="inline text-red-500" />
                </span>
                <span>{chapter.questionSolved}/205 Qs</span>
              </div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <footer className="w-full border-t mt-10 py-6 flex flex-col items-center gap-2 text-xs text-muted-foreground">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </main>
    </div>
  );
}
