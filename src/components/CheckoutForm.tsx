'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './CheckoutForm.module.css';

export default function CheckoutForm() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay for payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>Thank You For Your Order!</h2>
        <p>Your order has been placed successfully and is being processed.</p>
        <p className={styles.orderNumber}>Order #PJ-{Math.floor(100000 + Math.random() * 900000)}</p>
        <Link href="/" className={styles.backHomeBtn}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>Your cart is empty</h2>
        <p>You cannot checkout with an empty cart.</p>
        <Link href="/" className={styles.backHomeBtn}>
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.checkoutLayout}>
      {/* Left Column: Form */}
      <div className={styles.formColumn}>
        <form onSubmit={handleSubmit}>
          
          <div className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <h3>Contact Information</h3>
              <span>Already have an account? <Link href="/">Log in</Link></span>
            </div>
            <input type="email" placeholder="Email or mobile phone number" required className={styles.input} />
            <label className={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked />
              <span>Email me with news and offers</span>
            </label>
          </div>

          <div className={styles.formSection}>
            <h3>Shipping Address</h3>
            <div className={styles.inputRow}>
              <input type="text" placeholder="First name" required className={styles.input} />
              <input type="text" placeholder="Last name" required className={styles.input} />
            </div>
            <input type="text" placeholder="Address" required className={styles.input} />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" className={styles.input} />
            <div className={styles.inputRow}>
              <input type="text" placeholder="City" required className={styles.input} />
              <select className={styles.select} required defaultValue="">
                <option value="" disabled>State</option>
                <option value="MH">Maharashtra</option>
                <option value="DL">Delhi</option>
                <option value="KA">Karnataka</option>
                <option value="TN">Tamil Nadu</option>
                <option value="GJ">Gujarat</option>
              </select>
              <input type="text" placeholder="PIN code" required className={styles.input} />
            </div>
            <input type="tel" placeholder="Phone" required className={styles.input} />
          </div>

          <div className={styles.formSection}>
            <h3>Payment</h3>
            <p className={styles.subText}>All transactions are secure and encrypted.</p>
            
            <div className={styles.paymentBox}>
              <div className={styles.paymentHeader}>
                <label className={styles.radioLabel}>
                  <input type="radio" name="payment" defaultChecked />
                  <span>Credit Card</span>
                </label>
                <div className={styles.cardIcons}>
                  <span>💳</span>
                </div>
              </div>
              <div className={styles.paymentDetails}>
                <input type="text" placeholder="Card number" required className={styles.input} />
                <div className={styles.inputRow}>
                  <input type="text" placeholder="Expiration date (MM / YY)" required className={styles.input} />
                  <input type="text" placeholder="Security code" required className={styles.input} />
                </div>
                <input type="text" placeholder="Name on card" required className={styles.input} />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : `Pay ₹${cartTotal.toLocaleString('en-IN')}`}
          </button>

        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className={styles.summaryColumn}>
        <div className={styles.summarySticky}>
          <ul className={styles.summaryItems}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.summaryItem}>
                <div className={styles.itemImageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                  <span className={styles.itemBadge}>{item.quantity}</span>
                </div>
                <div className={styles.itemInfo}>
                  <h4>{item.name}</h4>
                  <p>{item.metal} / Size: {item.size}</p>
                </div>
                <span className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </li>
            ))}
          </ul>

          <div className={styles.discountCode}>
            <input type="text" placeholder="Discount code" className={styles.input} />
            <button type="button" className={styles.applyBtn}>Apply</button>
          </div>

          <div className={styles.priceBreakdown}>
            <div className={styles.priceRow}>
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalPrice}>
              <span className={styles.currencyCode}>INR</span> ₹{cartTotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
