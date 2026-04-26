import styles from './TrustBadges.module.css';

export default function TrustBadges() {
  const badges = [
    { 
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20"/><path d="M12 21l-4-12"/><path d="M12 21l4-12"/><path d="M6 3l2 6"/><path d="M18 3l-2 6"/></svg>,
      title: 'Certified Diamonds', 
      desc: '100% Conflict Free' 
    },
    { 
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2.1l4 4-4 4"/><path d="M3 12.2v-2a4 4 0 0 1 4-4h13.8M7 21.9l-4-4 4-4"/><path d="M21 11.8v2a4 4 0 0 1-4 4H3.2"/></svg>,
      title: 'Lifetime Exchange', 
      desc: 'Upgrade anytime' 
    },
    { 
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      title: 'Secure Shopping', 
      desc: 'Insured shipping' 
    },
    { 
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
      title: 'Fair Pricing', 
      desc: 'Direct from makers' 
    }
  ];

  return (
    <section className={styles.trustSection}>
      <div className={styles.badgeContainer}>
        {badges.map((badge, idx) => (
          <div key={idx} className={styles.badgeItem}>
            <div className={styles.icon}>{badge.icon}</div>
            <h4 className={styles.title}>{badge.title}</h4>
            <p className={styles.desc}>{badge.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
