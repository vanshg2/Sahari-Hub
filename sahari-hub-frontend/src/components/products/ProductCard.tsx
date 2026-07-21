"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage?.url || "",
      sku: product.sku,
      stockQuantity: product.stockQuantity,
    });
  };

  return (
    <article className="group flex flex-col gap-3 items-center">
      <Link href={`/product/${product.id}`} className="relative w-full aspect-[4/5] bg-[#F5F2ED] rounded-xl overflow-hidden cursor-pointer block mb-2">
        {primaryImage ? (
          <Image
            alt={primaryImage.altText || product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 mix-blend-multiply"
            src={primaryImage.url}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
            <ShoppingBag className="w-12 h-12" />
          </div>
        )}
        
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all z-20"
        >
          <Heart className="w-4 h-4" />
        </button>
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="absolute top-3 left-3 bg-red-500 text-white font-label-sm text-[10px] uppercase px-2 py-1 rounded-sm shadow-sm z-20">
            Sale
          </span>
        )}
      </Link>
      
      <div className="flex flex-col items-center text-center w-full gap-1">
        <h3 className="font-headline-md text-sm md:text-base text-[#3A2C27] font-medium hover:text-[#D6A9A3] transition-colors truncate w-full">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="font-body-md text-[#3A2C27] font-bold text-sm md:text-base mb-2">
          {formatPrice(product.price)}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="ml-2 line-through text-gray-400 font-normal">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full sm:w-[80%] flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-label-md text-[10px] sm:text-xs uppercase py-2.5 rounded-sm hover:border-[#D6A9A3] hover:text-[#D6A9A3] transition-colors duration-300"
        >
          <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
