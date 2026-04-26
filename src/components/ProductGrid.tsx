import { PrismaClient } from '@prisma/client';
import styles from './ProductGrid.module.css';

const prisma = new PrismaClient();

export default async function ProductGrid() {
  const products = await prisma.product.findMany();

  return (
    <section className={styles.productSection}>
      <h2 className={styles.sectionTitle}>Featured Collections</h2>
      <div className={styles.grid}>
        {products.map((product: any) => (
          <div key={product.id} className={styles.card}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
