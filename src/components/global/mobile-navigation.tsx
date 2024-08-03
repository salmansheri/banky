"use client";

import Image from "next/image";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EllipsisVertical } from "lucide-react";
import { sidebarLinks } from "@/lib/constants";
import Link from "next/link";

export const MobileNavigation = () => {
  return (
    <div className="md:hidden flex justify-between items-center p-3">
      <div className="root-layout">
        {/* <Image
                    src="/logo-removebg.png"
                    alt="logo" 
                    width={50}
                    height={50}

                /> */}
      </div>
      <div className="flex items-center justify-between gap-2">
        <ModeToggle />
        <nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <EllipsisVertical className="text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-10 flex flex-col items-start gap-5">
                {sidebarLinks.map(({ icon: Icon, label, route }) => {
                  return (
                    <Link
                      key={label}
                      href={route}
                      className="flex items-center size-full gap-3 hover:bg-primary/40 p-3 rounded-lg"
                    >
                      <Icon />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </div>
  );
};
