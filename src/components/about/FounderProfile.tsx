import { MediaImage } from "@/components/ui/MediaImage";
import { LinkedInLink } from "@/components/ui/LinkedInLink";
import { Eyebrow } from "@/components/ui/Section";
import { media } from "@/content/media";
import { cn } from "@/lib/utils";

type FounderMediaKey = keyof typeof media.team;

export type FounderProfileData = {
  id: string;
  mediaKey: string;
  name: string;
  role: string;
  focus: string;
  bio: readonly string[];
  linkedIn?: string;
  linkedInLabel?: string;
};

function resolveTeamMedia(key: string) {
  if (key in media.team) {
    return media.team[key as FounderMediaKey];
  }
  return media.team.raphaelLevy;
}

export function FounderProfile({
  founder,
  reverse = false,
}: {
  founder: FounderProfileData;
  reverse?: boolean;
}) {
  const image = resolveTeamMedia(founder.mediaKey);

  return (
    <article
      className={cn(
        "grid items-start gap-8 border-t border-border py-12 md:grid-cols-12 md:gap-10 md:py-16",
      )}
    >
      <div
        className={cn(
          "md:col-span-5",
          reverse ? "md:col-start-8 md:row-start-1" : "md:col-start-1",
        )}
      >
        <MediaImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 768px) 100vw, 40vw"
          frameClassName="aspect-[4/5] bg-concrete"
          imageClassName="object-cover object-[center_20%]"
        />
      </div>

      <div
        className={cn(
          "md:col-span-6 md:self-center",
          reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-7",
        )}
      >
        <Eyebrow>
          {founder.focus
            ? `${founder.role} · ${founder.focus}`
            : founder.role}
        </Eyebrow>
        <h3 className="mt-4 text-[1.75rem] leading-tight tracking-[-0.02em] md:text-[2.25rem]">
          {founder.name}
        </h3>
        {founder.focus ? (
          <p className="mt-2 text-[0.9375rem] font-medium text-charcoal">
            {founder.focus}
          </p>
        ) : null}
        <div className="prose-editorial mt-6 max-w-xl">
          {founder.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {founder.linkedIn ? (
          <div className="mt-8">
            <LinkedInLink
              href={founder.linkedIn}
              label={founder.linkedInLabel ?? "LinkedIn"}
              ariaLabel={`${founder.linkedInLabel ?? "LinkedIn"} — ${founder.name}`}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
