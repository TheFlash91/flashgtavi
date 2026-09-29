import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { MediaRef } from '@/data/media';

export default async function MediaImage({
  media,
  className,
  altKey,
  vars,
  priority = false,
}: {
  media: MediaRef;
  className?: string;
  altKey?: string;
  vars?: Record<string, string>;
  priority?: boolean;
}) {
  const t = await getTranslations();
  const alt = t(altKey ?? media.altKey, vars);

  return (
    <Image
      src={media.src}
      alt={alt}
      width={media.width}
      height={media.height}
      className={className}
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}
