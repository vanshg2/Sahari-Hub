"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <>
      <section className="w-full pt-16 pb-8 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto text-center">
        <FadeIn>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
          </p>
          <p className="font-body-sm text-on-surface-variant mt-2">Last updated: July 2026</p>
        </FadeIn>
      </section>

      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24">
        <FadeIn delay={0.1}>
          <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8 md:p-12">
            <div className="font-body-md text-on-surface-variant leading-relaxed space-y-8">
              <div>
                <h2 className="font-headline-md text-primary mb-3">1. Information We Collect</h2>
                <p className="mb-3">When you use our website or place an order, we may collect the following information:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Full name, email address, and phone number</li>
                  <li>Shipping and billing address</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Order history and preferences</li>
                  <li>Device and browser information for website optimization</li>
                </ul>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">2. How We Use Your Information</h2>
                <p className="mb-3">We use your information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>To process and fulfill your orders</li>
                  <li>To communicate order status, shipping updates, and delivery information</li>
                  <li>To provide customer support and respond to your inquiries</li>
                  <li>To improve our website, products, and services</li>
                  <li>To send promotional offers and newsletters (only with your consent)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">3. Data Protection</h2>
                <p>
                  We implement appropriate security measures to protect your personal information. Your data is stored securely and is only accessed by authorized personnel who need it to perform their duties. We do not sell, trade, or rent your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">4. Cookies</h2>
                <p>
                  Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">5. Third-Party Services</h2>
                <p>
                  We may use trusted third-party services for payment processing, analytics, and shipping. These services have access to your information only to perform specific tasks on our behalf and are obligated to protect your data.
                </p>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">6. Your Rights</h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt out of marketing communications at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">7. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or how we handle your data, please contact us at <a href="mailto:hubsahari@gmail.com" className="text-muted-gold hover:underline">hubsahari@gmail.com</a> or call us at +91 87450 92024.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
