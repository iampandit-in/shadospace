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

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <div className='border-b fixed top-0 left-0 right-0 z-50 backdrop-blur-md'>
      <div className='max-w-7xl flex items-center justify-between p-5 mx-auto'>
        <Link href={"/"}>
          <div className='flex items-center gap-2'>
            <Image src={"/logo.jpg"} alt="DevLogs" width={32} height={32} className='rounded-sm invert' />
            <h1 className='text-2xl font-medium'>Shadospace</h1>
          </div>
        </Link>
        {session?.user ? (
          <div className='flex items-center gap-2'>
            {/* Mobile menu */}
            <div className='md:hidden'>
              <Sheet>
                <SheetTrigger asChild>
                  <Link href={"/profile"}>
                    <Image
                      src={session.user.image || "/default-avatar.png"}
                      alt="Profile"
                      width={32}
                      height={32}
                      className='rounded-full'
                    />
                  </Link>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Profile</SheetTitle>
                    <SheetDescription className='mt-5 flex flex-col text-center'>
                      <Image
                        src={session.user.image || "/default-avatar.png"}
                        alt="Profile"
                        width={42}
                        height={42}
                        className='rounded-full mx-auto mb-2'
                      />
                      <span className='font-medium'>{session.user.name}</span>
                      <span className='text-muted-foreground mb-4'>{session.user.email}</span>
                      <Link href={"/profile"}>
                        <Button className='cursor-pointer w-full' variant={"outline"}>Profile</Button>
                      </Link>
                      <Link href={"/new"}>
                        <Button variant={"outline"} className='cursor-pointer w-full mt-2'>Create</Button>
                      </Link>
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
            <Link href={"/login"}>
              <Button className='cursor-pointer' variant={"outline"}>Login</Button>
            </Link>
            <Link href={"/register"}>
              <Button className='cursor-pointer'>Register</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}