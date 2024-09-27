import {
  CalendarIcon,
  MapPinIcon,
  MessageSquareIcon,
  PresentationIcon,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

export interface Talk {
  title: string;
  date: string;
  location: string;
  description: string;
  presentationLink: string;
  feedbackLink: string;
  isPast: boolean;
  coverImage: string;
  tags: string[];
}

export function TalkCard({ talk }: { talk: Talk }) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg",
        talk.isPast ? "bg-gray-50" : "bg-white"
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={talk.coverImage}
          alt={`Cover for ${talk.title}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{talk.title}</CardTitle>
        <CardDescription className="flex flex-col space-y-1">
          {[
            { icon: CalendarIcon, text: talk.date },
            { icon: MapPinIcon, text: talk.location },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center">
              <Icon className="mr-2 h-4 w-4" />
              <span>{text}</span>
            </div>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-600">{talk.description}</p>
        <div className="flex flex-wrap gap-2">
          {talk.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 p-4">
        {[
          {
            icon: PresentationIcon,
            text: "View Presentation",
            link: talk.presentationLink,
          },
          {
            icon: MessageSquareIcon,
            text: "Provide Feedback",
            link: talk.feedbackLink,
          },
        ].map(({ icon: Icon, text, link }) => (
          <Button
            variant="outline"
            className={cn(
              "flex items-center",
              !link && "cursor-not-allowed opacity-50"
            )}
            asChild={!!link}
            disabled={!link}
            title={link ? undefined : "Not yet available"}
            key={text}
          >
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Icon className="mr-2 h-4 w-4" />
                {text}
              </a>
            ) : (
              <>
                <Icon className="mr-2 h-4 w-4" />
                {text}
              </>
            )}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
}
