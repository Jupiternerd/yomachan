export default async function NovelPage({ params }: { params: { novelId: string } }) {
    // Fetch novel and its chapters

    const novelId = await params.novelId;
    return (
      <div>
        Hello {novelId}
      </div>
    );
  }