"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { productsApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      productsApi.list({ search: query, limit: "4" }).then((res) => setResults(res.data)).catch(() => {});
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: "-10%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-10%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-surface/95 backdrop-blur-xl z-[100] flex flex-col"
        >
          <div className="w-full px-margin-desktop py-12 relative flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-16 max-w-7xl mx-auto">
              <div className="font-headline-md text-primary tracking-widest uppercase">Sahari Hub</div>
              <button 
                onClick={onClose}
                className="text-on-surface hover:text-primary transition-colors focus:outline-none"
              >
                <X className="w-8 h-8 font-light" />
              </button>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative flex items-center border-b border-outline-variant pb-6 mb-16">
                <Search className="w-8 h-8 text-outline mr-6 font-light" />
                <input 
                  autoFocus 
                  className="w-full bg-transparent text-display-lg-mobile md:text-display-lg outline-none placeholder:text-outline-variant placeholder:font-light border-none focus:ring-0 px-0" 
                  placeholder="Search our collection..." 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              
              {query.trim() && results.length > 0 && (
                <div className="mb-16">
                  <h3 className="font-label-md uppercase text-outline mb-8 tracking-widest">Search Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {results.map((product) => {
                      const img = product.images?.find((i) => i.isPrimary) || product.images?.[0];
                      return (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={onClose}
                          className="flex items-center group cursor-pointer p-4 -ml-4 rounded-xl hover:bg-surface-container-low transition-colors"
                        >
                          <div className="w-20 h-24 bg-surface-container rounded-lg overflow-hidden mr-6 flex-shrink-0 relative">
                            {img && <Image alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src={img.url} />}
                          </div>
                          <div>
                            <p className="font-headline-md text-on-surface mb-1">{product.name}</p>
                            <p className="text-on-surface-variant font-label-md">{formatPrice(product.price)}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="mb-16 text-center">
                  <p className="font-body-lg text-on-surface-variant">No products found for &ldquo;{query}&rdquo;</p>
                </div>
              )}
              
              <div className="mt-20 border-t border-outline-variant pt-12">
                <h3 className="font-label-md uppercase text-outline mb-6 tracking-widest text-center">Suggested for You</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/collections/bags" onClick={onClose} className="px-6 py-3 border border-outline-variant rounded-full text-on-surface hover:border-primary hover:bg-primary hover:text-on-primary font-label-md transition-all duration-300">All Bags</Link>
                  <Link href="/collections/suits" onClick={onClose} className="px-6 py-3 border border-outline-variant rounded-full text-on-surface hover:border-primary hover:bg-primary hover:text-on-primary font-label-md transition-all duration-300">New Arrivals</Link>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
