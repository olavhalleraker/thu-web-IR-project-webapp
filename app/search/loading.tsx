// app/search/loading.tsx
import { ResultSkeleton } from "@/components/search/result-skeleton";

export default function Loading() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-10">
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="flex flex-row gap-2 w-96">
            <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-8 w-full sm:w-128">
          {Array.from({ length: 6 }).map((_, i) => (
            <ResultSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
