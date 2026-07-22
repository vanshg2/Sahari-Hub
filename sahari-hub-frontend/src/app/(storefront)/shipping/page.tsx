"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Truck, RotateCw, Clock, CheckCircle, Video, Ban, RefreshCw } from "lucide-react";

export default function ShippingPage() {
  return (
    <>
      <section className="w-full pt-16 pb-8 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto text-center">
        <FadeIn>
          <h1 className="font-cinzel text-3xl md:text-5xl text-[#3A2C27] mb-4 font-semibold tracking-wide">
            Shipping &amp; Returns Policy
          </h1>
          <p className="font-body-lg text-body-lg text-gray-600 max-w-2xl mx-auto">
            At Sahari Hub, we strive to deliver your order safely and transparently across India.
          </p>
        </FadeIn>
      </section>

      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24 space-y-8">
        
        {/* 1. Shipping Policy */}
        <FadeIn delay={0.1}>
          <div className="bg-white border border-[#EAE3DC] rounded-2xl shadow-sm p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F3EBE7]">
              <div className="w-10 h-10 bg-[#F3EBE7] rounded-full flex items-center justify-center text-[#3A2C27]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-cinzel text-xl md:text-2xl text-[#3A2C27] font-semibold">Shipping Policy</h2>
                <p className="text-xs text-gray-500">Fast &amp; reliable delivery across India</p>
              </div>
            </div>

            <p className="text-gray-700 font-medium mb-6">
              At Sahari Hub, we strive to deliver your order safely and on time across India.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-sm text-gray-700">
              <li className="flex items-start gap-2 bg-[#F9F6F3] p-3.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-[#D6A9A3] shrink-0 mt-0.5" />
                <span>We ship to all serviceable locations across India.</span>
              </li>
              <li className="flex items-start gap-2 bg-[#F9F6F3] p-3.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-[#D6A9A3] shrink-0 mt-0.5" />
                <span>Orders are processed within 1–2 business days.</span>
              </li>
              <li className="flex items-start gap-2 bg-[#F9F6F3] p-3.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-[#D6A9A3] shrink-0 mt-0.5" />
                <span>Delivery usually takes 2–6 business days, depending on your location.</span>
              </li>
              <li className="flex items-start gap-2 bg-[#F9F6F3] p-3.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-[#D6A9A3] shrink-0 mt-0.5" />
                <span>Delivery timelines may vary during festivals, public holidays, or unforeseen circumstances.</span>
              </li>
            </ul>

            {/* Sub-sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F3EBE7]">
              <div>
                <h3 className="font-label-md text-[#3A2C27] font-bold uppercase tracking-wider mb-3">Order Processing</h3>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600 list-disc list-inside">
                  <li>Orders placed before 2:00 PM are usually processed the same business day.</li>
                  <li>Orders placed after 2:00 PM or on Sundays/public holidays will be processed on the next business day.</li>
                  <li>Once your order is shipped, you will receive a tracking link via SMS, email, or WhatsApp.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-label-md text-[#3A2C27] font-bold uppercase tracking-wider mb-3">Shipping Charges</h3>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600 list-disc list-inside">
                  <li><strong className="text-[#3A2C27]">Free Shipping across India.</strong></li>
                  <li>No hidden shipping charges. The final price shown at checkout is the amount you pay.</li>
                  <li>Delivery is available to all serviceable locations across India.</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 2. Return & Exchange Policy */}
        <FadeIn delay={0.15}>
          <div className="bg-white border border-[#EAE3DC] rounded-2xl shadow-sm p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F3EBE7]">
              <div className="w-10 h-10 bg-[#F3EBE7] rounded-full flex items-center justify-center text-[#3A2C27]">
                <RotateCw className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-cinzel text-xl md:text-2xl text-[#3A2C27] font-semibold">Return &amp; Exchange Policy</h2>
                <p className="text-xs text-gray-500">Quality inspection &amp; Exchange rules</p>
              </div>
            </div>

            <p className="text-gray-700 font-medium mb-6">
              At Sahari Hub, every product is carefully inspected before dispatch. However, if you receive a damaged or defective item, we’re here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Exchange Eligibility */}
              <div className="bg-[#F9F6F3] p-5 rounded-xl border border-[#EAE3DC]">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-label-md text-[#3A2C27] font-bold uppercase tracking-wider">Exchange Eligibility</h3>
                </div>
                <ul className="space-y-2.5 text-xs md:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Exchanges are accepted <strong>only for damaged or defective products</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Video className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>An <strong>unboxing video</strong> recorded from the moment the package is opened is <strong>mandatory</strong> to process any exchange request.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>The exchange request must be raised within <strong>7 days</strong> of the delivery date.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>The product must be unused, with all original tags and packaging intact.</span>
                  </li>
                </ul>
              </div>

              {/* Non-Eligible Returns */}
              <div className="bg-[#FFF8F8] p-5 rounded-xl border border-red-100">
                <div className="flex items-center gap-2 mb-3">
                  <Ban className="w-5 h-5 text-red-500" />
                  <h3 className="font-label-md text-red-900 font-bold uppercase tracking-wider">Non-Eligible Returns</h3>
                </div>
                <p className="text-xs text-red-700 font-medium mb-2">We do not accept returns or exchanges for:</p>
                <ul className="space-y-2 text-xs md:text-sm text-red-700">
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">✕</span> Change of mind
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">✕</span> Incorrect product selection by the customer
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">✕</span> Used, washed, or damaged products
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">✕</span> Products without the original tags or packaging
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-500">✕</span> Claims made without a valid unboxing video
                  </li>
                </ul>
              </div>
            </div>

            {/* Detailed Eligibility Requirements */}
            <div className="p-4 bg-[#F3EBE7]/50 rounded-xl border border-[#EAE3DC]">
              <h3 className="font-label-md text-[#3A2C27] font-bold uppercase tracking-wider mb-2">Detailed Eligibility Requirements</h3>
              <p className="text-xs text-gray-600 mb-3">To be eligible for an exchange:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-700">
                <li className="bg-white p-2.5 rounded border border-[#EAE3DC]">1. Damaged or defective at delivery</li>
                <li className="bg-white p-2.5 rounded border border-[#EAE3DC]">2. Mandatory unboxing video from package start</li>
                <li className="bg-white p-2.5 rounded border border-[#EAE3DC]">3. Submitted within 7 days of delivery</li>
                <li className="bg-white p-2.5 rounded border border-[#EAE3DC]">4. Unused with all original tags &amp; packaging</li>
                <li className="bg-white p-2.5 rounded border border-[#EAE3DC] col-span-1 sm:col-span-2 md:col-span-2">5. Inspected upon return — exchange processed once verified</li>
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* 3. Refund Process & 4. Order Cancellation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Refund Process */}
          <FadeIn delay={0.2}>
            <div className="bg-white border border-[#EAE3DC] rounded-2xl shadow-sm p-6 md:p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#F3EBE7]">
                <div className="w-9 h-9 bg-[#F3EBE7] rounded-full flex items-center justify-center text-[#3A2C27]">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <h2 className="font-cinzel text-lg md:text-xl text-[#3A2C27] font-semibold">Refund Process</h2>
              </div>
              
              <div className="text-xs md:text-sm text-gray-700 space-y-3 flex-1">
                <p className="font-bold text-[#3A2C27]">
                  At Sahari Hub, we do not offer refunds.
                </p>
                <p>
                  If you receive a damaged or defective product, you may request an exchange within 7 days of delivery by providing a valid unboxing video.
                </p>
                <p>
                  Once your request is verified, the damaged product will be replaced with the same product or an equivalent product, subject to availability.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Order Cancellation */}
          <FadeIn delay={0.25}>
            <div className="bg-[#FFFDFB] border border-[#EAE3DC] rounded-2xl shadow-sm p-6 md:p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#F3EBE7]">
                <div className="w-9 h-9 bg-[#F3EBE7] rounded-full flex items-center justify-center text-[#3A2C27]">
                  <Clock className="w-4 h-4" />
                </div>
                <h2 className="font-cinzel text-lg md:text-xl text-[#3A2C27] font-semibold">Order Cancellation</h2>
              </div>

              <ul className="text-xs md:text-sm text-gray-700 space-y-2.5 list-disc list-inside flex-1">
                <li>Orders can be cancelled only before they are shipped.</li>
                <li>Once an order has been dispatched, it cannot be cancelled.</li>
                <li>To request a cancellation, please contact our customer support as soon as possible.</li>
                <li>If the order has already been shipped, it will not be eligible for cancellation.</li>
              </ul>
            </div>
          </FadeIn>

        </div>

      </section>
    </>
  );
}
