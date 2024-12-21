"use client"

import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { NovelStatus } from "./webNovel"

interface NovelFiltersProps {
  tags: string[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  sortBy: string
  onSortChange: (sort: string) => void
  status: string
  onStatusChange: (status: NovelStatus | "all") => void
  showMature: boolean
  onMatureChange: (show: boolean) => void
}

export function NovelFilters({
  tags,
  selectedTags,
  onTagsChange,
  sortBy,
  onSortChange,
  status,
  onStatusChange,
  showMature,
  onMatureChange,
}: NovelFiltersProps) {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  return (
    
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 text-black text-lg focus:outline-none">
      <div className="flex flex-wrap gap-2 focus:outline-none">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-colors text-sm focus:outline-none",
              selectedTags.includes(tag)
                ? "hover:bg-primary/80"
                : "hover:bg-muted"
            )}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 focus:outline-none">
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[160px] focus:outline-none">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="likes-desc">Most Liked</SelectItem>
            <SelectItem value="likes-asc">Least Liked</SelectItem>
            <SelectItem value="chapters-desc">Most Chapters</SelectItem>
            <SelectItem value="chapters-asc">Least Chapters</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[160px] focus:outline-none">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"all"}>All Status</SelectItem>
            <SelectItem value={NovelStatus.Ongoing}>Ongoing</SelectItem>
            <SelectItem value={NovelStatus.Complete}>Completed</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2 ml-auto focus:outline-none">
          <Switch
          className="data-[state=checked]:bg-red-500"
            id="mature"
            checked={showMature}
            onCheckedChange={onMatureChange}
          />
          <label
            htmlFor="mature"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show Mature Content
          </label>
        </div>

        {selectedTags.length > 0 && (
          <button
            onClick={() => onTagsChange([])}
            className="text-sm text-muted-foreground hover:text-foreground focus:outline-none"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}