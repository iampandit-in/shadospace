import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function Feed() {
  return (
    <div>
        <h1 className='text-xl font-medium'>your feed</h1>
        <div className='mt-4'>
        <Card>
            <CardHeader>
                <CardTitle>this is the card title</CardTitle>
                <CardDescription>this is card desc</CardDescription>
            </CardHeader>
            <CardContent>
                hello
            </CardContent>
            <CardFooter>
                <CardDescription className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
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
  )
}
