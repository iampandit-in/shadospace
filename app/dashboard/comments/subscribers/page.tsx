import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SubscribersPage() {
  const subscribers = [
    {
      id: 1,
      email: "john@example.com",
      name: "John Doe",
      date: "Jan 12, 2024",
      status: "Active",
    },
    {
      id: 2,
      email: "sarah@gmail.com",
      name: "Sarah Smith",
      date: "Jan 15, 2024",
      status: "Active",
    },
    {
      id: 3,
      email: "michael@dev.to",
      name: "Michael Cheng",
      date: "Jan 18, 2024",
      status: "Inactive",
    },
    {
      id: 4,
      email: "alice@outlook.com",
      name: "Alice Wagner",
      date: "Jan 20, 2024",
      status: "Active",
    },
  ];

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Subscribers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Button size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </Button>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subscribers..."
              className="pl-10 bg-muted/20 border-border/50"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border/50 bg-muted/20"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        <Card className="border-border/50 bg-muted/20">
          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Joined Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {subscribers.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {sub.email}
                    </td>
                    <td className="px-6 py-4 font-medium">{sub.name}</td>
                    <td className="px-6 py-4">{sub.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          sub.status === "Active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:underline bg-transparent p-0 h-auto font-medium"
                      >
                        View Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
