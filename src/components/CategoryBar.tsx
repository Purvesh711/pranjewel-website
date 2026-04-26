import Link from 'next/link';
import styles from './CategoryBar.module.css';

export default function CategoryBar() {
  const categories = [
    {
      name: 'Rings',
      href: '/category/rings',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
          <circle cx="10" cy="14" r="5"/>
          <circle cx="15" cy="12" r="5"/>
          <polygon points="15,7 13,4 17,4 19,7" fill="white" stroke="none"/>
        </svg>
      )
    },
    {
      name: 'Necklaces',
      href: '/category/necklaces',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
          <path d="M6 6c0 6 6 12 6 12s6-6 6-12"/>
          <circle cx="12" cy="19" r="2" fill="white" stroke="none"/>
          <polygon points="12,16 10,14 14,14" fill="white" stroke="none"/>
        </svg>
      )
    },
    {
      name: 'Chains',
      href: '/category/chains',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeDasharray="1.5 1.5">
          <path d="M5 6c0 8 7 14 7 14s7-6 7-14"/>
        </svg>
      )
    },
    {
      name: 'Pendants',
      href: '/category/pendants',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
          <path d="M12 6l-1-3m1 3l1-3"/>
          <path d="M12 20c-5-4.5-8-8-8-11a4 4 0 0 1 8-3 4 4 0 0 1 8 3c0 3-3 6.5-8 11z"/>
        </svg>
      )
    },
    {
      name: 'Bracelets',
      href: '/category/bracelets',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
          <path d="M3 12c4 4 14 4 18 0"/>
          <circle cx="12" cy="13.5" r="1.5" fill="white" stroke="none"/>
          <circle cx="9" cy="12.5" r="1" fill="white" stroke="none"/>
          <circle cx="15" cy="12.5" r="1" fill="white" stroke="none"/>
        </svg>
      )
    },
    {
      name: 'Earrings',
      href: '/category/earrings',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
          <path d="M8 7c0 3-2 6-2 9a2 2 0 0 0 4 0c0-3-2-6-2-9z"/>
          <path d="M16 7c0 3-2 6-2 9a2 2 0 0 0 4 0c0-3-2-6-2-9z"/>
          <path d="M8 7v-2a2 2 0 0 1 2-2"/>
          <path d="M16 7v-2a2 2 0 0 1 2-2"/>
        </svg>
      )
    }
  ];

  return (
    <section className={styles.categoryBar}>
      <div className={styles.container}>
        {categories.map((cat, idx) => (
          <Link key={idx} href={cat.href} className={styles.item}>
            <div className={styles.iconCircle}>
              {cat.svg}
            </div>
            <span className={styles.label}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
