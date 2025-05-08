import { SearchInput } from "@/components/home/search-input";
import { WelcomeTitle } from "@/components/home/welcome-title";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center gap-8 sm-items-start pt-32">
        <div className="flex flex-col items-center gap-10 pb-8">
          <WelcomeTitle />
          <div className="flex flex-row gap-2">
            <SearchInput />

          </div>
        </div>
      </main>
    </div>
  );
}
