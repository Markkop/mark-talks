import { NavBar } from "@/components/NavBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { readPublicTalk } from "@/utils/actions/talks/read-public-talk";
import { transformNode } from "@/utils/transform-node";
import {
  CalendarIcon,
  MapPinIcon,
  MessageSquareIcon,
  PresentationIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ReactHtmlParser from "react-html-parser";

export default async function TalkPage({ params }: { params: { id: string } }) {
  const data = await readPublicTalk(params?.id);
  console.log("r", data);

  if (!data || data.length === 0 || !data[0].shareable) {
    redirect("/");
  }

  const talk = data[0];

  return (
    <div className="flex flex-col justify-center items-center pb-2 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      <div className="container relative max-w-3xl py-6 lg:py-10">
        <Card className="overflow-hidden transition-all hover:shadow-lg">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={talk.image || "/placeholder.svg?height=200&width=400"}
              alt={`Cover for ${talk.title}`}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <CardHeader className="pb-2">
            <CardTitle>{talk.title}</CardTitle>
            <CardDescription className="flex flex-col space-y-1">
              <span className="flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {new Date(talk.created_at).toLocaleDateString()}
              </span>
              {talk.location && (
                <span className="flex items-center">
                  <MapPinIcon className="mr-1 h-4 w-4" />
                  {talk.location}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              {ReactHtmlParser(talk.talk_html, {
                transform: transformNode,
              })}
            </div>
            {talk.keywords && (
              <div className="flex flex-wrap gap-2">
                {talk.keywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between bg-gray-50 p-4">
            {talk.presentation_link && (
              <Button variant="outline" className="flex items-center" asChild>
                <a
                  href={talk.presentation_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PresentationIcon className="mr-2 h-4 w-4" />
                  View Presentation
                </a>
              </Button>
            )}
            {talk.feedback_link && (
              <Button variant="outline" className="flex items-center" asChild>
                <a
                  href={talk.feedback_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquareIcon className="mr-2 h-4 w-4" />
                  Give Feedback
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
        <Link href="https://cms.rasmic.xyz" target="_blank">
          <div className="w-[225px] fixed bg-white bottom-5 right-5 text-sm p-3 rounded border">
            <p className="text-center">
              Written on <span className="font-semibold">Mark Talks CMS</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
