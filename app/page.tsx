import PageWrapper from "@/components/Container/PageWrapper";
import { TalkCard } from "@/components/TalkCard";
import { getAllPublishedTalks } from "@/utils/actions/talks/get-all-published-talks";

export default async function Home() {
  const publishedTalks = await getAllPublishedTalks();

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Published Talks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedTalks.map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
