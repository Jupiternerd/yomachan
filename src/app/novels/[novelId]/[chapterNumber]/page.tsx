import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Yomachan - Reading...",
    description: "READ BRO READ",
};

  
export default async function ChapterPage({ 
    params 
}: { 
    params: Promise<{ novelId: string; chapterNumber: string }>
}) {
    const { novelId, chapterNumber } = await params;

    return (
        <div className="prose max-w-prose mx-auto text-white">
            <h1>{novelId}</h1>
            <div>{chapterNumber}</div>
        </div>
    );
}