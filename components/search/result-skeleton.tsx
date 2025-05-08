import { Skeleton } from "../ui/skeleton";

export function ResultSkeleton() {
    return (
        <div className="flex flex-col items-start gap-2 p-4  w-full md:w-256 p-4">
            <Skeleton className="h-12 w-[30%] rounded-full" />
            <div className="flex flex-col w-full gap-2">
                <Skeleton className="h-4 w-[100%] pr-32" />
                <Skeleton className="h-4 w-[80%]" />
            </div>
        </div>
    )
}