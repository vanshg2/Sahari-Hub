"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";
import { productsApi } from "@/lib/api";
import { Product } from "@/lib/types";

// New Components
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeatureMarquee } from "@/components/home/FeatureMarquee";
import { StoreFeatures } from "@/components/home/StoreFeatures";

import { ReviewMarquee } from "@/components/reviews/ReviewMarquee";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We fetch 5 products instead of 4 to match the 5-column grid
    productsApi
      .featured(5)
      .then(setFeaturedProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* 1. Hero Section */}
      <HeroCarousel />

      {/* 2. Category Cards */}
      <CategoryCards />

      {/* 3. Feature Marquee */}
      <FeatureMarquee />

      {/* 4. Best Sellers Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-16">
        <div className="text-center mb-12">
          <h2 className="font-display-lg text-2xl md:text-3xl text-[#3A2C27] tracking-wider mb-2 uppercase">
            BEST SELLERS
          </h2>
          <p className="text-gray-600 font-medium">
            Customer Favorites – Loved by Many
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`${i === 4 ? 'hidden md:block' : ''}`}>
                  <ProductCardSkeleton />
                </div>
              ))
            : featuredProducts.map((product, index) => (
                <div key={product.id} className={`${index === 4 ? 'hidden md:block' : ''}`}>
                  <ProductCard product={product} index={index} />
                </div>
              ))}
        </div>

        {!loading && featuredProducts.length > 0 && (
          <div className="w-full flex justify-center mt-12">
            <Link
              href="/collections"
              className="px-10 py-3 bg-transparent border-2 border-[#D6A9A3] text-[#D6A9A3] font-bold text-xs uppercase tracking-widest hover:bg-[#D6A9A3] hover:text-white transition-colors duration-300 rounded-sm"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        )}
      </section>

      {/* 5. Features Section */}
      <StoreFeatures />

      {/* Customer Reviews Marquee */}
      <div className="py-12 bg-white">
        <ReviewMarquee />
      </div>


    </>
  );
}
