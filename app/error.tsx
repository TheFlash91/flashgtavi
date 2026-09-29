'use client';

import { useTranslations } from 'next-intl';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  return (
    <div className="page-wrap not-found">
      <div>
        <h1>500</h1>
        <p>{t('states.error')}</p>
        <button className="button" onClick={() => reset()} type="button">
          {t('actions.retry')}
        </button>
      </div>
    </div>
  );
}
