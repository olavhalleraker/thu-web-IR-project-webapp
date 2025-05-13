"use client";

import { Suspense } from "react";
import SearchResult from "./search-result";
import { EvalChartSkeleton } from "./eval-chart-skeleton";
import EvalChartWrapper from "./eval-chart-wrapper";
import { doc } from "../types";

export default function SearchResultsPage( { paginatedData, q, scoreCache, setScoreCache }: { paginatedData: doc[]; q: string;   scoreCache: Record<string, number>;
    setScoreCache: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  } ) {
    return (
        <div className="flex flex-col items-center justify-center gap-8 p-8 w-full">
                {paginatedData.map((doc) => (
                    <div
                        key={doc.url}
                        className="flex flex-col w-full sm:grid sm:grid-cols-6"
                    >
                        {/* Search result content loads immediately */}
                        <SearchResult doc={doc} />

                        {/* Suspense only around the evaluation chart */}
                        <div className="col-span-1 flex flex-col items-center justify-center border-l-1 border-dashed invisible sm:visible">
                            <Suspense
                                key={"chartsuspense" + doc.url}
                                fallback={
                                    // <div className="flex flex-col items-center justify-center gap-2 p-8 w-full sm:w-128">
                                    //     <div className="h-12 w-[30%] rounded-full bg-gray-200 animate-pulse" />

                                    // </div>
                                    <EvalChartSkeleton />
                                }
                            >
                                <EvalChartWrapper doc={doc} q={q} scoreCache={scoreCache} setScoreCache={setScoreCache} />
                            </Suspense>
                        </div>
                    </div>
                ))}
            </div>
    );
}