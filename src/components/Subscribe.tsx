'use client';

import React from 'react';
import styles from './Subscribe.module.css';

export default function Subscribe() {
  return (
    <section className={styles.section}>
      <div className={styles.shopBar}>
        <div className={styles.shopBarInner}>
          <button className={styles.shopButton}>SHOP NOW</button>
        </div>
      </div>
      <div className={styles.subscribeBg}>
        <div className={styles.content}>
          <h2 className={styles.title}>BECOME A PRANJEWEL INSIDER!</h2>
          <p className={styles.subtitle}>Get updates on latest offers and new launches.</p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="E-mail" 
              className={styles.input} 
              required
            />
            <button type="submit" className={styles.subscribeButton}>
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
