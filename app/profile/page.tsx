import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/signout-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import db from "@/db";
import { user, post } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

// Initialize TimeAgo for date formatting
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export default async function ProfilePage() {
  // ...existing code...
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session) {
    redirect("/login");
  }

  // Fetch user info from DB using session.user.id
  const [dbUser] = await db.select().from(user).where(eq(user.id, session.user.id));

  if (!dbUser) {
    return <div className="text-center mt-20">User not found.</div>;
  }

  // Fetch all posts by the user
  const userPosts = await db.select().from(post).where(eq(post.userId, dbUser.id));

  return (
    <div className="mt-16 md:mt-24 flex flex-col items-center">
      <div className="mt-10">
        <div className="text-center">
          <Avatar className="w-20 h-20 mb-2 mx-auto">
            <AvatarImage src={dbUser.image || "/default-avatar.png"} alt={dbUser.name} />
            <AvatarFallback>{dbUser.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold mt-2">{dbUser.name}</h2>
          <p className="text-sm text-muted-foreground">{dbUser.email}</p>
          <div className="mt-6 w-full flex gap-2">
            <Link href={"/new"}>
              <Button variant={"outline"} className="w-full">Create</Button>
            </Link>
            <SignOutButton />
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* User's posts grid */}
      <div className="max-w-5xl mx-auto p-5 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPosts.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground">No posts yet.</div>
          ) : (
            userPosts.map((a) => (
              <Link href={`/post/${a.id}`} key={a.id} className="bg-background shadow">
                {a.image && (
                  <Image
                    src={a.image}
                    alt={a.title}
                    width={500}
                    height={300}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <h4 className="font-semibold">{a.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(a.createdAt).toLocaleDateString()} - {timeAgo.format(new Date(a.createdAt))}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}