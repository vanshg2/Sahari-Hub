"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Truck, RotateCw, Clock, Shield } from "lucide-react";

export default function ShippingPage() {
  return (
    <>
      <section className="w-full pt-16 pb-8 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto text-center">
        <FadeIn>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            Shipping &amp; Returns
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Everything you need to know about our shipping policies and return process.
          </p>
        </FadeIn>
      </section>

      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24">
        {/* Shipping */}
        <FadeIn delay={0.1}>
          <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8 md:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6 text-muted-gold" />
              <h2 className="font-headline-md text-primary">Shipping Policy</h2>
            </div>
            <div className="font-body-md text-on-surface-variant leading-relaxed space-y-4">
              <p>
                We currently offer <strong className="text-primary">Cash on Delivery (COD)</strong> and prepaid payment options across India.
              </p>
              <div>
                <h3 className="font-headline-md text-primary mb-3">Order Processing</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>All orders are processed within 1–2 business days after confirmation.</li>
                  <li>Orders placed on weekends or public holidays will be processed on the next business day.</li>
                  <li>You will receive a confirmation email and SMS once your order has been dispatched.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-headline-md text-primary mb-3">Delivery Timelines</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong className="text-primary">Metro Cities:</strong> 3–5 business days</li>
                  <li><strong className="text-primary">Tier 2 &amp; 3 Cities:</strong> 5–7 business days</li>
                  <li><strong className="text-primary">Remote Areas:</strong> 7–10 business days</li>
                </ul>
                <p className="mt-3">Delivery timelines may vary due to unforeseen circumstances such as weather conditions, holidays, or logistics disruptions.</p>
              </div>
              <div>
                <h3 className="font-headline-md text-primary mb-3">Shipping Charges</h3>
                <p>Shipping charges, if applicable, will be clearly displayed at checkout before you confirm your order.</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Returns */}
        <FadeIn delay={0.15}>
          <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8 md:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <RotateCw className="w-6 h-6 text-muted-gold" />
              <h2 className="font-headline-md text-primary">Return &amp; Exchange Policy</h2>
            </div>
            <div className="font-body-md text-on-surface-variant leading-relaxed space-y-4">
              <p>
                We want you to be completely satisfied with your purchase. If you are not happy with your order, you may request a return or exchange under the following conditions:
              </p>
              <div>
                <h3 className="font-headline-md text-primary mb-3">Eligibility</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Returns must be initiated within <strong className="text-primary">7 days</strong> of delivery.</li>
                  <li>Products must be unused, unwashed, and in their original packaging with all tags intact.</li>
                  <li>Sale items and promotional offers may not be eligible for returns unless defective.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-headline-md text-primary mb-3">How to Request a Return</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Contact our customer support team via phone or email with your order number.</li>
                  <li>Our team will guide you through the return process and provide a return authorization.</li>
                  <li>Pack the product securely and ship it back using the provided instructions.</li>
                  <li>Once we receive and inspect the returned item, your refund or exchange will be processed.</li>
                </ol>
              </div>
              <div>
                <h3 className="font-headline-md text-primary mb-3">Refund Process</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Refunds for prepaid orders will be credited to the original payment method within 5–7 business days.</li>
                  <li>For COD orders, refunds will be processed via bank transfer or store credit.</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Cancellations */}
        <FadeIn delay={0.2}>
          <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-muted-gold" />
              <h2 className="font-headline-md text-primary">Order Cancellation</h2>
            </div>
            <div className="font-body-md text-on-surface-variant leading-relaxed space-y-4">
              <p>
                You may cancel your order within <strong className="text-primary">24 hours</strong> of placing it, provided it has not yet been dispatched. To cancel, please contact our support team immediately.
              </p>
              <p>
                Once an order has been dispatched, it cannot be cancelled. In such cases, you may initiate a return after receiving the product.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
