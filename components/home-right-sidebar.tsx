"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

// This is sample data.
const data = {
  teams: [
    {
      name: "shadospace",
      logo: "/shadospace.png",
      plan: "blog",
    },
  ],
  navMain: [
    {
      title: "Posts",
      url: "/dashboard/posts",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All Posts",
          url: "/dashboard/posts",
        },
        {
          title: "New Post",
          url: "/dashboard/posts/new",
        },
        {
          title: "Categories",
          url: "/dashboard/posts/categories",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: Bot,
      items: [
        {
          title: "Views",
          url: "/dashboard/analytics/views",
        },
        {
          title: "Engagement",
          url: "/dashboard/analytics/engagement",
        },
      ],
    },
    {
      title: "Comments",
      url: "/dashboard/comments",
      icon: BookOpen,
      items: [
        {
          title: "Moderation",
          url: "/dashboard/comments/moderation",
        },
        {
          title: "Subscribers",
          url: "/dashboard/comments/subscribers",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings",
        },
        {
          title: "SEO",
          url: "/dashboard/settings/seo",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function HomeRightSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <Sidebar side="right" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.name ?? "",
              email: user.email ?? "",
              avatar: user.image ?? "",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
