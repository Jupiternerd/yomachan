"use client"

import { useState } from "react"
import { NovelStatus, WebNovel } from "./webNovel"
import { NovelFilters } from "./novelFilter"

const SAMPLE_NOVELS = [
  {
    id: "1",
    title: "The Wandering Inn",
    author: "pirateaba",
    coverImage: "https://utfs.io/f/thM7uAAfQiMIzvYnAC4mNElVXapLwcgjRH8yMSBCWh4fTe2v",
    likes: 45823,
    chapters: 385,
    status: NovelStatus.Complete,
    description:
      "An innkeeper's tale of magic, mystery, and mayhem. Follow Erin Solstice as she navigates a dangerous world filled with monsters, magic, and memorable characters.",
    tags: ["Fantasy", "Adventure", "Slice of Life", "Magic System"],
    isMature: false,
  },
  {
    id: "2",
    title: "Mother of Learning",
    author: "nobody103",
  
    coverImage: "https://utfs.io/f/thM7uAAfQiMIzvYnAC4mNElVXapLwcgjRH8yMSBCWh4fTe2v",
    likes: 38291,
    chapters: 108,
    status: NovelStatus.Complete,
    description:
      "A teenage mage trapped in a month-long time loop must uncover the nature of a mysterious attack on his academy.",
    tags: ["Fantasy", "Time Loop", "Progression", "Mystery"],
    isMature: false,
  },
  {
    id: "3",
    title: "Worm",
    author: "Wildbow",
  
    coverImage: "https://utfs.io/f/thM7uAAfQiMIhC2BsBP5IbwlU0TOSMxsRXqLay7cQn4AK1Cm",
    likes: 52947,
    chapters: 304,
    status: NovelStatus.Hiatus,
    description:
      "In a world of superheroes, Taylor Hebert struggles to balance her high school life with her newfound powers over insects.",
    tags: ["Superhero", "Dark Fantasy", "Action", "Drama", "Mature"],
    isMature: true,
  },
  {
    id: "4",
    title: "Super Powereds",
    author: "Drew Hayes",
  
    coverImage: "https://utfs.io/f/thM7uAAfQiMIhC2BsBP5IbwlU0TOSMxsRXqLay7cQn4AK1Cm",
    likes: 29384,
    chapters: 342,
    status: NovelStatus.Hiatus,
    description:
      "Follow the journey of five young adults with uncontrollable powers as they train to become certified heroes at Lander University.",
    tags: ["Superhero", "School Life", "Action", "Coming of Age"],
    isMature: false,
  },
  {
    id: "5",
    title: "Practical Guide to Evil",
    author: "erraticerrata",
  
    coverImage: "https://utfs.io/f/thM7uAAfQiMIhC2BsBP5IbwlU0TOSMxsRXqLay7cQn4AK1Cm",
    likes: 34521,
    chapters: 297,
    status: NovelStatus.Ongoing,
    description:
      "In a world where Good and Evil are objective forces, Catherine Foundling seeks to change the rules of the game.",
    tags: ["Dark Fantasy", "Military Fantasy", "Politics", "Magic", "Mature"],
    isMature: true,
  },
  {
    id: "6",
    title: "Worth the Candle",
    author: "Alexander Wales",
    
    coverImage: "https://utfs.io/f/thM7uAAfQiMIhC2BsBP5IbwlU0TOSMxsRXqLay7cQn4AK1Cm",
    likes: 31678,
    chapters: 243,
    status: NovelStatus.Hiatus,
    description:
      "Juniper Smith finds himself in a world that seems to be an amalgamation of all the tabletop games he's run as a dungeon master.",
    tags: ["LitRPG", "Portal Fantasy", "Adventure", "Psychological"],
    isMature: false,
  },
]



export function WebNovelGrid() {
  const ALL_TAGS = Array.from(
    new Set(
      SAMPLE_NOVELS.flatMap((novel) => novel.tags)
    )
  ).sort()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("likes-desc")
  const [status, setStatus] = useState<NovelStatus | "all">("all")
  const [showMature, setShowMature] = useState(false)
  const filteredNovels = SAMPLE_NOVELS
    .filter((novel) => {
      // Filter by tags
      if (selectedTags.length > 0 && !novel.tags?.some((tag) => selectedTags.includes(tag))) {
        return false
      }

      // Filter by status
      console.log(novel.status + " " + status)
      if (status !== "all" && novel.status !== status) {
        return false
      }

      // Filter mature content
      if (!showMature && novel.isMature) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "likes-desc":
          return b.likes - a.likes
        case "likes-asc":
          return a.likes - b.likes
        case "chapters-desc":
          return b.chapters - a.chapters
        case "chapters-asc":
          return a.chapters - b.chapters
        default:
          return 0
      }
    })

  return (
    // middle of the page
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 md:gap-8">

        <NovelFilters
          tags={ALL_TAGS || []}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          sortBy={sortBy}
          onSortChange={setSortBy}
          status={status}
          onStatusChange={setStatus}
          showMature={showMature}
          onMatureChange={setShowMature}
        />

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {filteredNovels.map((novel) => (
            <WebNovel key={novel.id} {...novel} />
          ))}
        </div>

        {filteredNovels.length === 0 && (
          <div className="text-center text-muted-foreground">
            No novels found matching your filters.
          </div>
        )}
      </div>
    </section>
  )
}

