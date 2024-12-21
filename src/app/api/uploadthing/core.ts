import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const MAX_FILE_SIZE = "4MB";

export const ourFileRouter = {
  coverImageUploader: f({
    image: {
      maxFileSize: MAX_FILE_SIZE,
      maxFileCount: 1,
      additionalProperties: {
        aspectRatio: 3/2
      }
    },
  })
    .middleware(async () => {
      const session = await getServerSession();

      if (!session?.user?.id) {
        throw new UploadThingError("Please sign in to upload images");
      }

      return {
        userId: session.user.id, 
        email: session.user.email,
        username: session.user.name,
        image: session.user.image
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log(`Cover image uploaded by user ID: ${metadata.userId}`);
        console.log(`File URL: ${file.url}`);

        return {
          userId: metadata.userId,
          url: file.url,
          fileName: file.name,
          userInfo: {
            email: metadata.email,
            username: metadata.username,
            image: metadata.image
          }
        };
      } catch (error) {
        console.error("Error in cover image upload:", error);
        throw new UploadThingError("Failed to process upload");
      }
    }),

  chapterImageUploader: f({
    image: {
      maxFileSize: MAX_FILE_SIZE,
      maxFileCount: 5,
    },
  })
    .middleware(async () => {
      const session = await getServerSession();

      if (!session?.user?.id) {
        throw new UploadThingError("Please sign in with Discord to upload images");
      }

      return {
        userId: session.user.id,
        email: session.user.email,
        username: session.user.name,
        image: session.user.image
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log(`Chapter image uploaded by user ID: ${metadata.userId}`);
        console.log(`File URL: ${file.url}`);

        return {
          userId: metadata.userId,
          url: file.url,
          fileName: file.name,
          userInfo: {
            email: metadata.email,
            username: metadata.username,
            image: metadata.image
          }
        };
      } catch (error) {
        console.error("Error in chapter image upload:", error);
        throw new UploadThingError("Failed to process upload");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;