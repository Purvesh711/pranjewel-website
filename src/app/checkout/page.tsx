import Link from 'next/link';
import CheckoutForm from '@/components/CheckoutForm';

// We use an enclosed checkout without the main Navbar to prevent distractions
export default function CheckoutPage() {
  return (
    <main style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <header style={{ 
        padding: '1.5rem', 
        borderBottom: '1px solid #eaeaea', 
        backgroundColor: '#ffffff',
        textAlign: 'center'
      }}>
        <Link href="/" style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: '1.8rem', 
          fontWeight: 300, 
          color: 'var(--color-text-main)', 
          textDecoration: 'none',
          letterSpacing: '1px'
        }}>
          PranJewel
        </Link>
      </header>
      
      <div style={{ padding: '2rem 1rem' }}>
        <CheckoutForm />
      </div>
    </main>
  );
}
