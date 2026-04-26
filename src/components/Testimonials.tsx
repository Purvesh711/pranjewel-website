'use client';

import { useState, useRef, UIEvent } from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css';

const reviews = [
  { id: 1, name: 'Kanan', rating: 5, text: 'I have bought many products from PranJewel. I love the designs and finishing of their products. The after sales services are also very good.', image: '/products/ring1.png' },
  { id: 2, name: 'Heera', rating: 5, text: 'I\'m thrilled with my new gold ring, which I purchased from PranJewel. The design is stunning, and the quality is exceptional. I highly recommend it!', image: '/products/necklace1.png' },
  { id: 3, name: 'Sunia', rating: 5, text: 'Feeling delighted ♥️🥺 I bought this pendant from PranJewel for the first time. The prices are much lesser than other brands and they make minimalist jewelry. Happiness has started. ♥️🙏', image: '/products/earrings1.png' },
  { id: 4, name: 'Meera', rating: 5, text: 'Absolutely gorgeous craftsmanship. The bracelet I received is lightweight yet feels incredibly premium. Will definitely shop here again!', image: '/products/bracelet1.png' },
  { id: 5, name: 'Ananya', rating: 5, text: 'The customer service is as sparkling as their jewelry! Received my order in pristine packaging. Everything is 100% authentic and beautiful.', image: '/products/ring1.png' }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const cardWidth = 320 + 32; // width + gap
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < reviews.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (!trackRef.current) return;
    const cardWidth = 320 + 32;
    trackRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>What Our Customers Say</h2>
      <div className={styles.sliderContainer}>
        <div 
          className={styles.track} 
          ref={trackRef} 
          onScroll={handleScroll}
        >
          {reviews.map((review) => (
            <div key={review.id} className={styles.card}>
              <div className={styles.name}>{review.name}</div>
              <div className={styles.stars}>
                {'★'.repeat(review.rating)}
              </div>
              <div className={styles.imageContainer}>
                <Image src={review.image} alt={review.name} width={110} height={110} className={styles.image} />
              </div>
              <div className={styles.quoteBox}>
                <span className={styles.quoteMarkLeft}>“</span>
                <p className={styles.quoteText}>{review.text}</p>
                <span className={styles.quoteMarkRight}>”</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.dots}>
          {reviews.map((_, idx) => (
            <button 
              key={idx} 
              className={`${styles.dot} ${activeIndex === idx ? styles.active : ''}`}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
