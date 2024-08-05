"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export const Footer = ({ user }: FooterProps) => {
  return (
    <footer className="flex  items-center justify-between gap-5  ">
      <div>
        <p className="text-xl font-bold ">{user.firstName}</p>
        <p className="text-sm">{user.email}</p>
      </div>

      <Button variant="outline" size="icon" onClick={() => signOut()}>
        <LogOut />
      </Button>
    </footer>
  );
};
