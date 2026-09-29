import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from '@/i18n/request';
import { ThemeProvider } from '@/components/ThemeProvider';
import Shell from '@/components/Shell';
import './globals.css';

type Theme = 'dark' | 'light';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: 'Flash⚡- GTA VI',
    description:
      locale === 'es'
        ? 'Un sitio independiente que reúne información oficial de Grand Theft Auto VI.'
        : 'An independent companion to official Grand Theft Auto VI information.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    alternates: { canonical: '/' },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Flash⚡- GTA VI',
      description: 'Grand Theft Auto VI companion',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Flash⚡- GTA VI',
      description: 'Grand Theft Auto VI companion',
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const cookieTheme = cookieStore.get('theme')?.value;
  const initialTheme: Theme = cookieTheme === 'light' ? 'light' : 'dark';

  return (
    <html lang={locale} data-theme={initialTheme} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider initialTheme={initialTheme}>
            <Shell>{children}</Shell>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
