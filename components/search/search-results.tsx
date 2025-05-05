// app/components/search/search-results.tsx
import { querySearch } from "@/app/actions";
import { Badge } from "@/components/ui/badge";

export default async function SearchResults({ q }: { q: string }) {
  const data = await querySearch(q);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full sm:w-128">
      <div className="flex flex-col items-center justify-center gap-2 p-8 w-full sm:w-128">
        {data.map((doc) => (
          <div
            key={doc.url}
            className="flex flex-col items-start gap-2 p-4 border rounded-lg shadow-md w-full"
          >
            <a href={doc.url} className="text-blue-500 hover:text-blue-700 font-bold">
              {doc.title}
            </a>
            <p className="text-gray-500 text-sm">
              Last edited - {
                new Date(doc.lastmod).toLocaleDateString("en-UK", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }
            )}

            </p>
            <p>{doc.summary}</p>
            <div className="flex flex-row items-center gap-2">
              {doc.tags?.map((tag, index) => (
                <Badge key={index} className="mr-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
