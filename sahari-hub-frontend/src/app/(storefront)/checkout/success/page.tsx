"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { CheckCircle2, Package, ArrowRight, Printer } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "Unknown";

  return (
    <section className="w-full pt-24 pb-32 px-gutter-mobile md:px-margin-desktop max-w-4xl mx-auto text-center flex flex-col items-center">
      <FadeIn className="flex flex-col items-center">
        <CheckCircle2 className="w-24 h-24 text-secondary mb-8" />
        
        <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-4">
          Order Confirmed
        </h1>
        
        <p className="font-body-lg text-on-surface-variant max-w-lg mx-auto mb-12">
          Thank you for your purchase. Your order <span className="font-bold text-primary">#{orderNumber}</span> has been received and is currently being processed by our team.
        </p>

        <div className="bg-surface-container-low p-8 rounded-xl w-full max-w-md border border-outline-variant/30 mb-12">
          <h2 className="font-headline-md text-primary mb-6 flex items-center justify-center gap-2">
            <Package className="w-5 h-5 text-muted-gold" />
            What happens next?
          </h2>
          <ul className="text-left font-body-md text-on-surface-variant flex flex-col gap-4">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              You will receive an order confirmation email shortly.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              Our artisans will carefully prepare and package your items.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              You will receive a tracking link once your order ships (typically within 1-2 business days).
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link href="/collections/bags" className="flex-1 bg-primary text-white font-label-md uppercase tracking-widest py-4 hover:bg-secondary transition-colors shadow-sm text-center">
            Continue Shopping
          </Link>
          <Link href="/" className="flex-1 bg-transparent text-primary border border-primary font-label-md uppercase tracking-widest py-4 hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
            Return Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="w-full pt-24 pb-32 px-gutter-mobile md:px-margin-desktop max-w-4xl mx-auto text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-surface-container rounded-full" />
          <div className="h-8 w-64 bg-surface-container rounded" />
          <div className="h-4 w-96 bg-surface-container rounded" />
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
