"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";
import { productsApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { ChevronDown } from "lucide-react";

export default function SuitsCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Newest");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: Record<string, string> = {
          categorySlug: "suits",
          limit: "20",
        };
        if (sortBy === "Price: Low to High") {
          params.sortBy = "price";
          params.sortOrder = "asc";
        } else if (sortBy === "Price: High to Low") {
          params.sortBy = "price";
          params.sortOrder = "desc";
        } else {
          params.sortBy = "createdAt";
          params.sortOrder = "desc";
        }
        const result = await productsApi.list(params);
        setProducts(result.data);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sortBy]);

  return (
    <>
      {/* Page Header */}
      <section className="w-full pt-6 md:pt-8 pb-4 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto text-center flex flex-col items-center justify-center">
        <FadeIn>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            The Suit Collection
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Discover our curated selection of premium suits, designed for the modern woman who appreciates timeless elegance and impeccable craftsmanship.
          </p>
        </FadeIn>
      </section>

      {/* Filters & Sort Bar */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-12 sticky top-20 z-40 bg-background/95 backdrop-blur-md py-4 border-b border-surface-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button
              onClick={() => setSortBy("Newest")}
              className="px-6 py-2 rounded-full bg-tertiary-fixed text-primary font-label-sm text-label-sm uppercase tracking-widest whitespace-nowrap border border-transparent transition-colors duration-300 hover:bg-muted-gold hover:text-white"
            >
              All Suits
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md uppercase"
              >
                <span>Sort By: {sortBy}</span>
                <ChevronDown className="w-5 h-5" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-surface-container shadow-sm rounded-lg z-50">
                  {["Newest", "Price: Low to High", "Price: High to Low"].map((option) => (
                    <button
                      key={option}
                      onClick={() => { setSortBy(option); setSortOpen(false); }}
                      className="block w-full text-left px-4 py-3 font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-gutter-desktop gap-y-16">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <ProductCardSkeleton />
                </FadeIn>
              ))
            : products.map((product, index) => (
                <FadeIn key={product.id} delay={(index + 1) * 0.05}>
                  <ProductCard product={product} index={index} />
                </FadeIn>
              ))}
        </div>

        {!loading && products.length === 0 && (
          <FadeIn className="text-center py-24">
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              No products found in this collection.
            </p>
          </FadeIn>
        )}
      </section>
    </>
  );
}
