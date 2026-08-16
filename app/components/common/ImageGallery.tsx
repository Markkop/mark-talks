import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export type ImageFit = "cover" | "contain";

interface ImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
  topCover?: boolean;
  fit?: ImageFit;
}

const objectFitClass: Record<ImageFit, string> = {
  cover: "object-cover",
  contain: "object-contain",
};

export function ImageGallery({
  images,
  title,
  className,
  topCover = true,
  fit = "cover",
}: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      className={cn(
        "relative h-52 w-full overflow-hidden",
        fit === "contain" && "bg-black",
        className
      )}
    >
      <img
        src={images[currentImageIndex]}
        alt={`${title} - ${currentImageIndex + 1}`}
        className={cn(
          "absolute inset-0 h-full w-full",
          objectFitClass[fit],
          topCover ? "object-top" : "object-center"
        )}
      />
      {/* Mobile: no overlay (transparent). Desktop: show overlay, hide on hover */}
      <div className="absolute inset-0 bg-transparent lg:bg-black/30 transition-opacity duration-300 lg:group-hover:opacity-0" />

      {/* Image navigation - only show if more than one image */}
      {images.length > 1 && (
        <>
          {/* Navigation arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={cn(
                  "h-6 w-6 rounded-full border transition-all duration-300",
                  currentImageIndex === index
                    ? "bg-white/50 border-white/20"
                    : "bg-transparent border-white/20 hover:border-white/80"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
