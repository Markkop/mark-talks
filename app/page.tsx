import PageWrapper from "@/components/Container/PageWrapper";
import { TalkCard } from "@/components/TalkCard";
import { Button } from "@/components/ui/button";
import { getAllPublishedTalks } from "@/utils/actions/talks/get-all-published-talks";
import Link from "next/link";

export default async function Home() {
  const publishedTalks = await getAllPublishedTalks();

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Published Talks</h1>
          <Link href="/cms">
            <Button variant="outline">Admin Dashboard</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedTalks.map((talk) => (
            <TalkCard key={talk.id} talk={talk} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
