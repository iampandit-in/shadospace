import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { auth } from "../../lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/signout-button";


export default async function ProfilePage() {
    const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="mt-44 max-w-7xl mx-auto p-5">
      <Card className="">
        <CardHeader className="">
          <Avatar className="">
            <AvatarImage src={session?.user.image || ""} alt={session?.user.name} />
            <AvatarFallback>{session?.user.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="">{session?.user.name}</h2>
          <p className="">{session?.user.email}</p>
        </CardHeader>
        <CardContent>
          {/* Add more user info or actions here */}
          <div className="">
            Welcome to your profile!
          </div>
        </CardContent>
        <CardFooter className="">
            <SignOutButton/>
          </CardFooter>
      </Card>
    </div>
  );
}