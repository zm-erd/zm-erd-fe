import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import ModalProvider from '@/providers/modal-provider';
import { Toaster } from '@/components/ui/sonner';
import { BillingProvider } from '@/providers/billing-provider';

const font = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zm-Erd.',
  description: 'Erd 토이 프로젝트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BillingProvider>
            <ModalProvider>
              {children}
              <Toaster />
            </ModalProvider>
          </BillingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
