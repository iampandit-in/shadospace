import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <div className="animate-pulse break-inside-avoid mb-4 bg-card rounded-xl border shadow-sm p-4">
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-center gap-3">
          {/* Avatar Placeholder */}
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />

          <div className="flex flex-col min-w-0">
            {/* Header Lines (Name and Handle) */}
            <div className="flex items-center gap-2 mb-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Body Lines */}
          <div className="space-y-2 mt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Optional Image Placeholder (Simulated) */}
          <Skeleton className="h-48 w-full rounded-xl mt-3" />

          {/* Actions Footer */}
          <div className="flex items-center justify-between mt-4 max-w-md">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
