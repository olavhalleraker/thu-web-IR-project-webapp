import { Suspense } from "react";
import { ResultSkeleton } from "./result-skeleton";
import SearchResults from "./search-results";

export default async function SearchResultsWrapper({ q }: { q: string }) {
    return (
        <Suspense
            key={q}
            fallback={
                <div className="flex flex-col items-center justify-center gap-2 p-8 w-full sm:w-128">
                    <ResultSkeleton />
                    <ResultSkeleton />
                    <ResultSkeleton />
                    <ResultSkeleton />
                    <ResultSkeleton />
                    <ResultSkeleton />
                    <ResultSkeleton />
                </div>
            }>
            <SearchResults q={q} />
        </Suspense>
    );
}