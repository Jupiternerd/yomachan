// lib/queries/library.ts
import db from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { LibraryType, BookmarkStatus } from '../struct/library'

export async function updateReadingProgress({
  userId,
  novelId,
  chapterId,
  chapterNumber,
  progress
}: {
  userId: string | ObjectId,
  novelId: string | ObjectId,
  chapterId: string | ObjectId,
  chapterNumber: number,
  progress: number
}) {
  const now = new Date()
  
  // Update or insert into currently reading
  await db.collection<LibraryType>("libraries").updateOne(
    { userId: new ObjectId(userId) },
    {
      $set: {
        [`currentlyReading.${novelId}`]: {
          novelId: new ObjectId(novelId),
          lastChapterId: new ObjectId(chapterId),
          chapterNumber,
          readingProgress: progress,
          lastReadAt: now,
          startedAt: now
        }
      },
      $push: {
        history: {
          $each: [{
            novelId: new ObjectId(novelId),
            chapterId: new ObjectId(chapterId),
            chapterNumber,
            readAt: now
          }],
          $slice: -100
        }
      }
    },
    { upsert: true }
  )
}

export async function toggleBookmark({
  userId,
  novelId,
  status = BookmarkStatus.PlanToRead,
  isPrivate = false
}: {
  userId: string | ObjectId,
  novelId: string | ObjectId,
  status?: BookmarkStatus,
  isPrivate?: boolean
}) {
  const now = new Date()

  // Check if already bookmarked
  const library = await db.collection<LibraryType>("libraries").findOne({
    userId: new ObjectId(userId),
    'bookmarks.novelId': new ObjectId(novelId)
  })

  if (library) {
    // Remove bookmark if exists
    await db.collection<LibraryType>("libraries").updateOne(
      { userId: new ObjectId(userId) },
      {
        $pull: {
          bookmarks: { novelId: new ObjectId(novelId) }
        }
      }
    )
  } else {
    // Add new bookmark
    await db.collection<LibraryType>("libraries").updateOne(
      { userId: new ObjectId(userId) },
      {
        $push: {
          bookmarks: {
            novelId: new ObjectId(novelId),
            status,
            addedAt: now,
            updatedAt: now,
            isPrivate
          }
        }
      },
      { upsert: true }
    )
  }
}