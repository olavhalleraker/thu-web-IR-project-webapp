"use client";

import { Suspense } from "react";
import SearchResult from "./search-result";
import { EvalChartSkeleton } from "./eval-chart-skeleton";
import EvalChartWrapper from "./eval-chart-wrapper";
import { doc } from "../types";

export default function SearchResultsPage({
  paginatedData,
  q,
  scoreCache,
  setScoreCache,
}: {
  paginatedData: doc[];
  q: string;
  scoreCache: Record<string, [number, number]>;
  setScoreCache: React.Dispatch<React.SetStateAction<Record<string, [number, number]>>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 w-full">
      {paginatedData.map((doc) => (
        <div
          key={doc.url}
          className="flex flex-col w-full md:grid md:grid-cols-6"
        >
          {/* Search result content loads immediately */}
          <SearchResult doc={doc} />

          {/* Desktop (md and up): Show chart */}
          <div className="hidden md:flex col-span-1 flex-col items-center justify-center border-l-1 border-dashed">
            <Suspense
              key={"chartsuspense" + doc.url}
              fallback={<EvalChartSkeleton />}
            >
              <EvalChartWrapper
                doc={doc}
                q={q}
                scoreCache={scoreCache}
                setScoreCache={setScoreCache}
              />
            </Suspense>
          </div>

          {/* Mobile: Show simplified score */}
          <div className="flex md:hidden col-span-1 flex-col items-center justify-center border-l-1 border-dashed text-sm text-gray-600 text-center px-2">
            Stance:{" "}
            {scoreCache[doc.url] !== undefined ? (
              scoreCache[doc.url][0] === 0 ? (
                scoreCache[doc.url][1] >= 0.6 ? (
                  "Disagree"
                ) : (
                  "Slightly Disagree"
                )
              ) : scoreCache[doc.url][0] === 100 ? (
                scoreCache[doc.url][1] >= 0.6 ? (
                  "Agree"
                ) : (
                  "Slightly Agree"
                )
              ) : scoreCache[doc.url][1] < 0.6 ? (
                "Uncertain/Neutral"
              ) : (
                "Neutral"
              )
            ) : (
              <div className="spinner-border animate-spin w-4 h-4 border-2 rounded-full" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
