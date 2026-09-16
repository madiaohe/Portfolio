import { SiteHeader } from '@/components/blocks/site-header';
import { SiteQuickActions } from '@/components/blocks/site-quick-actions';
import './globals.css';
import './components.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{let theme;try{theme=localStorage.getItem('xianyu-theme')}catch{}document.documentElement.dataset.minimalTheme=theme==='light'||theme==='dark'?theme:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()`,
          }}
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteQuickActions />
      </body>
    </html>
  );
}
