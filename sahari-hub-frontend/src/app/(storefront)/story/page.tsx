"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { Heart, Target, Eye, Gem, Users, Shield, IndianRupee, Truck, Star, RefreshCw } from "lucide-react";

export default function StoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full pt-16 pb-12 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto text-center">
        <FadeIn>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            Our Story
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
            Every brand begins with an idea. Sahari Hub began with a simple belief—that every woman deserves fashion that is elegant, affordable, and thoughtfully crafted.
          </p>
        </FadeIn>
      </section>

      {/* About */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-16">
        <FadeIn delay={0.1}>
          <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8 md:p-12">
            <h2 className="font-headline-md text-primary mb-6">About Sahari Hub</h2>
            <div className="font-body-md text-on-surface-variant leading-relaxed space-y-4">
              <p>
                At <strong className="text-primary">Sahari Hub</strong>, we believe fashion is more than just what you wear—it&apos;s a reflection of confidence, individuality, and timeless elegance.
              </p>
              <p>
                We specialize in thoughtfully curated handbags and women&apos;s ethnic wear that combine premium quality, modern style, and everyday comfort. Every product in our collection is selected with care to ensure it meets our standards of craftsmanship, durability, and design.
              </p>
              <p>
                Whether you&apos;re dressing for everyday moments, festive celebrations, or special occasions, our collections are designed to help you look and feel your best.
              </p>
              <p>
                Our commitment extends beyond fashion. We strive to deliver a seamless shopping experience through secure transactions, reliable delivery, transparent policies, and dedicated customer support.
              </p>
              <p>
                At Sahari Hub, our goal is simple—to bring beautiful, high-quality fashion closer to every woman while building lasting relationships through trust, quality, and exceptional service.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Brand Story */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-16">
        <FadeIn delay={0.15}>
          <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8 md:p-12">
            <h2 className="font-headline-md text-primary mb-6">The Journey</h2>
            <div className="font-body-md text-on-surface-variant leading-relaxed space-y-4">
              <p>
                Finding handbags and ethnic wear that offer both quality and timeless style isn&apos;t always easy. Too often, customers are forced to choose between premium craftsmanship and reasonable pricing. We wanted to change that.
              </p>
              <p>
                Sahari Hub was created to bridge this gap by curating collections that combine sophisticated design, lasting quality, and everyday practicality.
              </p>
              <p>
                Our journey is built on careful selection rather than mass production. Every product we offer is chosen to reflect our values of quality, authenticity, and attention to detail.
              </p>
              <p>
                As we continue to grow, our focus remains the same: delivering products our customers can trust while creating an enjoyable shopping experience from start to finish.
              </p>
              <p>
                Sahari Hub isn&apos;t just about selling fashion—it&apos;s about helping every customer express confidence, celebrate traditions, and embrace modern style with ease.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Mission & Vision */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn delay={0.2}>
            <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-muted-gold" />
                <h2 className="font-headline-md text-primary">Our Mission</h2>
              </div>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                To provide thoughtfully curated handbags and women&apos;s ethnic wear that combine elegance, quality, affordability, and comfort while delivering an exceptional online shopping experience built on trust and customer satisfaction.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-muted-gold" />
                <h2 className="font-headline-md text-primary">Our Vision</h2>
              </div>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                To become one of India&apos;s most trusted fashion destinations by offering timeless collections, excellent customer service, and a seamless shopping journey that customers can rely on for years to come.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-16">
        <FadeIn delay={0.3}>
          <h2 className="font-headline-md text-primary text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Gem, label: "Quality First" },
              { icon: Users, label: "Customer Satisfaction" },
              { icon: IndianRupee, label: "Honest Pricing" },
              { icon: Shield, label: "Reliable Service" },
              { icon: Star, label: "Timeless Fashion" },
              { icon: RefreshCw, label: "Continuous Improvement" },
            ].map((value, i) => (
              <FadeIn key={value.label} delay={0.3 + i * 0.05}>
                <div className="bg-background border border-surface-container rounded-xl shadow-sm p-6 text-center">
                  <value.icon className="w-8 h-8 text-muted-gold mx-auto mb-3" />
                  <span className="font-label-md text-primary uppercase tracking-widest">{value.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Why Choose Us */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24">
        <FadeIn delay={0.35}>
          <h2 className="font-headline-md text-primary text-center mb-10">Why Choose Sahari Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Carefully Curated Collections", desc: "Every handbag and ethnic wear product is selected with attention to quality, craftsmanship, and design." },
              { title: "Premium Quality", desc: "We focus on products that are durable, comfortable, and made to last." },
              { title: "Secure Shopping", desc: "Enjoy a safe and secure shopping experience with trusted payment methods and transparent policies." },
              { title: "Reliable Customer Support", desc: "Our support team is available to assist you before, during, and after your purchase." },
              { title: "Customer-First Approach", desc: "Your satisfaction is our highest priority, and we continuously work to improve your shopping experience." },
              { title: "Trusted Service", desc: "From placing your order to doorstep delivery, we aim to make every step smooth, reliable, and hassle-free." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={0.35 + i * 0.05}>
                <div className="bg-background border border-surface-container rounded-xl shadow-sm p-6 h-full">
                  <h3 className="font-headline-md text-primary mb-3">{item.title}</h3>
                  <p className="font-body-md text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>
    </>
  );
}
