import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import styles from './ProductGrid.module.css';

const prisma = new PrismaClient();

const fallbackProducts = [
  { id: "1", name: "Classic Diamond Ring", price: 45000, originalPrice: 55000, imageUrl: "/products/ring1.png", description: "An elegant classic diamond ring.", isNew: true },
  { id: "2", name: "Gold Minimalist Necklace", price: 25000, originalPrice: 28000, imageUrl: "/products/necklace1.png", description: "A beautiful everyday gold necklace.", isNew: false },
  { id: "3", name: "Pearl Drop Earrings", price: 15000, originalPrice: 18000, imageUrl: "/products/earrings1.png", description: "Sophisticated pearl drop earrings.", isNew: true },
  { id: "4", name: "Diamond Tennis Bracelet", price: 85000, originalPrice: 95000, imageUrl: "/products/bracelet1.png", description: "Stunning diamond tennis bracelet.", isNew: false }
];

export default async function ProductGrid() {
  let products = [];
  try {
    products = await prisma.product.findMany();
  } catch (err) {
    console.warn("Prisma failed in ProductGrid. Using fallback.");
  }
  
  if (products.length === 0) {
    products = fallbackProducts;
  }

  return (
    <section className={styles.productSection}>
      <h2 className={styles.sectionTitle}>Featured Collections</h2>
      <div className={styles.grid}>
        {products.map((product: any) => (
          <Link href={`/product/${product.id}`} key={product.id} className={styles.card} style={{ textDecoration: 'none' }}>
            <div className={styles.imageWrapper}>
              {product.isNew && <span className={styles.badge}>New</span>}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            </div>
            <div className={styles.details}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.priceContainer}>
                <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
