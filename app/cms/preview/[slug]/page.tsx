import { TalkCard } from "@/components/TalkCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTalkBySlug } from "@/utils/actions/talks/get-talk-slug";
import { transformNode } from "@/utils/transform-node";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import ManageTalk from "../(components)/ManageTalk";

export default async function TalkPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getTalkBySlug(params?.slug);
  const talk = response?.[0];

  return (
    <main className="flex min-w-screen flex-col items-center justify-between">
      <ManageTalk response={response} params={params} />
      <article className="container relative max-w-3xl pt-3 pb-6 lg:pb-10">
        <h1 className="scroll-m-20 text-4xl font-bold pt-4 tracking-tight lg:text-5xl mb-6">
          {talk?.title}
        </h1>

        <div className="mb-8">
          <TalkCard talk={talk} />
        </div>

        {talk?.image && (
          <Image
            src={talk?.image}
            alt={talk?.title || "Talk image"}
            width={720}
            height={405}
            className="my-8 rounded-md border bg-muted transition-colors"
            priority
          />
        )}

        {talk?.description && (
          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p>{talk.description}</p>
          </div>
        )}

        {talk?.talk_html && (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-2">Talk Content</h2>
            {ReactHtmlParser(talk.talk_html, {
              transform: transformNode,
            })}
          </div>
        )}

        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href={`/cms`}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            See all talks
          </Link>
        </div>
      </article>
    </main>
  );
}
