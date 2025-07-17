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

export default async function Feed() {
  const data = await db
    .select()
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .orderBy(desc(postsTable.createdAt));

  return (
    <div className="grid col-span-1 md:grid-cols-2">
      {data.map((a) => (
        <div key={a.posts.id} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{a.posts.title}</CardTitle>
              <CardDescription>{a.posts.content}</CardDescription>
            </CardHeader>
            <CardContent>
              {a.posts.image && <img src={a.posts.image} alt={a.posts.title} />}
            </CardContent>
            <CardFooter>
              <CardDescription className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>
                  <p>{a.users.name}</p>
                  <p>{a.users.createdAt.toString()}</p>
                </span>
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
