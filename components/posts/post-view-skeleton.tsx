import { Skeleton } from "@/components/ui/skeleton";

export function PostViewSkeleton() {
  return (
    <div className="-mt-4 animate-pulse">
      {/* Hero Image Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-muted/50 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 space-y-4 container pb-8">
          {/* Title Skeletons */}
          <div className="space-y-2">
            <Skeleton className="h-8 md:h-12 w-3/4 bg-muted/20" />
            <Skeleton className="h-8 md:h-12 w-1/2 bg-muted/20" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full bg-muted/20" />
                <Skeleton className="h-4 w-24 bg-muted/20" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-muted/20" />
                <Skeleton className="h-4 w-32 bg-muted/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mt-8 space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <div className="pt-4 space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
        </div>
        <div className="pt-4 space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
    </div>
  );
}
