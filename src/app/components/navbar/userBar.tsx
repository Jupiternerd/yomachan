"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserBar() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4 p-2">
      {session ? (
        <>
          <Avatar>
            <AvatarImage src={session.user?.image ?? ''} alt={session.user?.name ?? ''} />
            <AvatarFallback>
              {session.user?.name?.split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase() ?? '??'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{session.user?.name}</span>
            <button 
              onClick={() => signOut()} 
              className="text-start text-xs text-muted-foreground hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <button 
          onClick={() => signIn("discord")} 
          className="h-10 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#5865F2] rounded-sm hover:bg-[#3741b6] transition-colors"
        >
          Discord Login
        </button>
      )}
    </div>
  );
}