import PostCard from "@/components/posts/post-card";

export default function Home() {
  return (
    <main>
      <h1 className="text-xl font-semibold mb-4">Latest posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </main>
  );
}
