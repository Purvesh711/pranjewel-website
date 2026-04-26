import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/hero_banner.png" 
        alt="PranJewel Fine Jewelry" 
        className={styles.heroImage} 
      />
      <div className={styles.content}>
        <h1 className={styles.title}>Elegance in Every Detail</h1>
        <p className={styles.subtitle}>
          Discover our new collection of ethically sourced, masterfully crafted fine jewelry.
        </p>
        <button className={styles.cta}>Shop Now</button>
      </div>
    </section>
  );
}
