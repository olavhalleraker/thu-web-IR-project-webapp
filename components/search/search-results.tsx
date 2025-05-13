import { querySearch } from "@/app/actions";
import { doc } from "@/components/types";
import SearchResultsPaginationWrapper from "./search-results-pagination-wrapper";

export default async function SearchResults({ q }: { q: string }) {
    const startTime: number = Date.now();
    let searchTime: number = -1000;

    const data: doc[] = await querySearch(q).then(async (data) => {
        searchTime = Date.now() - startTime;
        return data
    });

    return (
        <>
            <SearchResultsPaginationWrapper data={data} q={q} searchTime={searchTime} />
        </>
    );
}
