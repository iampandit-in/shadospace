import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import db from "@/db";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { post, user, } from "@/db/schema";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");


export default async function Feed() {
  const data = await db
    .select()
    .from(post)
    .innerJoin(user, eq(post.userId, user.id))
    .orderBy(desc(post.createdAt));

  return (
    <div className="grid col-span-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
      {data.map((a) => (
        <div key={a.posts.id} className="mt-4 grid-cols-2">
          <Link href={`/post/${a.posts.id}`}>
            {a.posts.image ? (
              <Image
                src={a.posts.image}
                alt={a.posts.title}
                width={1000}
                quality={100}
                className="rounded-md w-full object-cover"
                height={1000}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{a.posts.title}</CardTitle>
                </CardHeader>
                <CardContent>
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
                      <span className="text-xs flex gap-2">
                        <p>{a.users.name}</p>
                        <p>
                          {timeAgo.format(new Date(a.posts.createdAt))}
                        </p>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            {a.posts.image && (
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
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
