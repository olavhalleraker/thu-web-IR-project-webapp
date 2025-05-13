import { redirect } from "next/navigation";
import { WelcomeTitle } from "@/components/home/welcome-title";
import { Suspense } from "react";
import SearchResults from "@/components/search/search-results"; // Make sure this is default export
import { ResultSkeleton } from "@/components/search/result-skeleton";
import { SearchInput } from "@/components/home/search-input";
import SearchResultsWrapper from "@/components/search/search-results-wrapper";

type SearchParams = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function Page({ searchParams }: SearchParams) {
  const q = await searchParams.then((params) => params.q);
  
  if (!q) {
    redirect("/");
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-10">
          <WelcomeTitle />
          <div className="flex flex-row gap-2">
            <SearchInput defaultValue={q} />
          </div>
        </div>

      <SearchResultsWrapper q={q} />
      </main>
    </div>
  );
}
