import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Globe, Share2 } from "lucide-react";

export default function SEOSettingsPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>SEO Optimization</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 bg-muted/20">
            <CardHeader>
              <div className="flex items-center gap-2 pb-2">
                <Globe className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm">Metadata</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Configure how your blog appears in search results.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-1.5">
                <label className="text-xs font-medium uppercase text-muted-foreground">
                  Home Page Title
                </label>
                <Input
                  defaultValue="shadospace - blogging for masters"
                  className="bg-muted/10 border-border/50 text-sm"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-medium uppercase text-muted-foreground">
                  Meta Description
                </label>
                <Input
                  placeholder="Describe your blog for Google..."
                  className="bg-muted/10 border-border/50 text-sm"
                />
              </div>
              <Button size="sm" className="w-full">
                Update Metadata
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-muted/20">
            <CardHeader>
              <div className="flex items-center gap-2 pb-2">
                <Share2 className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm">Social Cards (OG)</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Preview and set images for social media sharing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted/30 rounded-lg border border-dashed border-border/50 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <Search className="h-8 w-8 opacity-20" />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  No Image Set
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-border/50"
              >
                Upload OG Image
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-muted/20">
          <CardHeader>
            <CardTitle className="text-sm">Google Search Console</CardTitle>
            <CardDescription className="text-xs">
              Connect your blog to Google tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-1.5">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Verification Token
              </label>
              <Input
                placeholder="googlexxxxxxxxxxxxxxx"
                className="bg-muted/10 border-border/50 font-mono text-xs"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
