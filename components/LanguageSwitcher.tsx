'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === 'en' ? 'es' : 'en';

  const switchLocale = () => {
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.replace(pathname);
    router.refresh();
  };

  return (
    <button
      className="icon-button"
      aria-label={t('switchTo')}
      title={t('languageLabel')}
      onClick={switchLocale}
      type="button"
    >
      {locale === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
