import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const predefinedSuggestions = [
  "Gold Rings",
  "Diamond Rings",
  "Italian Necklaces",
  "Silver Bracelets",
  "Pendants",
  "Chains",
  "Wedding Bands",
  "Earrings",
  "Classic",
  "Modern"
];

// Fallback products in case SQLite database file is missing on Vercel serverless environment
const fallbackProducts = [
  { id: "1", name: "Classic Diamond Ring", price: 45000, imageUrl: "/products/ring1.png", description: "An elegant classic diamond ring." },
  { id: "2", name: "Gold Minimalist Necklace", price: 25000, imageUrl: "/products/necklace1.png", description: "A beautiful everyday gold necklace." },
  { id: "3", name: "Pearl Drop Earrings", price: 15000, imageUrl: "/products/earrings1.png", description: "Sophisticated pearl drop earrings." },
  { id: "4", name: "Diamond Tennis Bracelet", price: 85000, imageUrl: "/products/bracelet1.png", description: "Stunning diamond tennis bracelet." }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ products: [], suggestions: [] });
  }

  try {
    const lowerQ = q.toLowerCase().trim();
    
    let allProducts;
    try {
      // Fetch all products (safe for small catalogs) to ensure case-insensitive search on SQLite
      allProducts = await prisma.product.findMany();
    } catch (dbError) {
      console.warn("Prisma failed (likely Vercel SQLite issue). Using fallback.");
      allProducts = fallbackProducts;
    }
    
    const products = allProducts.filter(p => 
      p.name.toLowerCase().includes(lowerQ) || 
      p.description.toLowerCase().includes(lowerQ)
    ).slice(0, 5);

    const suggestions = predefinedSuggestions.filter(s => 
      s.toLowerCase().includes(lowerQ)
    );

    return NextResponse.json({ products, suggestions });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
