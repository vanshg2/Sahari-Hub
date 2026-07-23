"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];

  const cartItem = items.find((i) => i.productId === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

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

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantityInCart > 0) {
      updateQuantity(product.id, quantityInCart - 1);
    }
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

        {quantityInCart > 0 ? (
          <div className="w-full sm:w-[85%] flex items-center justify-between border border-[#3A2C27] bg-[#3A2C27] text-white font-label-md text-[10px] sm:text-xs uppercase py-1 px-2.5 rounded-sm shadow-sm">
            <button
              onClick={handleDecrease}
              className="p-1 hover:bg-white/20 rounded transition-colors text-white flex items-center justify-center"
              title="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            
            <span className="font-bold tracking-wider text-xs">
              {quantityInCart} IN CART
            </span>

            <button
              onClick={handleAddToCart}
              className="p-1 hover:bg-white/20 rounded transition-colors text-white flex items-center justify-center"
              title="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-[85%] flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-label-md text-[10px] sm:text-xs uppercase py-2.5 rounded-sm hover:border-[#D6A9A3] hover:text-[#D6A9A3] transition-colors duration-300"
          >
            <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}
