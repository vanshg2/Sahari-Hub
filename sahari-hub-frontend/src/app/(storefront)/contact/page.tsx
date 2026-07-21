"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { contactApi } from "@/lib/api";
import { Send, Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            Contact Us
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            We&apos;d love to hear from you. Whether you have a question about a product, need help with an order, or simply want to get in touch, our support team is ready to assist.
          </p>
        </FadeIn>
      </section>

      {/* Contact Content */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <FadeIn delay={0.1} className="flex flex-col gap-8">
            <div>
              <h3 className="font-headline-md text-primary mb-4">Customer Support</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body-md text-primary">+91 87450 92024</p>
                    <p className="font-body-sm text-on-surface-variant mt-1">+91 98992 74449</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-gold mt-0.5 shrink-0" />
                  <a href="mailto:hubsahari@gmail.com" className="font-body-md text-primary hover:text-muted-gold transition-colors">
                    hubsahari@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-headline-md text-primary mb-4">Business Hours</h3>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-body-md text-primary">Monday – Sunday</p>
                  <p className="font-body-md text-on-surface-variant">9:00 AM – 8:00 PM (IST)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-headline-md text-primary mb-4">Store Address</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-gold mt-0.5 shrink-0" />
                <div className="font-body-md text-primary leading-relaxed">
                  <p className="font-semibold">Sahari Hub</p>
                  <p>H.No. 947, Near Bus Stand (Federal Bank)</p>
                  <p>Tikli (Teekli), Gurugram</p>
                  <p>Haryana – 122101, India</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8">
              <h3 className="font-headline-md text-primary mb-6">Send Us a Message</h3>
              {success ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-tertiary-fixed rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-headline-md text-primary mb-2">Message Sent</h4>
                  <p className="font-body-md text-on-surface-variant">
                    Thank you for reaching out. We aim to respond to all customer inquiries as quickly as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Message</label>
                    <textarea
                      rows={6}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {error && <p className="text-error font-body-md text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="self-start bg-primary text-white font-label-md uppercase tracking-widest px-10 py-3 hover:bg-secondary transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
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
    </>
  );
}
