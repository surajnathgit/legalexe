'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import Navbar from '@/components/common/Navbar';
// import Footer from '@/components/common/Footer';

// Updated theme with colors matching the reference site
import theme from './theme/theme';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}