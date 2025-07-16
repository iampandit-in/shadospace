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
import { Menu } from 'lucide-react'

const Header = () => {
  return (
    <div className='border-b fixed top-0 left-0 right-0 z-50 backdrop-blur-md'>
      <div className='max-w-7xl flex items-center justify-between p-5 mx-auto'>
        <Link href={"/"} className='text-2xl font-bold text-red-400'>
          <div className='flex items-center gap-2'>
            <Image src={"/logo.jpg"} alt="DevLogs" width={35} height={35} className='rounded-sm' />
            <h1>shadospace</h1>
          </div>
        </Link>
        <div>
          <div className='hidden md:flex items-center gap-2'>
            <Link href={"/login"}>
              <Button className='cursor-pointer' variant={"outline"}>Login</Button>
            </Link>
            <Link href={"/register"}>
              <Button className='cursor-pointer'>Register</Button>
            </Link>
          </div>
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Login or Register</SheetTitle>
                  <SheetDescription className='mt-4 flex items-center gap-2'>
                    <Link href={"/login"}>
                      <Button className='cursor-pointer' variant={"outline"}>Login</Button>
                    </Link>
                    <Link href={"/register"}>
                      <Button className='cursor-pointer'>Register</Button>
                    </Link>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header