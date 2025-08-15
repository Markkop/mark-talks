import { MegaphoneIcon, FolderCodeIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type CornerIconType = "talk" | "project";

interface CornerIconProps {
  type: CornerIconType;
  className?: string;
}

const getIcon = (type: CornerIconType) => {
  switch (type) {
    case "talk":
      return MegaphoneIcon;
    case "project":
      return FolderCodeIcon;
    default:
      return MegaphoneIcon;
  }
};

const getIconColorClasses = (type: CornerIconType) => {
  switch (type) {
    case "talk":
      return "text-amber-400";
    case "project":
      return "text-primary";
    default:
      return "text-white";
  }
};

const getTooltipText = (type: CornerIconType) => {
  switch (type) {
    case "talk":
      return "Talk";
    case "project":
      return "Project";
    default:
      return "Item";
  }
};

const getTooltipColorClasses = (type: CornerIconType) => {
  switch (type) {
    case "talk":
      return "bg-amber-600 text-amber-50";
    case "project":
      return "bg-primary text-primary-foreground";
    default:
      return "bg-primary text-primary-foreground";
  }
};

export function CornerIcon({ type, className }: CornerIconProps) {
  const Icon = getIcon(type);
  const iconColorClasses = getIconColorClasses(type);
  const tooltipText = getTooltipText(type);
  const tooltipColorClasses = getTooltipColorClasses(type);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "absolute top-3 right-3 z-10 rounded-full p-2 backdrop-blur-sm bg-black/80",
            className
          )}
        >
          <Icon
            className={cn(
              "h-8 w-8 opacity-60 group-hover:opacity-100 transition-opacity duration-300",
              iconColorClasses
            )}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent className={tooltipColorClasses}>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
