import { Skeleton } from "../ui/skeleton";

export function ResultSkeleton() {
    return (
        <div className="flex flex-col items-start gap-2 p-4 border rounded-lg shadow-md w-full p-4">
            <Skeleton className="h-12 w-[100px] rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[350px]" />
            </div>
        </div>
    )
}