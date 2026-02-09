import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="border rounded-md h-38 w-full bg-muted/50" />

      <div className="flex-1 mt-2 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>

      <div className="mt-2 text-muted-foreground flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2 w-16" />
          </div>
        </div>
        <Skeleton className="h-2 w-4 rounded-md" />
      </div>
    </div>
  );
}
