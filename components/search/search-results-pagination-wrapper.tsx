"use client";

import { useState } from "react";
import { doc } from "../types";
import SearchResultsPage from "./search-results-page";

export default function SearchResultsPaginationWrapper({
    data,
    q,
    searchTime,
}: {
    data: doc[];
    q: string;
    searchTime: number;
}) {
    const [page, setPage] = useState(1);
    const [canNavigate, setCanNavigate] = useState(true);
    const [scoreCache, setScoreCache] = useState<Record<string, number>>({});

    const itemsPerPage = 10;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (!canNavigate || newPage === page) return;
        setPage(newPage);
        setCanNavigate(false);


        setTimeout(() => {
            const container = document.getElementById("results-top");
            container?.scrollIntoView({ behavior: "smooth" });
        }, 50);

        // Re-enable navigation after 2 seconds
        setTimeout(() => {
            setCanNavigate(true);
        }, 5000);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-2 w-full md:w-256">
            <p className="text-xs text-gray-500">
                {data.length} search results in {searchTime / 1000} seconds
            </p>

            {/* Results */}
            <div id="results-top" />

            <SearchResultsPage q={q} paginatedData={paginatedData} scoreCache={scoreCache} setScoreCache={setScoreCache} />

            {/* Bottom Pagination Controls (optional, duplicate for UX) */}
            <div className="flex justify-center gap-2 mt-8">
                {page > 1 && (
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={!canNavigate}
                        className={`text-blue-500 hover:underline ${!canNavigate ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        ← Previous
                    </button>
                )}
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    const startPage = Math.max(1, Math.min(page - 2, totalPages - 4));
                    const pageNumber = startPage + i;
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            disabled={!canNavigate}
                            className={`px-3 py-1 rounded ${page === pageNumber ? "bg-blue-100 font-bold" : "hover:underline"
                                } ${!canNavigate ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
                {page < totalPages && (
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={!canNavigate}
                        className={`text-blue-500 hover:underline ${!canNavigate ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Next →
                    </button>
                )}
            </div>
        </div>
    );
}
