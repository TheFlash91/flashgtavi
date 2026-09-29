import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function BackLink({ href }: { href: string }) {
  const t = await getTranslations('actions');

  return (
    <Link className="button secondary" href={href}>
      ← {t('back')}
    </Link>
  );
}
