"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { useCart } from "@/lib/cart-context";
import { ordersApi } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shippingCost, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!form.phone || !form.firstName || !form.address || !form.city || !form.state || !form.postalCode) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const order = await ordersApi.create({
        phone: form.phone,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        shippingName: `${form.firstName} ${form.lastName}`,
        shippingPhone: form.phone,
        shippingAddress: `${form.address}, ${form.city}, ${form.state} - ${form.postalCode}`,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        paymentMethod: "RAZORPAY",
      });

      if (order.razorpayOrderId) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
          amount: Math.round(order.totalAmount * 100),
          currency: "INR",
          name: "Sahari Hub",
          description: "Purchase from Sahari Hub",
          order_id: order.razorpayOrderId,
          handler: async function (response: Record<string, string>) {
            try {
              setLoading(true);
              const verification = await fetch(`/api/orders/verify-payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              if (!verification.ok) {
                throw new Error("Payment verification failed");
              }

              clearCart();
              router.push(`/checkout/success?order=${order.orderNumber}`);
            } catch (err: unknown) {
              setError("Payment verification failed. Please contact support.");
              setLoading(false);
            }
          },
          prefill: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            contact: form.phone,
          },
          theme: {
            color: "#3A2C27", // Primary color
          },
        };

        const rzp = new (window as unknown as Record<string, any>).Razorpay(options);
        rzp.on("payment.failed", function (response: unknown) {
          setError("Payment failed. Please try again.");
          setLoading(false);
        });
        rzp.open();
      } else {
        // Fallback if Razorpay is not configured on backend
        clearCart();
        router.push(`/checkout/success?order=${order.orderNumber}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to place order");
      } else {
        setError("Failed to place order");
      }
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="w-full pt-16 pb-24 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        <FadeIn>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-12 border-b border-surface-container pb-4">Checkout</h1>
        </FadeIn>
        <FadeIn className="text-center py-24 flex flex-col items-center gap-6">
          <ShoppingBag className="w-16 h-16 text-outline-variant/30" />
          <p className="font-body-lg text-body-lg text-on-surface-variant">Your cart is empty</p>
          <Link href="/collections/bags" className="px-8 py-3 bg-primary text-white font-label-md uppercase tracking-widest hover:bg-secondary transition-colors">Start Shopping</Link>
        </FadeIn>
      </section>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <section className="w-full pt-16 pb-24 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        <FadeIn>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-12 border-b border-surface-container pb-4">Checkout</h1>
        </FadeIn>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Checkout Form */}
            <FadeIn delay={0.1} className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="font-headline-md text-primary">Contact Information</h2>
                <input name="email" type="email" placeholder="Email Address (optional)" value={form.email} onChange={handleChange} className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
                <input name="phone" type="tel" placeholder="Phone Number *" required value={form.phone} onChange={handleChange} className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="font-headline-md text-primary">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input name="firstName" placeholder="First Name *" required value={form.firstName} onChange={handleChange} className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
                  <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
                </div>
                <input name="address" placeholder="Address *" required value={form.address} onChange={handleChange} className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
                <div className="grid grid-cols-3 gap-4">
                  <input name="city" placeholder="City *" required value={form.city} onChange={handleChange} className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
                  <input name="state" placeholder="State *" required value={form.state} onChange={handleChange} className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
                  <input name="postalCode" placeholder="Postal Code *" required value={form.postalCode} onChange={handleChange} className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
                </div>
              </div>

              {error && <p className="text-error font-body-md">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-center bg-primary text-white font-label-md uppercase tracking-widest py-4 hover:bg-secondary transition-colors shadow-sm disabled:opacity-50 mt-4"
              >
                {loading ? "Placing Order..." : `Place Order - ${formatPrice(total)}`}
              </button>
            </FadeIn>

            {/* Order Summary Sidebar */}
            <FadeIn delay={0.2}>
              <div className="bg-tertiary-fixed p-8 rounded-xl flex flex-col gap-6 sticky top-24">
                <h2 className="font-headline-lg text-primary border-b border-outline-variant/30 pb-4">Order Summary</h2>
                
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 bg-surface-container-low rounded overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <Image alt={item.name} src={item.image} fill className="object-cover" />
                          ) : (
                            <ShoppingBag className="w-6 h-6 text-outline-variant absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          )}
                        </div>
                        <div>
                          <p className="font-label-md text-primary">{item.name}</p>
                          <p className="font-label-sm text-on-surface-variant">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-body-md text-primary">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 font-body-md text-primary mt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-headline-md text-primary border-t border-outline-variant/30 pt-4">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </form>
      </section>
    </>
  );
}
