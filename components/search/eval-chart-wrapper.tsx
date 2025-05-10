import { doc } from "../types";
import { EvalChart } from "./eval-chart";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";


export default async function EvalChartWrapper({  doc }: { doc: doc }) {




    const score: number = await doc.stance.then((stance) => {
        // If stance.classification -1 set score 0, if 0 set 0.5, else set 1.
        // const score = stance.classification == -1 ? 0 : stance.classification == 0 ? 50 : 100;
        return stance.classification == -1 ? 0 : stance.classification == 0 ? 50 : 100;
    }
    );
    // If stance.classification -1 set score 0, if 0 set 0.5, else set 1.
    // const score = stance.classification == -1 ? 0 : stance.classification == 0 ? 50 : 100;
    return (
            <Suspense
                fallback={
                    <div className="flex flex-col items-center justify-center gap-2 p-8 w-full sm:w-128">
                        <Skeleton className="h-12 w-[30%] rounded-full" />
                        <div className="flex flex-col w-full gap-2">
                            <Skeleton className="h-4 w-[100%] pr-32" />
                            <Skeleton className="h-4 w-[80%]" />
                        </div>
                    </div>
                }
            >
                <EvalChart score={score} />
            </Suspense>
        );
}
