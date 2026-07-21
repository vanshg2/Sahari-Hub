"use client";

import { FadeIn } from "@/components/animations/FadeIn";

export default function TermsPage() {
  return (
    <>
      <section className="w-full pt-16 pb-8 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto text-center">
        <FadeIn>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            Terms of Service
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Please read these terms carefully before using our website or placing an order.
          </p>
          <p className="font-body-sm text-on-surface-variant mt-2">Last updated: July 2026</p>
        </FadeIn>
      </section>

      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24">
        <FadeIn delay={0.1}>
          <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8 md:p-12">
            <div className="font-body-md text-on-surface-variant leading-relaxed space-y-8">
              <div>
                <h2 className="font-headline-md text-primary mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the Sahari Hub website (saharihub.com) and placing an order, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
                </p>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">2. Products &amp; Pricing</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>All product descriptions, images, and prices are as accurate as possible. However, slight variations in color, texture, or design may occur due to screen display differences.</li>
                  <li>Prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise.</li>
                  <li>Sahari Hub reserves the right to modify prices, product availability, and promotional offers without prior notice.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">3. Orders &amp; Payment</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Placing an order constitutes an offer to purchase the selected products.</li>
                  <li>We reserve the right to accept or decline any order at our discretion.</li>
                  <li>Payment can be made via Cash on Delivery (COD) or prepaid methods available at checkout.</li>
                  <li>All prepaid transactions are processed through secure, encrypted payment gateways.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">4. Shipping &amp; Delivery</h2>
                <p>
                  Shipping and delivery terms are outlined in our <a href="/shipping" className="text-muted-gold hover:underline">Shipping &amp; Returns</a> page. By placing an order, you agree to our shipping policies and estimated delivery timelines.
                </p>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">5. Returns &amp; Refunds</h2>
                <p>
                  Returns and refunds are subject to the conditions outlined in our <a href="/shipping" className="text-muted-gold hover:underline">Shipping &amp; Returns</a> page. Sahari Hub reserves the right to refuse returns that do not meet the stated eligibility criteria.
                </p>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">6. User Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>You are responsible for providing accurate and complete information when placing an order.</li>
                  <li>You must be at least 18 years of age to make a purchase.</li>
                  <li>Any misuse of the website, including fraudulent activity, will result in immediate account termination.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">7. Intellectual Property</h2>
                <p>
                  All content on this website, including images, logos, text, and design elements, is the property of Sahari Hub and is protected by applicable intellectual property laws. Unauthorized reproduction or use of any content is strictly prohibited.
                </p>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">8. Limitation of Liability</h2>
                <p>
                  Sahari Hub shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability for any claim shall not exceed the amount paid for the specific product in question.
                </p>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">9. Governing Law</h2>
                <p>
                  These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana.
                </p>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">10. Changes to Terms</h2>
                <p>
                  Sahari Hub reserves the right to update these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website constitutes acceptance of the updated terms.
                </p>
              </div>

              <div>
                <h2 className="font-headline-md text-primary mb-3">11. Contact</h2>
                <p>
                  For questions about these terms, contact us at <a href="mailto:hubsahari@gmail.com" className="text-muted-gold hover:underline">hubsahari@gmail.com</a> or call +91 87450 92024.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
