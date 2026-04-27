'use client';

import { useState } from 'react';
import styles from './ProductDetail.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  imageUrl: string;
  description: string;
}

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [selectedMetal, setSelectedMetal] = useState('14K Yellow Gold');
  const [selectedSize, setSelectedSize] = useState('12');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  // Mock secondary images for the gallery
  const images = [product.imageUrl, product.imageUrl, product.imageUrl];

  const toggleAccordion = (name: string) => {
    setActiveAccordion(activeAccordion === name ? null : name);
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return null;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <span>Home</span> / <span>Shop</span> / <span className={styles.currentCrumb}>{product.name}</span>
      </div>

      <div className={styles.mainContent}>
        {/* Left Column: Visuals */}
        <div className={styles.leftColumn}>
          <div className={styles.imageGallery}>
            <div className={styles.mainImageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage} alt={product.name} className={styles.mainImage} />
            </div>
            <div className={styles.thumbnailList}>
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  className={`${styles.thumbnailBtn} ${selectedImage === img && idx === 0 ? styles.activeThumb : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className={styles.thumbnailImg} />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.productStory}>
            <h3>The Story</h3>
            <p>{product.description}</p>
            <p>Every piece is crafted with precision to deliver a stunning and timeless elegance. Hand-set diamonds ensure maximum brilliance.</p>
          </div>

          <div className={styles.specTable}>
            <h3>Diamond & Gemstone Information</h3>
            <div className={styles.tableRow}>
              <span>Diamond Colour</span>
              <span>IJ</span>
            </div>
            <div className={styles.tableRow}>
              <span>Diamond Clarity</span>
              <span>SI</span>
            </div>
            <div className={styles.tableRow}>
              <span>Diamond Weight</span>
              <span>0.04 ct</span>
            </div>
            <div className={styles.tableRow}>
              <span>No. of Diamonds</span>
              <span>1</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className={styles.rightColumn}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          
          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className={styles.discountBadge}>{calculateDiscount()}% OFF</span>
              </>
            )}
            <p className={styles.taxText}>MRP (incl. of all taxes)</p>
          </div>

          <div className={styles.certificationBadge}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
            <span>Real Hallmarked Gold</span>
          </div>

          <div className={styles.variantsSection}>
            <div className={styles.variantGroup}>
              <label>Metal Purity & Color: <strong>{selectedMetal}</strong></label>
              <div className={styles.swatchList}>
                <button 
                  className={`${styles.swatch} ${selectedMetal === '14K Yellow Gold' ? styles.activeSwatch : ''}`}
                  onClick={() => setSelectedMetal('14K Yellow Gold')}
                  style={{ background: 'linear-gradient(135deg, #FFDF73 0%, #E6C247 100%)' }}
                  aria-label="14K Yellow Gold"
                ></button>
                <button 
                  className={`${styles.swatch} ${selectedMetal === '18K Yellow Gold' ? styles.activeSwatch : ''}`}
                  onClick={() => setSelectedMetal('18K Yellow Gold')}
                  style={{ background: 'linear-gradient(135deg, #FFD23F 0%, #D4AF37 100%)' }}
                  aria-label="18K Yellow Gold"
                ></button>
                <button 
                  className={`${styles.swatch} ${selectedMetal === '14K Rose Gold' ? styles.activeSwatch : ''}`}
                  onClick={() => setSelectedMetal('14K Rose Gold')}
                  style={{ background: 'linear-gradient(135deg, #E6A8A1 0%, #C8837A 100%)' }}
                  aria-label="14K Rose Gold"
                ></button>
              </div>
            </div>

            <div className={styles.variantGroup}>
              <label>Ring Size</label>
              <select 
                className={styles.sizeSelect} 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="10">Size 10</option>
                <option value="11">Size 11</option>
                <option value="12">Size 12</option>
                <option value="13">Size 13</option>
                <option value="14">Size 14</option>
                <option value="15">Size 15</option>
              </select>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.addToCartBtn}>Add to Cart</button>
            <button className={styles.whatsappBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Buy on WhatsApp
            </button>
          </div>

          <div className={styles.trustSignals}>
            <div className={styles.trustSignal}>
              <span className={styles.trustIcon}>↺</span>
              <span>15-Day Returns</span>
            </div>
            <div className={styles.trustSignal}>
              <span className={styles.trustIcon}>∞</span>
              <span>Lifetime Exchange</span>
            </div>
            <div className={styles.trustSignal}>
              <span className={styles.trustIcon}>💎</span>
              <span>This piece has resale value unlike fashion jewelry</span>
            </div>
          </div>

          <div className={styles.priceBreakup}>
            <h3>Price Breakup</h3>
            <div className={styles.breakupTable}>
              <div className={styles.breakupRow}>
                <span>Gold Value</span>
                <span>₹{Math.round(product.price * 0.6).toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.breakupRow}>
                <span>Diamond Value</span>
                <span>₹{Math.round(product.price * 0.25).toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.breakupRow}>
                <span>Making Charges</span>
                <span>₹{Math.round(product.price * 0.12).toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.breakupRow}>
                <span>GST (3%)</span>
                <span>₹{Math.round(product.price * 0.03).toLocaleString('en-IN')}</span>
              </div>
              <div className={`${styles.breakupRow} ${styles.breakupTotal}`}>
                <span>Total</span>
                <span>₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className={styles.accordions}>
            {[
              { id: 'guarantee', title: '✨ Real Gold Guarantee', content: 'Every piece is 100% certified and hallmarked.' },
              { id: 'returns', title: '↩ 15 Day Return/Exchange', content: 'Not satisfied? Return it within 15 days, no questions asked.' },
              { id: 'shipping', title: '📦 Shipping & Delivery', content: 'Free insured shipping across India within 3-5 business days.' },
              { id: 'warranty', title: '🌟 Warranty & Lifetime Exchange', content: 'Lifetime warranty against manufacturing defects and flexible exchange policy.' }
            ].map(acc => (
              <div key={acc.id} className={styles.accordion}>
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => toggleAccordion(acc.id)}
                >
                  {acc.title}
                  <span className={styles.accordionIcon}>{activeAccordion === acc.id ? '−' : '+'}</span>
                </button>
                <div className={`${styles.accordionContent} ${activeAccordion === acc.id ? styles.accordionOpen : ''}`}>
                  <p>{acc.content}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
