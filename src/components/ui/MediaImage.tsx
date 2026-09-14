import Image from "next/image";
import { insightCoverLoader, isInsightCoverSrc } from "@/lib/insights/cover-loader";
import { cn } from "@/lib/utils";

type MediaImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
  quality?: number;
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
  quality = 80,
}: MediaImageProps) {
  const isCover = isInsightCoverSrc(src);

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
          quality={quality}
          loading={priority ? "eager" : "lazy"}
          loader={isCover ? insightCoverLoader : undefined}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </div>
      {caption ? (
        <figcaption className="eyebrow mt-3 text-charcoal">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
