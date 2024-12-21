import { ObjectId } from "mongodb";

export enum NovelStatusEnum {
    ongoing = 'ongoing',
    completed = 'completed',
    hiatus = 'hiatus'
}

export interface NovelType {
    _id: ObjectId;
    title: string;
    author: {
      _id: ObjectId;
      username: string;
    };
    description: string;
    coverImage?: string;
    
    // Moved to top level for easier indexing
    tags: string[];
    status: NovelStatusEnum;
    language: string;
    mature: boolean;
    
    // Separate statistics for indexing
    viewCount: number;      // Denormalized for sorting
    likeCount: number;      // Denormalized for sorting
    bookmarkCount: number;  // Denormalized for sorting
    rating: {
      average: number,     // Denormalized average
      count: number
    };
    
    chapterCount: number;   // Denormalized for filtering
    
    metadata: {
      createdAt: Date;
      updatedAt: Date;
      lastChapterAt: Date;
    };
  }