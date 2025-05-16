import { doc } from "@/components/types";

export default function SearchResult({ doc }: { doc: doc }) {
    return (
        <div
            className="sm:col-span-5 flex flex-col items-start gap-2 p-4"
        >
            <a href={doc.url} className="text-blue-500 hover:text-blue-700 font-bold">
                {doc.title}
            </a>
            <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-8 sm:justify-between">
                <p className="text-gray-500 text-xs truncate">
                    {(() => {
                        const fullSegments = doc.url.replace(/^https?:\/\//, "").split("/");
                        const displaySegments: string[] = [];
                        const indexMap: number[] = []; 

                        let ellipsisInserted = false;

                        fullSegments.forEach((segment, i) => {
                            if (isNaN(Number(segment)) && !/^\d+$/.test(segment)) {
                                displaySegments.push(segment);
                                indexMap.push(i);
                            } else if (!ellipsisInserted) {
                                displaySegments.push("...");
                                indexMap.push(-1);
                                ellipsisInserted = true;
                            }
                        });

                        return displaySegments.map((segment, index) => {
                            if (segment === "...") {
                                return (
                                    <span key={index}>
                                        <span className="text-gray-500">...</span>
                                        {index < displaySegments.length - 1 && " -> "}
                                    </span>
                                );
                            }

                            // Rebuild href from fullSegments up to the current mapped index
                            const realIndex = indexMap[index];
                            const path = fullSegments.slice(0, realIndex + 1).join("/");

                            return (
                                <span key={index}>
                                    <a
                                        href={`https://${path}`}
                                        className="text-gray-500 hover:underline"
                                    >
                                        {segment}
                                    </a>
                                    {index < displaySegments.length - 1 && " -> "}
                                </span>
                            );
                        });
                    })()}
                </p>
                <p className="text-gray-500 text-xs align-right text-nowrap">
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
            </div>
            <p>
                {doc.summary.split(" ").slice(0, 40).join(" ")}
                {doc.summary.split(" ").length > 40 && "..."}
            </p>
        </div>
    )
}