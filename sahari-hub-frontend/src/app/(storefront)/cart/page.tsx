"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, tax, shippingCost, total, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <section className="w-full pt-16 pb-8 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        <FadeIn>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-12 border-b border-surface-container pb-4">
            Your Cart
          </h1>
        </FadeIn>
        <FadeIn className="text-center py-24 flex flex-col items-center gap-6">
          <ShoppingBag className="w-16 h-16 text-outline-variant/30" />
          <p className="font-body-lg text-body-lg text-on-surface-variant">Your cart is empty</p>
          <Link
            href="/collections/bags"
            className="px-8 py-3 bg-primary text-white font-label-md uppercase tracking-widest hover:bg-secondary transition-colors"
          >
            Start Shopping
          </Link>
        </FadeIn>
      </section>
    );
  }

  return (
    <>
      <section className="w-full pt-16 pb-8 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        <FadeIn>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-12 border-b border-surface-container pb-4">
            Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h1>
        </FadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {items.map((item, idx) => (
              <FadeIn key={item.productId} delay={idx * 0.1} className="flex flex-col sm:flex-row gap-6 p-4 bg-surface-container-low rounded-lg">
                <div className="relative w-full sm:w-32 aspect-square rounded-md overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <Image alt={item.name} src={item.image} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-container">
                      <ShoppingBag className="w-8 h-8 text-outline-variant" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-grow justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-md text-primary">{item.name}</h3>
                      <p className="font-label-sm text-on-surface-variant uppercase mt-1">{item.sku}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-on-surface-variant hover:text-error transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-4 sm:mt-0">
                    <div className="flex items-center gap-4 border border-outline-variant rounded-full px-4 py-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="text-on-surface-variant hover:text-primary"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-label-md text-primary">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="text-on-surface-variant hover:text-primary"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-headline-md text-primary">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Order Summary */}
          <FadeIn delay={0.3}>
            <div className="bg-tertiary-fixed p-8 rounded-xl flex flex-col gap-6">
              <h2 className="font-headline-lg text-primary border-b border-outline-variant/30 pb-4">Order Summary</h2>
              
              <div className="flex flex-col gap-4 font-body-md text-primary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between font-headline-md text-primary border-t border-outline-variant/30 pt-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full mt-4 text-center bg-primary text-white font-label-md uppercase tracking-widest py-4 hover:bg-secondary transition-colors shadow-sm"
              >
                Proceed to Checkout
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
