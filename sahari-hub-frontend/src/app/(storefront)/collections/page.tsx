"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "bags",
    title: "Luxury Bags",
    description: "Handcrafted premium leather bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
    href: "/collections/bags",
  },
  {
    id: "dresses",
    title: "Designer Dresses",
    description: "Corset & two-piece ensembles",
    image: "/dress.png",
    href: "/collections/dresses",
  },
  {
    id: "suits",
    title: "Ethnic Suits",
    description: "Curated traditional ethnic wear",
    image: "/suit.jpg",
    href: "/collections/suits",
  },
];

export default function CollectionsIndex() {
  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 px-4 flex flex-col items-center bg-[#FAF8F5]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-16"
      >
        <span className="font-label-sm uppercase tracking-[0.3em] text-[#D6A9A3] font-bold text-xs md:text-sm mb-3 block">
          Curated Selection
        </span>
        <h1 className="font-cinzel text-3xl md:text-5xl text-[#3A2C27] font-semibold tracking-wide mb-4">
          Our Collections
        </h1>
        <div className="w-16 h-0.5 bg-[#D6A9A3] mx-auto mb-6"></div>
        <p className="font-body-lg text-gray-600 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
          Explore our exclusive range of luxury women&apos;s handbags, designer dresses, and ethnic suits.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
        {collections.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
          >
            <Link 
              href={item.href} 
              className="group block relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#F5F2ED] border border-[#EAE3DC] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/90 backdrop-blur-md text-[#3A2C27] font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm border border-white/50">
                  {item.id.toUpperCase()}
                </span>
              </div>

              {/* Background Image */}
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />

              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/90 via-[#1A1412]/40 to-transparent z-10 transition-opacity duration-500 group-hover:from-[#1A1412]/95"></div>

              {/* Content Container */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
                <h2 className="font-cinzel text-2xl md:text-3xl text-white font-semibold mb-1 group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm text-[#EAE3DC] font-light mb-5 line-clamp-1">
                  {item.description}
                </p>

                <div className="inline-flex items-center self-start gap-2 bg-[#3A2C27]/80 group-hover:bg-[#D6A9A3] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg border border-white/20 transition-all duration-300 shadow-sm">
                  Explore Collection <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
