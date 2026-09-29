'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { MediaRef } from '@/data/media';

export default function LocationCarousel({ images, name }: { images: MediaRef[]; name: string }) {
  const t = useTranslations();
  const usable = useMemo(() => images.slice(0, 3), [images]);
  const [index, setIndex] = useState(0);

  if (!usable.length) return null;

  const current = usable[index] ?? usable[0];
  const nextIndex = (index + 1) % usable.length;
  const previousIndex = (index - 1 + usable.length) % usable.length;

  const imageSizes = '(max-width:900px) 100vw, 65vw';
  const imageAlt = t('accessibility.locationImage', { name });

  if (usable.length === 1) {
    return (
      <div className="detail-gallery">
        <Image
          src={current.src}
          alt={imageAlt}
          width={current.width}
          height={current.height}
          sizes={imageSizes}
          priority
        />
      </div>
    );
  }

  return (
    <div className="detail-gallery carousel">
      <Image
        src={current.src}
        alt={imageAlt}
        width={current.width}
        height={current.height}
        sizes={imageSizes}
        priority={index === 0}
        loading={index === 0 ? 'eager' : 'lazy'}
      />

      {/* Render the remaining approved images through next/image so the browser warms the same
          optimized resources that the visible image uses. This avoids a second raw-image request
          and removes the first-arrow delay caused by waiting for a new 3840px source. */}
      <div className="carousel-preload" aria-hidden="true">
        {usable.map((image, imageIndex) =>
          imageIndex === index ? null : (
            <Image
              key={image.src}
              src={image.src}
              alt=""
              width={image.width}
              height={image.height}
              sizes={imageSizes}
              loading="eager"
              fetchPriority="low"
            />
          ),
        )}
      </div>

      <button
        type="button"
        className="carousel-arrow"
        aria-label={t('actions.previous')}
        onClick={() => setIndex(previousIndex)}
      >
        ‹
      </button>
      <button
        type="button"
        className="carousel-arrow"
        aria-label={t('actions.next')}
        onClick={() => setIndex(nextIndex)}
      >
        ›
      </button>

      <div className="dots" aria-label={`${index + 1} / ${usable.length}`}>
        {usable.map((_, imageIndex) => (
          <button
            type="button"
            key={imageIndex}
            aria-label={`${imageIndex + 1}`}
            aria-current={imageIndex === index}
            onClick={() => setIndex(imageIndex)}
          />
        ))}
      </div>
    </div>
  );
}
