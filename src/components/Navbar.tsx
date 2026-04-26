import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">PranJewel</Link>
      </div>
      <div className={styles.navContainer}>
        <ul className={styles.navLinks}>
          <li><Link href="/">Gifts Under ₹10,000</Link></li>
          <li><Link href="/">Woman</Link></li>
          <li><Link href="/">Man</Link></li>
          <li><Link href="/">Italian Jewellery</Link></li>
          <li><Link href="/">Shop By Price</Link></li>
        </ul>
        <ul className={styles.navLinksSecondary}>
          <li><Link href="/">Support</Link></li>
          <li><Link href="/">Stores</Link></li>
          <li><Link href="/">Blogs</Link></li>
        </ul>
      </div>
      <div className={styles.actions}>
        <button className={styles.iconButton} aria-label="Search">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button className={styles.iconButton} aria-label="User">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <button className={styles.iconButton} aria-label="Cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
}
