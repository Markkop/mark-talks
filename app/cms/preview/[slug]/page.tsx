import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllTalksBySlug } from "@/utils/actions/talks/get-talk-slug";
import { transformNode } from "@/utils/transform-node";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import ManageTalk from "../(components)/ManageTalk";

export default async function TalkPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getAllTalksBySlug(params?.slug);

  return (
    <main className="flex min-w-screen flex-col items-center justify-between ">
      <ManageTalk response={response} params={params} />
      <talk className="container relative max-w-3xl pt-3 pb-6 lg:pb-10">
        <div>
          <p className="block text-sm text-muted-foreground">
            Published on{" "}
            {new Date(response?.[0]?.created_at).toLocaleDateString()}
          </p>
          <h1 className="scroll-m-20 text-3xl font-bold pt-4 tracking-tight lg:text-3xl">
            {response?.[0]?.title}
          </h1>
        </div>
        <Image
          src={response?.[0]?.image}
          alt={""}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
        {ReactHtmlParser(response?.[0]?.talk_html, {
          transform: transformNode,
        })}
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href={`/cms`}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all talks
          </Link>
        </div>
      </talk>
    </main>
  );
}
