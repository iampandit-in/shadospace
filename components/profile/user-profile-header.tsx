import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, FileText } from "lucide-react";

interface UserProfileHeaderProps {
  user: {
    name: string;
    username: string | null;
    image: string | null;
    createdAt: Date;
  };
  postCount: number;
}

export function UserProfileHeader({ user, postCount }: UserProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-card rounded-2xl border shadow-sm p-6 mb-8">
      <Avatar className="h-24 w-24 shrink-0 border-4 border-background">
        <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
        <AvatarFallback className="bg-primary/10 text-primary uppercase text-2xl">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center md:items-start flex-1 w-full text-center md:text-left">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        {user.username && (
          <p className="text-muted-foreground text-lg mb-4">@{user.username}</p>
        )}

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mt-auto md:mt-2">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>
              Joined{" "}
              {new Date(user.createdAt).toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span>
              <strong className="text-foreground font-semibold">
                {postCount}
              </strong>{" "}
              {postCount === 1 ? "Post" : "Posts"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
