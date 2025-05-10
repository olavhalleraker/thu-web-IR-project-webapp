import { classifyAll, querySearch } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { doc, stance } from "@/components/types";
import EvalChartWrapper from "./eval-chart-wrapper";

export default async function SearchResults({ q }: { q: string }) {
    const startTime = Date.now();
    const data: doc[] = await querySearch(q).then(async (data) => {
        const stances: stance[] = await classifyAll(q, data);

        const promises = data.map((doc, index) => {
            return new Promise<doc>((resolve) => {
                const stance = stances[index];
                doc.stance = Promise.resolve(stance);
                resolve(doc);
            });
        });
        return Promise.all(promises);
    });
    // function getRandomScore() {
    //     return Math.floor(Math.random() * 100) + 1;
    // }

    return (
        <div className="flex flex-col items-center justify-center gap-2 w-full md:w-256">
            <p className="text-xs text-gray-500">
                {data.length} search results in {(Date.now() - startTime) / 1000} seconds
            </p>
            <div className="flex flex-col items-center justify-center gap-8 p-8 w-full">
                {data.map((doc) => (
                    // <div
                    //     key={doc.url}
                    //     className="flex flex-col w-[50%] sm:grid sm:grid-cols-6 sm:w-full border rounded-lg shadow-md">
                    <div
                        key={doc.url}
                        className="flex flex-col w-full sm:grid sm:grid-cols-6"
                    >
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
                            <div className="flex flex-row items-center gap-2">
                                {doc.tags?.map((tag, index) => (
                                    <Badge key={index} className="mr-1">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col items-center justify-center border-l-1 border-dashed invisible sm:visible">

                            <EvalChartWrapper doc={doc} />

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
