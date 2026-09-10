import Image from "next/image";
import Link from "next/link";
import { media } from "@/content/media";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "light",
  className,
  priority = false,
  href = "/",
}: {
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
  href?: string;
}) {
  const asset = variant === "dark" ? media.brand.logoDark : media.brand.logoLight;

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center focus-visible:outline-offset-4",
        className,
      )}
      aria-label={`${siteConfig.legalName} home`}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        priority={priority}
        sizes="(max-width: 768px) 140px, 180px"
        className="h-9 w-auto md:h-11"
      />
    </Link>
  );
}
