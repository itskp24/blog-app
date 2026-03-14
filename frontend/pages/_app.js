import { Inter, Playfair_Display } from 'next/font/google';
import ScrollToTop from '@/components/UI/ScrollToTop';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} ${playfair.variable}`}>
      <ScrollToTop />
      <Component {...pageProps} />
    </div>
  );
}
