import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection'; // 追加

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pickleball Paddle Library',
  description: 'A simple e-commerce site for pickleball paddles.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <HeaderSection /> {/* 追加 */}
        <section className="py-5">
          <div className="container px-4 px-lg-5 mt-5">{children}</div>
        </section>
        <Footer />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}