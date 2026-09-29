import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="page-wrap not-found">
      <div>
        <h1>404</h1>
        <p>{t('notFound.description')}</p>
        <Link className="button" href="/">
          {t('actions.back')}
        </Link>
      </div>
    </div>
  );
}
