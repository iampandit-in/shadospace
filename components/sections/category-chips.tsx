import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

interface CategoryChipsProps {
  categories: Category[];
  activeCategory?: string;
}

export function CategoryChips({
  categories,
  activeCategory,
}: CategoryChipsProps) {
  if (categories.length === 0) return null;

  return (
    <section className="py-6 bg-accent/5 border-y border-border/50">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
            <Layers className="w-4 h-4" />
            <span>Categories:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/">
              <Badge
                variant={!activeCategory ? "default" : "secondary"}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer text-sm font-medium ${
                  !activeCategory
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-background border-border/50 hover:bg-primary/10"
                }`}
              >
                All posts
              </Badge>
            </Link>
            {categories.map((category) => (
              <Link key={category.id} href={`/?category=${category.slug}`}>
                <Badge
                  variant={
                    activeCategory === category.slug ? "default" : "secondary"
                  }
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer text-sm font-medium ${
                    activeCategory === category.slug
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-background border-border/50 hover:bg-primary/10"
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-[10px] opacity-60">
                    ({category.postCount})
                  </span>
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
