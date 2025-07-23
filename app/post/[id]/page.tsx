import React from "react";
import db from "@/db";
import { post, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await db.select().from(post).where(eq(post.id, id)).innerJoin(user, eq(post.userId, user.id));

  return (
    <div className="max-w-3xl mx-auto mt-16 md:mt-24 p-5">
      {data.map((a) => (
        <div key={a.posts.id} className="mt-2 grid-cols-2">
          <h1 className="text-lg md:text-2xl font-bold my-2">{a.posts.title}</h1>
          <Image
            src={a.posts.image || ""}
            alt={a.posts.title}
            width={1000}
            quality={100}
            className="rounded-md w-full h-44 md:h-66 object-cover"
            height={1000}
          />
          <div className="flex items-center gap-2 mt-4">
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={a.users.image || ""}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>
              <p className="text-sm text-foreground/70">{a.users.name}</p>
              <p className="text-sm text-foreground/70">{timeAgo.format(new Date(a.posts.createdAt))}</p>
            </span>
          </div>
          <p className="mt-4">{a.posts.content}</p>
        </div>
      ))}
    </div>
  );
}
