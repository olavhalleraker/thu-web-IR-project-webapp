import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { WelcomeTitle } from "@/components/home/welcome-title";
import { Suspense } from "react";
import SearchResults from "@/components/search/search-results"; // Make sure this is default export
import { Skeleton } from "@/components/ui/skeleton";
import { ResultSkeleton } from "@/components/search/result-skeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: { [q: string]: string | undefined };
}) {
  const { q } = await searchParams;

  if (!q) {
    redirect("/");
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-10">
          <WelcomeTitle />
          <div className="flex flex-row gap-2">
            <Input
              className="w-full sm:w-128"
              placeholder="Search..."
              autoComplete="off"
              defaultValue={q}
            />
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center gap-2 p-8 w-full sm:w-128">
              <ResultSkeleton />
              <ResultSkeleton />
              <ResultSkeleton />
            </div>
          }>
          <SearchResults q={q} />
        </Suspense>
      </main>
    </div>
  );
}
