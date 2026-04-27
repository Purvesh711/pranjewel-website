import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import Navbar from '@/components/Navbar';
import CategoryBar from '@/components/CategoryBar';
import ProductDetail from '@/components/ProductDetail';

const prisma = new PrismaClient();

// Fallback products (in case Vercel Serverless SQLite fails)
const fallbackProducts = [
  { id: "1", name: "Classic Diamond Ring", price: 45000, originalPrice: 55000, imageUrl: "/products/ring1.png", description: "An elegant classic diamond ring.", isNew: true },
  { id: "2", name: "Gold Minimalist Necklace", price: 25000, originalPrice: 28000, imageUrl: "/products/necklace1.png", description: "A beautiful everyday gold necklace.", isNew: false },
  { id: "3", name: "Pearl Drop Earrings", price: 15000, originalPrice: 18000, imageUrl: "/products/earrings1.png", description: "Sophisticated pearl drop earrings.", isNew: true },
  { id: "4", name: "Diamond Tennis Bracelet", price: 85000, originalPrice: 95000, imageUrl: "/products/bracelet1.png", description: "Stunning diamond tennis bracelet.", isNew: false }
];

export default async function ProductPage({ params }: { params: { id: string } }) {
  let product = null;
  
  try {
    product = await prisma.product.findUnique({
      where: { id: params.id }
    });
  } catch (error) {
    console.warn("Prisma failed. Using fallback.", error);
  }

  // Fallback check
  if (!product) {
    product = fallbackProducts.find(p => p.id === params.id) || null;
  }

  if (!product) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <CategoryBar />
      <ProductDetail product={product} />
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid #eaeaea', color: 'var(--color-text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} PranJewel. All rights reserved.</p>
      </footer>
    </main>
  );
}
