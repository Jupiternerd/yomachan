"use client"

import { Heart } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Logo from '../logo'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useSession } from 'next-auth/react'

export enum NovelStatus {
  Ongoing = "Ongoing",
  Hiatus = "Hiatus",
  Complete = "Complete",
}

interface WebNovelProps {
  id: string
  title: string
  author: string
  coverImage: string
  likes: number
  chapters: number
  status: NovelStatus
  description: string
  tags: string[]
}



export function WebNovel({
  id,
  title,
  author,
  coverImage,
  likes,
  chapters,
  status,
  description,
  tags,
}: WebNovelProps) {
  const [isFocused, setIsFocused] = useState(false)

  let auth = useSession()

  return (
    <ContextMenu>
      
  <ContextMenuTrigger>
  <Card 
      className="group relative border-none overflow-hidden transition-all"
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <Link href={`/novel/${id}`} className="block h-full">
        <div className="relative aspect-[2/3]">
          <Image
            src={coverImage}
            alt={`Cover for ${title}`}
            fill
            className={`object-cover transition-all duration-300 ${
              isFocused ? 'scale-110 blur-sm brightness-50' : ''
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Basic Info - Always Visible */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3 text-white md:p-4">
            <div className="mb-2">
              <h3 className="text-lg font-bold leading-tight">{title}</h3>
              <p className="text-sm opacity-90">by {author}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2 text-sm md:text-sm">
                <Badge variant="default" className="bg-white/20 text-white hover:bg-white/30">
                  {chapters} Chapters
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  {status}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs md:text-sm">
                <Heart className="h-3 w-3 md:h-4 md:w-4" />
                <span>{likes.toLocaleString()}</span>
              </div>
            </div>
          </div>
          {
            isFocused && (
                // center of the image, large logo
                <Logo className="invert absolute inset-0 flex items-center justify-center transition-opacity opacity-30 blur-sm" width="500" height="500">

                </Logo>
            )
          }
          {/* Detailed Info - Visible on Focus */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isFocused ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <div className="flex max-w-[90%] flex-col items-center gap-4 text-center text-white md:max-w-[80%]">
              <p className="text-base leading-relaxed md:text-base">{description}</p>
              
              <div className="flex flex-wrap items-center justify-center gap-2">
                {tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="secondary" 
                    className=" bg-white text-gray-600 text-xs md:text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>

  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      Test
    </ContextMenuItem>
    {auth.data?.user.isAdmin && <ContextMenuItem className="bg-red-700 text-white">
      Delete
    </ContextMenuItem>}
  </ContextMenuContent>
</ContextMenu>
    
  )
}
