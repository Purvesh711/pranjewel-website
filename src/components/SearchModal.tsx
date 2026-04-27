'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './SearchModal.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery('');
      setSuggestions([]);
      setProducts([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          if (res.ok) {
            const data = await res.json();
            setProducts(data.products);
            setSuggestions(data.suggestions);
          }
        } catch (error) {
          console.error("Failed to search", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setProducts([]);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button onClick={onClose} className={styles.backBtn} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          
          <div className={styles.searchBar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Search for jewelry..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.input}
            />
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {isLoading && <p className={styles.loading}>Searching...</p>}
          
          {query && !isLoading && (
            <>
              {suggestions.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Suggestions</h3>
                  <div className={styles.suggestionsSlide}>
                    {suggestions.map((suggestion, index) => (
                      <button 
                        key={index} 
                        className={styles.suggestionPill}
                        onClick={() => setQuery(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {products.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Products</h3>
                  <div className={styles.productList}>
                    {products.map(product => (
                      <Link href={`/`} key={product.id} className={styles.productItem} onClick={onClose}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={product.imageUrl} alt={product.name} className={styles.productImg} />
                        <div className={styles.productInfo}>
                          <span className={styles.productName}>{product.name}</span>
                          <span className={styles.productPrice}>₹{product.price.toLocaleString('en-IN')}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {suggestions.length === 0 && products.length === 0 && (
                <p className={styles.noResults}>No results found for &quot;{query}&quot;</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
