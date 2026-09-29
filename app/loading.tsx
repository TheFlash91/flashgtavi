import { getTranslations } from 'next-intl/server';

export default async function Loading() {
  const t = await getTranslations('states');
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <div className="route-loading-card">
        <span className="route-loading-spinner" aria-hidden="true" />
        <span>{t('loading')}</span>
      </div>
    </div>
  );
}
