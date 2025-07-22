import React from "react";
import db from "@/db";
import { post, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Posts() {
  const data = await db
    .select()
    .from(post)
    .innerJoin(user, eq(post.userId, user.id))
    .orderBy(desc(post.createdAt));

  return (
    <div className="grid col-span-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
      {data.map((a) => (
        <div key={a.posts.id} className="mt-4 grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{a.posts.title}</CardTitle>
              <CardDescription>{a.posts.content}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={a.posts.image || ""}
                alt={a.posts.title}
                width={1000}
                quality={100}
                className="rounded-md w-full"
                height={1000}
              />
            </CardContent>
            <CardFooter>
              <CardDescription className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={a.users.image || ""}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>
                  <p>{a.users.name}</p>
                  <p>{a.users.createdAt.toLocaleDateString()}</p>
                </span>
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
