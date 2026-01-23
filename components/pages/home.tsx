import { db } from "@/db";
import { post } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

type PostType = {
  id: string;
  title: string;
  content: string;
  image: string | null;
  status: string;
  category: string;
  userId: string;
};

export default async function Home() {
  const allPosts = await db
    .select()
    .from(post)
    .where(eq(post.status, "published"));
  console.log(allPosts);
  return (
    <div>
      <div>all posts</div>
      <div className="grid grid-cols-6 gap-4">
        {allPosts.map((post: PostType) => (
          <div key={post.id} className="p-2 border">
            <Image
              src={post.image || ""}
              alt={post.title}
              height={1000}
              width={1000}
              className="h-44 w-66 object-cover"
            />
            <h1>{post.title}</h1> <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
