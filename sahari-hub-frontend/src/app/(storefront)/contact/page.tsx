"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { contactApi } from "@/lib/api";
import { Send, Mail, MapPin, Phone, Clock, HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "No. We currently accept online prepaid orders only."
  },
  {
    question: "Is shipping free?",
    answer: "Yes, we offer Free Shipping across India."
  },
  {
    question: "How long does delivery take?",
    answer: "Orders are usually delivered within 2-6 business days, depending on your location."
  },
  {
    question: "Can I return my order?",
    answer: "We do not accept returns. We only offer exchanges for damaged or defective products."
  },
  {
    question: "What is required for an exchange?",
    answer: "A valid unboxing video recorded from the moment the package is opened is mandatory. The request must be made within 7 days of delivery."
  },
  {
    question: "Do you offer refunds?",
    answer: "No. We do not offer refunds. Eligible products are exchanged only."
  },
  {
    question: "How can I contact customer support?",
    answer: "Primary: +91 87450 92024 | Secondary: +91 98992 74449 | Business Hours: 9:00 AM – 8:00 PM (All Days)"
  }
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await contactApi.submit(form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="w-full pt-16 pb-8 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto text-center flex flex-col items-center justify-center">
        <FadeIn>
          <h1 className="font-cinzel text-3xl md:text-5xl text-[#3A2C27] mb-4 font-semibold tracking-wide">
            Contact &amp; FAQ
          </h1>
          <p className="font-body-lg text-body-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Whether you have a question about a product, need help with an order, or need support, our team is ready to assist.
          </p>
        </FadeIn>
      </section>

      {/* Contact Content */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <FadeIn delay={0.1} className="flex flex-col gap-8">
            <div className="bg-white border border-[#EAE3DC] rounded-2xl p-6 shadow-sm">
              <h3 className="font-cinzel text-xl text-[#3A2C27] font-semibold mb-4 border-b border-[#F3EBE7] pb-3">
                Customer Support
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D6A9A3] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#3A2C27]">Primary: +91 87450 92024</p>
                    <p className="text-sm text-gray-600 mt-0.5">Secondary: +91 98992 74449</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#D6A9A3] mt-0.5 shrink-0" />
                  <a href="mailto:hubsahari@gmail.com" className="text-[#3A2C27] hover:text-[#D6A9A3] transition-colors font-medium">
                    hubsahari@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#EAE3DC] rounded-2xl p-6 shadow-sm">
              <h3 className="font-cinzel text-xl text-[#3A2C27] font-semibold mb-4 border-b border-[#F3EBE7] pb-3">
                Business Hours
              </h3>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D6A9A3] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#3A2C27]">9:00 AM – 8:00 PM</p>
                  <p className="text-xs text-gray-500 mt-0.5">Open All Days (Monday – Sunday)</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#EAE3DC] rounded-2xl p-6 shadow-sm">
              <h3 className="font-cinzel text-xl text-[#3A2C27] font-semibold mb-4 border-b border-[#F3EBE7] pb-3">
                Store Address
              </h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D6A9A3] mt-0.5 shrink-0" />
                <div className="text-sm text-[#3A2C27] leading-relaxed">
                  <p className="font-bold">Sahari Hub</p>
                  <p>H.No. 947, Near Bus Stand (Federal Bank)</p>
                  <p>Tikli (Teekli), Gurugram</p>
                  <p>Haryana – 122101, India</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="bg-white border border-[#EAE3DC] rounded-2xl shadow-sm p-8">
              <h3 className="font-cinzel text-2xl text-[#3A2C27] font-semibold mb-6 border-b border-[#F3EBE7] pb-4">
                Send Us a Message
              </h3>
              {success ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-[#F3EBE7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-[#3A2C27]" />
                  </div>
                  <h4 className="font-cinzel text-2xl text-[#3A2C27] mb-2 font-semibold">Message Sent</h4>
                  <p className="text-gray-600">
                    Thank you for reaching out. We aim to respond to all customer inquiries as quickly as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-label-sm uppercase tracking-widest text-[#3A2C27] font-bold text-xs">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full p-3.5 bg-[#F9F6F3] border border-[#EAE3DC] rounded-lg font-body-md text-[#3A2C27] focus:outline-none focus:border-[#3A2C27] transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-sm uppercase tracking-widest text-[#3A2C27] font-bold text-xs">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full p-3.5 bg-[#F9F6F3] border border-[#EAE3DC] rounded-lg font-body-md text-[#3A2C27] focus:outline-none focus:border-[#3A2C27] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-sm uppercase tracking-widest text-[#3A2C27] font-bold text-xs">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full p-3.5 bg-[#F9F6F3] border border-[#EAE3DC] rounded-lg font-body-md text-[#3A2C27] focus:outline-none focus:border-[#3A2C27] transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="self-start bg-[#3A2C27] text-white font-label-md uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-black transition-colors shadow-md disabled:opacity-50 flex items-center gap-2 text-xs font-bold"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24 max-w-4xl">
        <FadeIn delay={0.3}>
          <div className="bg-white border border-[#EAE3DC] rounded-2xl p-6 md:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#F3EBE7]">
              <div className="w-10 h-10 bg-[#F3EBE7] rounded-full flex items-center justify-center text-[#3A2C27]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-cinzel text-xl md:text-3xl text-[#3A2C27] font-semibold">
                  Frequently Asked Questions (FAQ)
                </h2>
                <p className="text-xs text-gray-500">Quick answers to common questions</p>
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index}
                    className="border border-[#EAE3DC] rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 md:p-5 text-left bg-[#F9F6F3] hover:bg-[#F3EBE7] transition-colors"
                    >
                      <span className="font-headline-md text-sm md:text-base text-[#3A2C27] font-semibold pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-[#3A2C27] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    {isOpen && (
                      <div className="p-4 md:p-5 bg-white text-xs md:text-sm text-gray-700 leading-relaxed border-t border-[#EAE3DC]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
