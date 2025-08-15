import { type LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

interface CardButtonProps {
  icon: LucideIcon;
  text: string;
  url?: string;
  enabled?: boolean;
  disabledReason?: string;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "talk";
}

export function CardButton({
  icon: Icon,
  text,
  url,
  enabled = true,
  disabledReason,
  onClick,
  className,
  variant = "default",
}: CardButtonProps) {
  const isDisabled = !enabled || (!url && !onClick);

  const getHoverColors = () => {
    if (variant === "talk") {
      return "hover:bg-amber-600 hover:text-white";
    }
    return "hover:bg-primary hover:text-primary-foreground";
  };

  const button = (
    <Button
      variant="outline"
      className={cn(
        "flex items-center transition-colors duration-300",
        enabled && (url || onClick)
          ? getHoverColors()
          : "cursor-not-allowed opacity-50",
        "text-sm lg:text-xs",
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );

  const content =
    url && enabled ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {button}
      </a>
    ) : (
      button
    );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-block">{content}</div>
      </TooltipTrigger>
      {isDisabled && (
        <TooltipContent>
          <p>{disabledReason || "Not available"}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
