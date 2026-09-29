import Image from 'next/image';
import { media } from '@/data/media';

export default function GlobalBackdrop() {
  return (
    <div className="global-backdrop" aria-hidden="true">
      <Image src={media.hero.src} alt="" fill sizes="100vw" priority={false} />
    </div>
  );
}
