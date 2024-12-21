import { ObjectId } from 'mongodb';

// schemas/Library.ts

export enum BookmarkStatus {
    PlanToRead = 'plan-to-read',
    Reading = 'reading',
    Completed = 'completed',
    Dropped = 'dropped'
}

export interface LibraryType {
    _id: ObjectId;
    userId: ObjectId;
    // Reading History
    history: [{
      novelId: ObjectId;
      chapterId: ObjectId;
      chapterNumber: number;
      readAt: Date;
    }],
    // Bookmarked Novels
    bookmarks: [{
      novelId: ObjectId;
      status: BookmarkStatus;
      addedAt: Date;
      updatedAt: Date;
      notes?: string;
      isPrivate: boolean;
    }]
  }
  