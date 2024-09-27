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
      className={`overflow-hidden transition-all hover:shadow-lg ${
        talk.isPast ? "bg-gray-50" : "bg-white"
      }`}
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
          <span className="flex items-center">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {talk.date}
          </span>
          <span className="flex items-center">
            <MapPinIcon className="mr-1 h-4 w-4" />
            {talk.location}
          </span>
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
        <Button variant="outline" className="flex items-center" asChild>
          <a
            href={talk.presentationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PresentationIcon className="mr-2 h-4 w-4" />
            View Presentation
          </a>
        </Button>
        <Button variant="outline" className="flex items-center" asChild>
          <a href={talk.feedbackLink} target="_blank" rel="noopener noreferrer">
            <MessageSquareIcon className="mr-2 h-4 w-4" />
            Give Feedback
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
