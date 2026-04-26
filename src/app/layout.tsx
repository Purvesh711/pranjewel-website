import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PranJewel | Luxury Fine Jewelry',
  description: 'Discover the finest selection of diamond rings, gold necklaces, pearl earrings, and tennis bracelets at PranJewel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
