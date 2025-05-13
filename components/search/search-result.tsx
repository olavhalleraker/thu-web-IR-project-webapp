import { doc } from "@/components/types";



export default function SearchResult( { doc, q }: { doc: doc, q: string }) {



    return (
        <div
                            className="sm:col-span-5 flex flex-col items-start gap-2 p-4"
                        >
                            <a href={doc.url} className="text-blue-500 hover:text-blue-700 font-bold">
                                {doc.title}
                            </a>
                            <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-8 sm:justify-between">
                                <p className="text-gray-500 text-xs truncate">
                                    {doc.url
                                        .replace(/https?:\/\//, "")
                                        .split("/")
                                        .reduce<string[]>((acc, segment, index) => {
                                            if (
                                                isNaN(Number(segment)) &&
                                                !/^\d+$/.test(segment)
                                            ) {
                                                acc.push(segment);
                                            } else if (
                                                index > 0 &&
                                                !acc.includes("...")
                                            ) {
                                                acc.push("...");
                                            }
                                            return acc;
                                        }, [])
                                        .map((segment, index, array) => {
                                            const cumulativePath = array
                                                .slice(0, index + 1)
                                                .join("/");
                                            return (
                                                <span key={index}>
                                                    <a
                                                        href={`https://${cumulativePath}`}
                                                        className="text-gray-500 hover:underline"
                                                    >
                                                        {segment}
                                                    </a>
                                                    {index < array.length - 1 && " -> "}
                                                </span>
                                            );
                                        })}
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
                            <p>{doc.summary}</p>
                        </div>
    )
}