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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ products: [], suggestions: [] });
  }

  try {
    const lowerQ = q.toLowerCase().trim();
    
    // Fetch all products (safe for small catalogs) to ensure case-insensitive search on SQLite
    const allProducts = await prisma.product.findMany();
    
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
