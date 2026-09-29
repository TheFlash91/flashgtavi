import { describe, expect, it } from 'vitest';
import { countdownParts, releaseProgress } from '@/lib/date';

describe('release calculations', () => {
  it('clamps progress', () => {
    expect(releaseProgress(new Date('2025-12-01'))).toBe(0);
    expect(releaseProgress(new Date('2026-11-19T23:59:00'))).toBe(100);
    expect(releaseProgress(new Date('2027-01-01'))).toBe(100);
  });

  it('counts down without negatives', () => {
    const before = countdownParts(
      new Date('2026-11-19T00:00:00Z'),
      new Date('2026-11-18T00:00:00Z'),
    );

    expect(before.days).toBe(1);
    expect(before.available).toBe(false);

    const after = countdownParts(
      new Date('2026-11-19T00:00:00Z'),
      new Date('2026-11-20T00:00:00Z'),
    );

    expect(after.available).toBe(true);
    expect(after.days).toBe(0);
  });
});
