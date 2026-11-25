import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { site } from '../lib/site';
import '@fontsource-variable/grandstander/wght.css';
import '@fontsource/andika/latin-400.css';
import '@fontsource/andika/latin-700.css';
import '@fontsource/schoolbell/latin-400.css';
import './tailwind.input.css';

export const metadata: Metadata = {
  title: { default: business.name, template: `%s · ${business.name}` },
  description: site.description || business.introduction,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-AU" suppressHydrationWarning>
    <head><ThemeScript /></head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
    </ThemeProvider></body>
  </html>;
}
