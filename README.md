# Flash⚡- GTA VI

Independent GTA VI companion site built with Next.js, React and TypeScript.

The project is intentionally structured for readability and maintenance. Source files are written in expanded form: declarations, objects, JSX and CSS rules are not compressed into single lines to save space.

## 1. Technology

- Next.js 16
- React 19
- TypeScript
- next-intl
- CSS with centralized theme tokens
- Vitest
- Playwright

## 2. Start the project

Requirements:

- Node.js 20.9+
- npm

Commands:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 3. Project map

```text
flashgtavi/
├── app/                         # Routes, layouts and global CSS
│   ├── characters/              # Character listing and [slug] detail
│   ├── locations/               # Location listing and [slug] detail
│   ├── news/                    # News listing and [slug] detail
│   ├── trailers/                # Trailer page
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout and metadata
│   ├── globals.css              # Theme, typography, layout and responsive rules
│   ├── loading.tsx              # Route loading state
│   ├── not-found.tsx            # Localized 404
│   ├── error.tsx                # Localized 500/error state
│   ├── robots.ts                # robots.txt configuration
│   ├── sitemap.ts               # sitemap.xml configuration
│   └── manifest.ts              # Web app manifest
│
├── components/                 # Reusable UI components
│   ├── Navbar.tsx               # Desktop/mobile navigation
│   ├── LanguageSwitcher.tsx     # EN/ES switcher
│   ├── ThemeToggle.tsx          # Dark/light control
│   ├── ThemeProvider.tsx        # Theme state and persistence
│   ├── Countdown.tsx            # Release countdown
│   ├── ReleaseProgress.tsx      # Release progress bar
│   ├── CharacterCard.tsx        # Character card
│   ├── LocationCard.tsx         # Location card
│   ├── LocationCarousel.tsx     # Approved location gallery
│   ├── NewsCard.tsx              # News card
│   ├── NewsFilter.tsx            # News category filter/load more
│   ├── TrailerPlayer.tsx         # Embedded YouTube player
│   ├── MediaImage.tsx            # Shared next/image wrapper
│   ├── BackLink.tsx              # Detail-page back action
│   ├── BackToTop.tsx             # Scroll-to-top control
│   ├── GlobalBackdrop.tsx        # Global background image
│   ├── Footer.tsx                # Footer
│   ├── SectionHeading.tsx        # Reusable section heading
│   └── Shell.tsx                 # Navbar + content + footer shell
│
├── data/                        # Approved domain/catalog data
│   ├── catalog.ts                # Characters, locations, trailers and news
│   └── media.ts                  # Central media references
│
├── lib/                         # Domain/application helpers
│   ├── date.ts                   # Release and countdown calculations
│   ├── catalog.ts                # Slug/entity lookup helpers
│   └── i18n.ts                   # Message catalog utilities
│
├── i18n/                        # Locale configuration
│   ├── config.ts                 # Supported locales and default locale
│   └── request.ts                # next-intl request configuration
│
├── messages/                    # Localized content, split by feature
│   ├── en/                       # English
│   │   ├── common.json
│   │   ├── home.json
│   │   ├── characters.json
│   │   ├── locations.json
│   │   ├── trailers.json
│   │   └── news.json
│   └── es/                       # Spanish
│       ├── common.json
│       ├── home.json
│       ├── characters.json
│       ├── locations.json
│       ├── trailers.json
│       └── news.json
│
├── public/                      # Static project assets
│   └── media/                    # Only intentionally committed local media
│
├── tests/                       # Unit and end-to-end tests
│   ├── catalog.test.ts
│   ├── date.test.ts
│   ├── i18n.test.ts
│   └── e2e/
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── playwright.config.ts
├── prettier.config.mjs
├── tsconfig.json
└── vitest.config.ts
```

## 4. Where to find the important things quickly

### Images

Start at:

```text
data/media.ts
```

This is the central media registry. Character, location, trailer and news records consume references from this file instead of scattering media URLs through components.

### Character information

Start at:

```text
data/catalog.ts
```

Then use:

```text
messages/en/characters.json
messages/es/characters.json
```

for visible English/Spanish content.

### Countdown

Start at:

```text
lib/date.ts
components/Countdown.tsx
components/ReleaseProgress.tsx
```

### Theme

Start at:

```text
app/globals.css
components/ThemeProvider.tsx
components/ThemeToggle.tsx
```

### Typography

The typography tokens are at the top of:

```text
app/globals.css
```

The project defines:

```css
--font-body
--font-display
```

`--font-display` uses the Pricedown stack when that font is available in the environment and falls back to `Arial Black`/`Impact` rather than embedding an unapproved font asset.

### Navigation

Start at:

```text
components/Navbar.tsx
```

Desktop and mobile navigation share the same active/hover color rules in `app/globals.css`.

### Relationships

The technical relationship data is in:

```text
data/catalog.ts
```

The visual relationship list is in:

```text
app/characters/[slug]/page.tsx
app/globals.css
```

Each relationship is rendered as its own list row, not as a comma-separated string.

## 5. Media policy

Production media references are centralized in `data/media.ts`.

The project does not assume that a URL is licensed merely because it is reachable. Approved Rockstar/PlayStation sources are represented explicitly through the `MediaRef` metadata.

The character references updated in V6 are:

```text
Characters — Real Dimez:
Real_Dimez_04.0wa3vo07lz4e2.jpg

Real Dimez detail:
Real_Dimez_02.1366u9.x.yp0_.jpg

Characters — Dre'Quan Priest:
DreQuan_Priest_03.0zbl4i_x_1biu.jpg

Characters — Lucia Caminos:
Lucia_Caminos_02.16n.5umvlu_48.jpg

Jason & Lucia detail:
Jason_and_Lucia_10.0cauoz34524-..jpg

Home — Lucia Caminos:
Lucia_Caminos_06.0fxbjfk0jakb3.jpg
```

## 6. Generated Next.js folders

The project must not distribute generated development artifacts.

In particular:

```text
.next/
.next/dev/
.next/cache/
```

are generated by Next.js and are not source files.

They are excluded by `.gitignore` and are not included in the project ZIP. If they appear on a developer machine after running the development server, they can be regenerated and should not be copied into the source package.

## 7. Formatting rule

Readability has priority over saving lines.

Do not intentionally compress code into forms such as:

```css
body{margin:0;color:var(--text)}
```

Use:

```css
body
{
  margin:0;
  color:var(--text);
}
```

The same principle applies to TypeScript, TSX, JSON and configuration files: related values should be grouped, nested structures should be visible, and long expressions should be broken into understandable sections.

## 8. Localization

Supported locales are exactly:

```text
en
es
```

There is no locale segment in the public URL. The language is resolved independently from the pathname.

Translation files remain separated by feature under `messages/en/` and `messages/es/`.

## 9. Validation commands

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

A clean source package does not imply that these commands have been executed successfully. The current development package does not contain `node_modules`.

## 10. Git gate

No Git repository is initialized by this project package.

Git initialization, commits, branches, remotes, push and CI/CD remain intentionally outside the current implementation package until the project is validated and explicitly approved.


## AI development guide

Before modifying the project with an AI coding assistant, read `CLAUDE.md`. It defines the technical workflow, source-of-truth hierarchy, validation expectations and stop/ask protocol. The Master Document remains the highest authority for product decisions.
