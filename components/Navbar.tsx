import React from 'react'
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Film } from "lucide-react";

function Navbar() {
  return (
    <header className="border-b">
      <nav className="container flex items-center justify-between h-16 px-4 w-100%">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Film className="h-6 w-6" />
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/movies"
              className={buttonVariants({ variant: "ghost" })}
            >
              Movies
            </Link>
            <Link
              href="/favourites"
              className={buttonVariants({ variant: "ghost" })}
            >
              Favourites
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 mr-[-45]">
          <Button>Login</Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar