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
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={480}
        height={161}
        priority={priority}
        className="h-10 w-auto md:h-[3.125rem]"
      />
    </Link>
  );
}
