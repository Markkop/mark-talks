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

export interface Tag {
  label: string;
  url?: string;
}

export interface Talk {
  title: string;
  date: string;
  location: string;
  locationLink?: string;
  description: string;
  presentationLink: string;
  feedbackLink: string;
  coverImage: string;
  tags: Tag[];
  topCover?: boolean;
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

  const buttons = [
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
  ];

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg bg-surface flex flex-col border border-secondary/20",
        "group"
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={talk.coverImage}
          alt={`Cover for ${talk.title}`}
          className={cn(
            "absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-105",
            talk.topCover
              ? "object-cover object-top"
              : "object-cover object-center"
          )}
        />
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-0" />
      </div>
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="line-clamp-2 text-lg text-secondary">
          {talk.title}
        </CardTitle>
        <CardDescription className="flex flex-col space-y-1 text-sm text-secondary/80">
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
        <p className="mb-4 line-clamp-3 text-sm flex-grow text-secondary/70">
          {talk.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {talk.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={cn(
                "transition-colors duration-300",
                tag.url
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "bg-secondary/10 text-secondary hover:bg-secondary/20"
              )}
            >
              {tag.url ? (
                <a
                  href={tag.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {tag.label}
                </a>
              ) : (
                tag.label
              )}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-surface p-4 flex-shrink-0">
        {buttons.map(({ icon: Icon, text, link }) => (
          <Tooltip key={text}>
            <TooltipTrigger asChild>
              <div className="inline-block">
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      variant="outline"
                      className={cn(
                        "flex items-center transition-colors duration-300",
                        "hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {text}
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="outline"
                    className="flex items-center transition-colors duration-300 cursor-not-allowed opacity-50"
                    disabled
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {text}
                  </Button>
                )}
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
