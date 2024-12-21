import { NovelType } from '../struct/novels'
import db from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
export async function getNovel(novelId: string) {
  return await db.collection<NovelType>("novels").findOne({ _id: new ObjectId(novelId)})
}

export async function getTopNovels({
  sortBy = 'viewCount',
  genre = null,
  status = null,
  limit = 20,
  page = 1
}) {
  const filter: any = {}
  if (genre) filter.genre = genre
  if (status) filter.status = status
  
  const sortField = {
    views: 'viewCount',
    likes: 'likeCount',
    rating: 'rating.average',
    bookmarks: 'bookmarkCount'
  }[sortBy] || 'viewCount'
  
  const novels = await db
    .collection<NovelType>("novels")
    .find(filter)
    .sort({ [sortField]: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray()
    
  const total = await db
    .collection("novels")
    .countDocuments(filter)
    
  return {
    novels,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    }
  }
}