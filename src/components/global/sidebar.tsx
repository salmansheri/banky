"use client";

import { sidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/mode-toggle";
import { Footer } from "./footer";

export const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <Link href="/" className="mb-12 cursor-pointer items-center gap-2">
            <Image
              src="/logo-removebg.png"
              alt="logo"
              width={100}
              height={100}
              className=""
            />
          </Link>
          <ModeToggle />
        </div>

        {sidebarLinks.map(({ icon: Icon, label, route }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);

          return (
            <Link
              href={route}
              key={label}
              className={cn("sidebar-link ", {
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

      <div className="">
        <Footer user={user} />
      </div>
    </section>
  );
};
