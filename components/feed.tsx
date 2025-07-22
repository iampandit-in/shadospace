import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import db from "@/db";
import { postsTable, usersTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export default async function Feed() {
  const data = await db
    .select()
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .orderBy(desc(postsTable.createdAt));

  return (
    <div className="grid col-span-1 md:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-4 gap-4">
      {data.map((a) => (
        <div key={a.posts.id} className="mt-4 grid-cols-2">
          <Link href={`/post/${a.posts.id}`}>
            <Image
              src={a.posts.image || ""}
              alt={a.posts.title}
              width={1000}
              quality={100}
              className="rounded-md w-full"
              height={1000}
            />
            <div className="flex items-center gap-2 mt-2">
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={a.users.image || ""}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
            <h1>{a.posts.title}</h1>
            <span className="text-xs flex gap-2">
              <p>{a.users.name}</p>
              <p>
                {timeAgo.format(new Date(a.posts.createdAt))}
              </p>
            </span>
            </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
