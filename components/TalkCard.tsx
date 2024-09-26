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

interface TalkCardProps {
  talk: {
    title: string;
    created_at: string;
    location?: string;
    talk_html: string;
    keywords?: string[];
    image?: string;
    presentation_link?: string;
    feedback_link?: string;
  };
}

export function TalkCard({ talk }: TalkCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-32 w-full overflow-hidden">
        <Image
          src={
            talk.image || "https://via.placeholder.com/400x200?text=Talk+Image"
          }
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
        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
          {talk.description || talk.talk_html}
        </p>
        {talk.keywords && (
          <div className="flex flex-wrap gap-2">
            {talk.keywords.slice(0, 3).map((keyword: string, index: number) => (
              <Badge key={index} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
