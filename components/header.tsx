import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { ModeToggle } from './mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <div className='border-b fixed top-0 left-0 right-0 z-50 backdrop-blur-md'>
      <div className='max-w-5xl flex items-center justify-between p-5 mx-auto'>
        <Link href={"/"}>
          <div className='flex items-center gap-2'>
            <Image src={"/logo.png"} alt="Shadospace" width={32} height={32} className='dark:invert' />
            <h1 className='text-xl md:text-2xl font-medium'>Shadospace</h1>
          </div>
        </Link>
        {session?.user ? (
          <div className='flex items-center gap-2'>
            {/* Mobile menu */}
            <div className='md:hidden flex items-center gap-2'>
              <Link href={"/new"}>
                <Button className='cursor-pointer' variant={"outline"}>Create</Button>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Avatar>
                    <AvatarImage src={session.user.image || "/default-avatar.png"} alt="Profile" className='rounded-full' width={32} height={32} />
                    <AvatarFallback className='rounded-full'>
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </SheetTrigger>
                <SheetContent className="w-[250px] sm:w-[540px] bg-white/60 dark:bg-black/40 backdrop-blur-lg">
                  <SheetHeader>
                    <SheetTitle>Profile</SheetTitle>
                    <SheetDescription className='mt-5 flex flex-col text-center'>
                      <Avatar className='w-20 h-20 mb-2 mx-auto'>
                        <AvatarImage src={session.user.image || "/default-avatar.png"} alt={session.user.name} />
                        <AvatarFallback>{session.user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                      <p className='text-lg font-semibold mt-2'>{session.user.name}</p>
                      <p className='text-sm text-muted-foreground'>{session.user.email}</p>
                      <p className='text-sm text-muted-foreground mt-2'>Joined: {new Date(session.user.createdAt).toLocaleDateString()}</p>
                        <div className='mt-6 w-full flex flex-col gap-2'>
                          <Link href={"/new"}>
                            <Button variant={"outline"} className='w-full'>Create</Button>
                          </Link>
                          <Link href={"/profile"}>
                            <Button variant={"outline"} className='w-full'>Profile</Button>
                          </Link>

                        </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            {/* Desktop profile button */}
            <div className='hidden md:flex items-center gap-2'>
              <Link href={"/new"}>
                <Button className='cursor-pointer' variant={"outline"}>Create</Button>
              </Link>
              <ModeToggle/>
              <Link href={"/profile"}>
                <Image
                  src={session.user.image || "/default-avatar.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className='rounded-full'
                />
              </Link>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <Link href={"/register"}>
              <Button variant={"outline"} className='cursor-pointer'>Sign In</Button>
            </Link>
            <div className='hidden md:flex items-center gap-2'>
            <ModeToggle/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}