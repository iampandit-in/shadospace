import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalyticsViewsPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Page Views</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border/50 bg-muted/20"
        >
          <Calendar className="h-4 w-4" />
          <span>Last 30 Days</span>
        </Button>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,532</div>
              <div className="flex items-center gap-1 text-[10px] text-green-500 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                <span>+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
                Unique Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,104</div>
              <div className="flex items-center gap-1 text-[10px] text-green-500 mt-1">
                <ArrowUpRight className="h-3 w-3" />
                <span>+8.2% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
                Avg. Read Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4m 32s</div>
              <div className="flex items-center gap-1 text-[10px] text-yellow-500 mt-1">
                <span>-2s from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
                Bounce Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42.3%</div>
              <div className="flex items-center gap-1 text-[10px] text-green-500 mt-1">
                <ArrowUpRight className="h-3 w-3 rotate-180" />
                <span>-2.1% improvement</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="flex-1 border-border/50 bg-muted/20 min-h-[400px]">
          <CardHeader>
            <CardTitle>View Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center text-muted-foreground italic">
            Chart component placeholder (e.g., Recharts)
          </CardContent>
        </Card>
      </div>
    </>
  );
}
