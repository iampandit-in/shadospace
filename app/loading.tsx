import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      {/* Loading spinner */}
      <div className='flex items-center gap-2'>
      <Loader2 className='animate-spin'/>
      <span>Loading...</span>
      </div>
      </div>
  )
}
