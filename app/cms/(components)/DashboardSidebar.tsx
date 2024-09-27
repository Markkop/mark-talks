"use client";

import clsx from "clsx";
import { BookA, Home, NetworkIcon, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-background/95 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex items-center border-b h-[60px] px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-lg">Mark Talks CMS</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start text-sm font-medium px-4 gap-[0.2rem]">
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                {
                  "bg-accent text-foreground":
                    pathname === "/cms" || pathname.includes("/cms/preview/"),
                }
              )}
              href="/cms"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                {
                  "bg-accent text-foreground": pathname === "/cms/publish",
                }
              )}
              href="/cms/publish"
            >
              <BookA className="h-4 w-4" />
              Publish Talk
            </Link>
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                {
                  "bg-accent text-foreground": pathname === "/cms/api",
                }
              )}
              href="/cms/api"
            >
              <NetworkIcon className="h-4 w-4" />
              API
            </Link>
            <Link
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                {
                  "bg-accent text-foreground": pathname === "/cms/settings",
                }
              )}
              href="/cms/settings"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
