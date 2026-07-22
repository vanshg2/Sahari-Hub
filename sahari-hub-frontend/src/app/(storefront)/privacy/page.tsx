"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <>
      <section className="w-full pt-16 pb-8 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto text-center">
        <FadeIn>
          <h1 className="font-cinzel text-3xl md:text-5xl text-[#3A2C27] mb-4 font-semibold tracking-wide">
            Privacy Policy
          </h1>
          <p className="font-body-lg text-body-lg text-gray-600 max-w-2xl mx-auto">
            At Sahari Hub, we value your privacy and are committed to protecting your personal information.
          </p>
        </FadeIn>
      </section>

      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24 max-w-4xl">
        <FadeIn delay={0.1}>
          <div className="bg-white border border-[#EAE3DC] rounded-2xl shadow-sm p-6 md:p-12 space-y-8">
            
            {/* Header intro */}
            <div className="flex items-start gap-4 pb-6 border-b border-[#F3EBE7]">
              <div className="w-12 h-12 bg-[#F3EBE7] rounded-full flex items-center justify-center text-[#3A2C27] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-cinzel text-xl md:text-2xl text-[#3A2C27] font-semibold mb-2">
                  Our Commitment to Your Privacy
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  At Sahari Hub, we value your privacy and are committed to protecting your personal information.
                </p>
              </div>
            </div>

            {/* Information Collection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D6A9A3]" />
                <h3 className="font-label-md text-[#3A2C27] font-bold uppercase tracking-wider">
                  Information Collection
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed bg-[#F9F6F3] p-4 rounded-xl border border-[#EAE3DC]">
                We collect only the information required to process your orders, including your <strong>name, contact number, email address, shipping address, and payment details</strong>.
              </p>
            </div>

            {/* Information Security */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#D6A9A3]" />
                <h3 className="font-label-md text-[#3A2C27] font-bold uppercase tracking-wider">
                  Information Security &amp; Sharing
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed bg-[#F9F6F3] p-4 rounded-xl border border-[#EAE3DC]">
                Your personal information is kept secure and is <strong>never sold, rented, or shared</strong> with third parties, except when necessary to process your order or comply with legal requirements.
              </p>
            </div>

            {/* User Consent */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#D6A9A3]" />
                <h3 className="font-label-md text-[#3A2C27] font-bold uppercase tracking-wider">
                  Consent
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed bg-[#F9F6F3] p-4 rounded-xl border border-[#EAE3DC]">
                By using our website, you agree to the collection and use of your information as described in this Privacy Policy.
              </p>
            </div>

          </div>
        </FadeIn>
      </section>
    </>
  );
}
