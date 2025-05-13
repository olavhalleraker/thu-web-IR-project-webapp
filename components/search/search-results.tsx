import { classifyAll, querySearch } from "@/app/actions";
import { doc, stance } from "@/components/types";
import EvalChartWrapper from "./eval-chart-wrapper";
import SearchResult from "./search-result";
import { Suspense } from "react";
import { EvalChartSkeleton } from "./eval-chart-skeleton";

export default async function SearchResults({ q }: { q: string }) {
    const startTime = Date.now();
    let searchTime = -1000;
    let classificationTime = -1000;

    const data: doc[] = await querySearch(q).then(async (data) => {
        searchTime = Date.now() - startTime;
        classificationTime = Date.now() - startTime;
        return data
    });
    // function getRandomScore() {
    //     return Math.floor(Math.random() * 100) + 1;
    // }

    return (
        <div className="flex flex-col items-center justify-center gap-2 w-full md:w-256">
            <p className="text-xs text-gray-500">
                {data.length} search results in {searchTime / 1000} seconds and classifications in {classificationTime / 1000} seconds
            </p>
            <div className="flex flex-col items-center justify-center gap-8 p-8 w-full">
                {data.map((doc) => (
                    <div
                        key={doc.url}
                        className="flex flex-col w-full sm:grid sm:grid-cols-6"
                    >
                        {/* Search result content loads immediately */}
                        <SearchResult doc={doc} q={q} />

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
                                <EvalChartWrapper doc={doc} q={q} />
                            </Suspense>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}
