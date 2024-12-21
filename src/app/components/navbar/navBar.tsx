"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoSVG from "../logo";
import UserBar from "./userBar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed h-16 top-0 left-0 right-0 z-50 bg-opacity-100 transition-all duration-300 ${
        isScrolled ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              // dissapear when width is mobile
              className="font-bold text-xl flex items-center space-x-2 med"
            >
              <LogoSVG className="w-8 h-8" />
              <span className="hidden md:flex">YOMACHAN</span>
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/novels" className="hover:text-gray-300">
                Novels
              </Link>
              {session ? (
                <>
                  <Link href="/library" className="hover:text-gray-300">
                    Library
                  </Link>
                  <Link href="/publish" className="hover:text-gray-300">
                    Publish
                  </Link>
                </>
              ) : (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="text-gray-400"
                          aria-disabled="true"
                          
                        >
                          Library
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-red-500 text-white text-xs">
                        <p>You have to be logged in!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="text-gray-400"
                          aria-disabled="true"
                        
                        >
                          Publish
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-red-500 text-white text-xs">
                        <p>You have to be logged in!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
            </div>
          </div>
          <div>
            <UserBar />
          </div>
        </div>
      </div>
    </nav>
  );
}
