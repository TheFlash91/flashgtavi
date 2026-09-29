'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const t = useTranslations('nav');

  return (
    <button
      className="icon-button theme-toggle"
      aria-label={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
      title={t('themeLabel')}
      onClick={toggle}
      type="button"
    >
      {theme === 'dark' ? '☼' : '☾'}
    </button>
  );
}
