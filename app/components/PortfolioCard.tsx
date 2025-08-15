import {
  CalendarIcon,
  BuildingIcon,
  SparklesIcon,
  GlobeIcon,
  CodeIcon,
  UserIcon,
} from "lucide-react";
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
import { TagList } from "~/components/common/TagList";
import { ImageGallery } from "~/components/common/ImageGallery";
import { CardButton } from "~/components/common/CardButton";
import { CornerIcon } from "~/components/common/CornerIcon";

export interface PortfolioClient {
  name: string;
  url: string;
}

export interface PortfolioAIUsage {
  level: "Incremental" | "Full" | "None";
  description: string;
}

export interface PortfolioButton {
  type: "view" | "source";
  text: string;
  icon: "globe" | "code";
  url?: string;
  enabled: boolean;
  disabledReason?: string;
}

export interface PortfolioItem {
  title: string;
  date: string;
  client: PortfolioClient;
  aiUsage: PortfolioAIUsage;
  description: string;
  images: string[];
  tags: string[];
  buttons: PortfolioButton[];
}

const getButtonIcon = (iconType: PortfolioButton["icon"]) => {
  switch (iconType) {
    case "globe":
      return GlobeIcon;
    case "code":
      return CodeIcon;
    default:
      return GlobeIcon;
  }
};

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg bg-surface flex flex-col border border-secondary/20 relative",
        "group"
      )}
    >
      <CornerIcon type="project" />
      <ImageGallery images={item.images} title={item.title} />

      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="line-clamp-2 text-base lg:text-sm text-secondary font-bold">
          {item.title}
        </CardTitle>
        <CardDescription className="flex flex-col space-y-1 text-sm lg:text-xs text-secondary/80">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center">
            {item.client.name.toLowerCase() === "personal" ? (
              <>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>{item.client.name}</span>
              </>
            ) : (
              <>
                <BuildingIcon className="mr-2 h-4 w-4" />
                <a
                  href={item.client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {item.client.name}
                </a>
              </>
            )}
          </div>
          {item.aiUsage.level === "Full" && (
            <div className="flex items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <SparklesIcon className="mr-2 h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mostly built with AI prompts and tools</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help text-sm lg:text-xs">
                    Built with AI
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mostly built with AI prompts and tools</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col">
        <p className="mb-4 line-clamp-3 text-sm lg:text-xs flex-grow text-secondary/70">
          {item.description}
        </p>
        <TagList tags={item.tags} />
      </CardContent>

      <CardFooter className="flex justify-between bg-surface p-4 flex-shrink-0">
        {item.buttons.map((button) => {
          const Icon = getButtonIcon(button.icon);
          return (
            <CardButton
              key={button.type}
              icon={Icon}
              text={button.text}
              url={button.url}
              enabled={button.enabled}
              disabledReason={button.disabledReason}
            />
          );
        })}
      </CardFooter>
    </Card>
  );
}
