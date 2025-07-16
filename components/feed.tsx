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
import { eq } from "drizzle-orm";

export default function Feed() {
  const data = db
    .select()
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .limit(10);
  console.log(data);
  return (
    <div className="grid col-span-1 md:grid-cols-2">
      <div>
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>this is the card title</CardTitle>
              <CardDescription>this is card desc</CardDescription>
            </CardHeader>
            <CardContent>hello</CardContent>
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
                  <p>John Doe</p>
                  <p>1234567890</p>
                </span>
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
