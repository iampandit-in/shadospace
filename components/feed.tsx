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

export default async function Feed() {
  const data = await db
    .select()
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .orderBy(desc(postsTable.createdAt));

  return (
    <div className="grid col-span-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4">
      {data.map((a) => (
        <div key={a.posts.id} className="mt-4 grid-cols-2">
          <Link href={`/post/${a.posts.id}`}>
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
          </Link>
        </div>
      ))}
    </div>
  );
}
