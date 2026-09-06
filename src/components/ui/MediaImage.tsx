import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Applied to the outer <figure> (layout wrappers, max-width, etc.) */
  className?: string;
  /** Applied to the image frame (aspect ratio, max-height, overflow) */
  frameClassName?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
};

export function MediaImage({
  src,
  alt,
  width,
  height,
  className,
  frameClassName,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  caption,
}: MediaImageProps) {
  return (
    <figure className={cn(className)}>
      <div className={cn("overflow-hidden", frameClassName)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </div>
      {caption ? (
        <figcaption className="eyebrow mt-3 text-charcoal">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
