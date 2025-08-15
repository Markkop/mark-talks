import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export interface Tag {
  label: string;
  url?: string;
}

interface TagListProps {
  tags: Tag[] | string[];
  className?: string;
  variant?: "default" | "talk";
}

export function TagList({
  tags,
  className,
  variant = "default",
}: TagListProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag, index) => {
        const isStringTag = typeof tag === "string";
        const label = isStringTag ? tag : tag.label;
        const url = isStringTag ? undefined : tag.url;

        const getTagColors = () => {
          if (variant === "talk") {
            return url
              ? "bg-amber-600/10 text-amber-600 hover:bg-amber-600/20"
              : "bg-secondary/10 text-secondary hover:bg-secondary/20";
          }
          return url
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "bg-secondary/10 text-secondary hover:bg-secondary/20";
        };

        return (
          <Badge
            key={index}
            variant="secondary"
            className={cn("transition-colors duration-300", getTagColors())}
          >
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {label}
              </a>
            ) : (
              label
            )}
          </Badge>
        );
      })}
    </div>
  );
}
