'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('nav');
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const links = [
    ['/', t('home')],
    ['/characters', t('characters')],
    ['/trailers', t('trailers')],
    ['/locations', t('locations')],
    ['/news', t('news')],
  ] as const;

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && navRef.current?.contains(target)) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  const isActive = (href: string) =>
    path === href || (href !== '/' && path.startsWith(`${href}/`));

  return (
    <header ref={navRef} className="navbar">
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label={t('brandLabel')}>
          <span className="brand-logo" aria-hidden="true">
            <Image
              src="/brand/gta-vi-lightning.png"
              alt=""
              width={520}
              height={180}
              priority
            />
          </span>
        </Link>

        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t('closeMenu') : t('openMenu')}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="desktop-nav" aria-label={t('home')}>
          <ul>
            {links.map(([href, label]) => (
              <li key={href}>
                <Link className={isActive(href) ? 'active' : ''} href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-tools">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label={t('home')}>
          <ul>
            {links.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className={isActive(href) ? 'active' : ''}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-tools">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
