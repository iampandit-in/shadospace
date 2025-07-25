import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white">
        <Image src="/logo.png" alt="shadospace" width={128} height={128} className="dark:invert"/>
        <h1 className="text-2xl font-bold">Shadospace</h1>
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  )
}