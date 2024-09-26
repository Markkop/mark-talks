import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TalkCardProps {
  talk?: {
    id?: string;
    title?: string;
    created_at?: string;
    location?: string;
    description?: string;
    talk_html?: string;
    keywords?: string[];
    image?: string;
    slug?: string;
  };
}

export function TalkCard({ talk }: TalkCardProps) {
  const placeholderImage =
    "https://via.placeholder.com/400x200?text=Talk+Image";
  const placeholderTitle = "Untitled Talk";
  const placeholderDate = "Date not specified";
  const placeholderLocation = "Location not specified";
  const placeholderDescription = "No description available";
  const placeholderKeywords = ["No keywords"];

  return (
    <Link href={`/talk/${talk?.slug || "placeholder-slug"}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={talk?.image || placeholderImage}
            alt={`Cover for ${talk?.title || placeholderTitle}`}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle>{talk?.title || placeholderTitle}</CardTitle>
          <CardDescription className="flex flex-col space-y-1">
            <span className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {talk?.created_at
                ? new Date(talk.created_at).toLocaleDateString()
                : placeholderDate}
            </span>
            <span className="flex items-center">
              <MapPinIcon className="mr-1 h-4 w-4" />
              {talk?.location || placeholderLocation}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-600 line-clamp-3">
            {talk?.description || placeholderDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {(talk?.keywords && talk.keywords.length > 0
              ? talk.keywords.slice(0, 3)
              : placeholderKeywords
            ).map((keyword, index) => (
              <Badge key={index} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
