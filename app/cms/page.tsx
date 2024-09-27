export const revalidate = 0;

import { TalkCard } from "@/components/TalkCard";
import { Button } from "@/components/ui/button";
import { getAllTalks } from "@/utils/actions/talks/get-all-talks";
import { Talk } from "@/utils/types";
import Link from "next/link";

export default async function CMS() {
  const response = await getAllTalks();

  return (
    <main className="flex w-full mt-[1rem] flex-col items-start justify-between p-8">
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="scroll-m-20 font-semibold tracking-tight text-4xl">
          Talks
        </h1>
        <Link href="/cms/publish">
          <Button>Create New Talk</Button>
        </Link>
      </div>
      {response && response.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {response.map((talk: Talk) => (
            <Link href={`/cms/preview/${talk.slug}`} key={talk.id}>
              <TalkCard talk={talk} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 w-full">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold tracking-tight mb-2">
              You have no talks
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Talks will show here once you&apos;ve published them
            </p>
            <Link href="/cms/publish">
              <Button>Create Your First Talk</Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
