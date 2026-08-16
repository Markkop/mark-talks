import {
  CalendarIcon,
  MapPinIcon,
  MessageSquareIcon,
  PresentationIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { TagList, type Tag } from "~/components/common/TagList";
import {
  ImageGallery,
  type ImageFit,
} from "~/components/common/ImageGallery";
import { CardButton } from "~/components/common/CardButton";
import { CornerIcon } from "~/components/common/CornerIcon";

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
  fit?: ImageFit;
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
      text: "Presentation",
      link: talk.presentationLink,
    },
    ...(isAfter2023
      ? [
          {
            icon: MessageSquareIcon,
            text: "Feedback",
            link: talk.feedbackLink,
          },
        ]
      : []),
  ];

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg bg-surface flex flex-col border border-amber-400/30 relative",
        "group"
      )}
    >
      <CornerIcon type="talk" />
      <ImageGallery
        images={[talk.coverImage]}
        title={talk.title}
        topCover={talk.topCover}
        fit={talk.fit}
      />
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="line-clamp-2 text-base lg:text-sm text-secondary">
          {talk.title}
        </CardTitle>
        <CardDescription className="flex flex-col space-y-1 text-sm lg:text-xs text-secondary/80">
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
                className="text-amber-600 hover:underline"
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
        <p className="mb-4 line-clamp-3 text-sm lg:text-xs flex-grow text-secondary/70">
          {talk.description}
        </p>
        <TagList tags={talk.tags} variant="talk" />
      </CardContent>
      <CardFooter className="flex justify-between bg-surface p-4 flex-shrink-0">
        {buttons.map(({ icon, text, link }) => (
          <CardButton
            key={text}
            icon={icon}
            text={text}
            url={link}
            enabled={!!link}
            disabledReason="Not available yet"
            variant="talk"
          />
        ))}
      </CardFooter>
    </Card>
  );
}
