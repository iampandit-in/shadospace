"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "../../hooks/use-debounce";
import { cn } from "@/lib/utils";

export function SearchPosts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get("search") || "");
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedValue === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set("search", debouncedValue);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`, { scroll: false });
    });
  }, [debouncedValue, router, searchParams]);

  const clearSearch = () => {
    setValue("");
  };

  return (
    <div className="relative max-w-2xl mx-auto group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors">
        <Search className="w-5 h-5" />
      </div>
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "pl-12 pr-1 border-border/50 rounded-md text-lg transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
          isPending && "opacity-70",
        )}
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
