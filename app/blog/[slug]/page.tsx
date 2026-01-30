import { getPostBySlug } from "@/server/posts";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-12">
        {post.image ? (
          <div className="absolute inset-0 z-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover brightness-[0.4]"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-muted/30" />
        )}

        <div className="container relative z-10 mx-auto px-6 max-w-4xl">
          <div className="space-y-4">
            {post.category && (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                {post.category.name}
              </Badge>
            )}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 pt-4">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src={post.author.image || ""} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-white">{post.author.name}</p>
                <p className="text-muted-foreground">
                  {format(new Date(post.createdAt), "MMMM d, yyyy")} •{" "}
                  {Math.ceil(post.content.length / 1000)} min read
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div
          className="prose prose-invert prose-lg max-w-none 
            prose-headings:text-primary prose-headings:font-bold
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-img:rounded-2xl prose-img:border prose-img:border-border/50
            prose-blockquote:border-l-primary prose-blockquote:bg-muted/10 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Separator className="my-16 bg-border/50" />

        {/* Footer actions / Author bio placeholder */}
        <div className="rounded-3xl border border-border/50 bg-muted/20 p-8 text-center space-y-4">
          <h3 className="text-xl font-bold">Thanks for reading!</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Stay tuned for more updates and stories from shadospace. Feel free
            to share this post if you enjoyed it.
          </p>
        </div>
      </div>
    </article>
  );
}
