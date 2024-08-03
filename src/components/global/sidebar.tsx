"use client";

import { sidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/mode-toggle";

export const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer items-center gap-2">
          <Image
            src="/logo-removebg.png"
            alt="logo"
            width={100}
            height={100}
            className=""
          />
        </Link>

        {sidebarLinks.map(({ icon: Icon, label, route }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);

          return (
            <Link
              href={route}
              key={label}
              className={cn("sidebar-link w-full", {
                "bg-primary text-white": isActive,
                "hover:bg-primary/30 ": !isActive,
              })}
            >
              <Icon className="h-5 w-5" />
              <p className="hidden md:block w-full"> {label}</p>
            </Link>
          );
        })}
      </nav>

      <div className="flex justify-between items-center">
        <div>footer</div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </section>
  );
};
