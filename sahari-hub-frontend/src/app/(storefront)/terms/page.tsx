"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { FileText, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  return (
    <>
      <section className="w-full pt-16 pb-8 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto text-center">
        <FadeIn>
          <h1 className="font-cinzel text-3xl md:text-5xl text-[#3A2C27] mb-4 font-semibold tracking-wide">
            Terms &amp; Conditions
          </h1>
          <p className="font-body-lg text-body-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to Sahari Hub. By accessing or using our website, you agree to comply with these Terms &amp; Conditions.
          </p>
        </FadeIn>
      </section>

      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24 max-w-4xl">
        <FadeIn delay={0.1}>
          <div className="bg-white border border-[#EAE3DC] rounded-2xl shadow-sm p-6 md:p-12 space-y-8">
            
            {/* Header intro */}
            <div className="flex items-start gap-4 pb-6 border-b border-[#F3EBE7]">
              <div className="w-12 h-12 bg-[#F3EBE7] rounded-full flex items-center justify-center text-[#3A2C27] shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-cinzel text-xl md:text-2xl text-[#3A2C27] font-semibold mb-2">
                  Terms of Service Agreement
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  Welcome to Sahari Hub. By accessing or using our website, you agree to comply with these Terms &amp; Conditions.
                </p>
              </div>
            </div>

            {/* Terms List */}
            <div className="space-y-4">
              <h3 className="font-label-md text-[#3A2C27] font-bold uppercase tracking-wider mb-2">
                Key Terms &amp; Conditions
              </h3>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3 bg-[#F9F6F3] p-4 rounded-xl border border-[#EAE3DC]">
                  <CheckCircle2 className="w-5 h-5 text-[#D6A9A3] shrink-0 mt-0.5" />
                  <span>All products are subject to availability.</span>
                </div>

                <div className="flex items-start gap-3 bg-[#F9F6F3] p-4 rounded-xl border border-[#EAE3DC]">
                  <CheckCircle2 className="w-5 h-5 text-[#D6A9A3] shrink-0 mt-0.5" />
                  <span>Product prices and offers may change without prior notice.</span>
                </div>

                <div className="flex items-start gap-3 bg-[#F9F6F3] p-4 rounded-xl border border-[#EAE3DC]">
                  <CheckCircle2 className="w-5 h-5 text-[#D6A9A3] shrink-0 mt-0.5" />
                  <span>Customers are requested to verify product details, size, color, and pricing before placing an order.</span>
                </div>

                <div className="flex items-start gap-3 bg-[#F9F6F3] p-4 rounded-xl border border-[#EAE3DC]">
                  <CheckCircle2 className="w-5 h-5 text-[#D6A9A3] shrink-0 mt-0.5" />
                  <span>Orders are confirmed only after successful payment.</span>
                </div>

                <div className="flex items-start gap-3 bg-[#F9F6F3] p-4 rounded-xl border border-[#EAE3DC]">
                  <CheckCircle2 className="w-5 h-5 text-[#D6A9A3] shrink-0 mt-0.5" />
                  <span>Sahari Hub reserves the right to cancel or refuse any order due to pricing errors, stock unavailability, or other unforeseen circumstances.</span>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>
      </section>
    </>
  );
}
