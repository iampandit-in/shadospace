import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-7 w-7 rounded-full" />
          <div className="text-muted-foreground space-y-1">
            <Skeleton
              className="
            h-3 w-14"
            />
            <Skeleton
              className="
            h-2 w-14"
            />
          </div>
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </CardHeader>
      <CardContent className="grow">
        <Skeleton className="h-36 w-full" />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-16" />
      </CardFooter>
    </Card>
  );
}
