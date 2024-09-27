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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

export interface Talk {
  title: string;
  date: string;
  location: string;
  locationLink?: string;
  description: string;
  presentationLink: string;
  feedbackLink: string;
  coverImage: string;
  tags: string[];
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  return new Date(dateString).toLocaleString("en-US", options);
};

export function TalkCard({ talk }: { talk: Talk }) {
  const isAfter2023 = new Date(talk.date).getFullYear() >= 2024;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg bg-background flex flex-col"
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={talk.coverImage}
          alt={`Cover for ${talk.title}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="line-clamp-2 text-lg">{talk.title}</CardTitle>
        <CardDescription className="flex flex-col space-y-1 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{formatDate(talk.date)}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            {talk.locationLink ? (
              <a
                href={talk.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {talk.location}
              </a>
            ) : (
              <span>{talk.location}</span>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <p className="mb-4 line-clamp-3 text-sm flex-grow">
          {talk.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {talk.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-secondary text-secondary-foreground transition-colors duration-300 hover:bg-secondary/80"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-muted/50 p-4 flex-shrink-0">
        {[
          {
            icon: PresentationIcon,
            text: "View Presentation",
            link: talk.presentationLink,
          },
          ...(isAfter2023
            ? [
                {
                  icon: MessageSquareIcon,
                  text: "Provide Feedback",
                  link: talk.feedbackLink,
                },
              ]
            : []),
        ].map(({ icon: Icon, text, link }) => (
          <Tooltip key={text}>
            <TooltipTrigger asChild>
              <div className="inline-block">
                <Button
                  variant="outline"
                  className={cn(
                    "flex items-center transition-colors duration-300",
                    link
                      ? "hover:bg-primary hover:text-primary-foreground"
                      : "cursor-not-allowed opacity-50"
                  )}
                  disabled={!link}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {text}
                </Button>
              </div>
            </TooltipTrigger>
            {!link && (
              <TooltipContent>
                <p>Not available yet</p>
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </CardFooter>
    </Card>
  );
}
