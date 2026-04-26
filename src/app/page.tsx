import Navbar from '@/components/Navbar';
import CategoryBar from '@/components/CategoryBar';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import ProductGrid from '@/components/ProductGrid';
import Testimonials from '@/components/Testimonials';
import Subscribe from '@/components/Subscribe';

export default function Home() {
  return (
    <main>
      <Navbar />
      <CategoryBar />
      <Hero />
      <TrustBadges />
      <ProductGrid />
      <Testimonials />
      <Subscribe />
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid #eaeaea', color: 'var(--color-text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} PranJewel. All rights reserved.</p>
      </footer>
    </main>
  );
}
