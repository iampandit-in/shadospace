"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashoboardHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="flex border-b h-16 shrink-0 items-center px-4 justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 ">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment, index) => {
              const isLast = index === segments.length - 1;
              const href = `/${segments.slice(0, index + 1).join("/")}`;

              const segmentName =
                segment.charAt(0).toUpperCase() + segment.slice(1);
              const displayName =
                segmentName === "Dashboard" && isLast
                  ? "Dashboard Overview"
                  : segmentName;

              return (
                <React.Fragment key={href}>
                  <BreadcrumbItem className={!isLast ? "hidden md:block" : ""}>
                    {!isLast ? (
                      <BreadcrumbLink href={href}>{displayName}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{displayName}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <nav>
        <Button variant={"outline"} asChild>
          <Link href={"/dashboard/create/post"}>
            <PlusIcon />
            New Post
          </Link>
        </Button>
      </nav>
    </header>
  );
}
