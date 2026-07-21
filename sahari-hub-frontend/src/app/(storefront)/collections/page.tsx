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
    <div className="min-h-screen pt-32 pb-24 px-4 flex flex-col items-center bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-16"
      >
        <span className="font-label-sm uppercase tracking-widest text-muted-gold mb-4 block">Curated Selection</span>
        <h1 className="font-display-lg text-primary leading-tight mb-6">Our Collections</h1>
        <p className="font-body-lg text-on-surface-variant">
          Explore our exclusive range of luxury women&apos;s handbags, designer dresses, and ethnic suits.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {collections.map((item) => (
          <Link 
            key={item.id} 
            href={item.href} 
            className="group block relative overflow-hidden rounded-2xl aspect-[3/4] bg-surface-container-low shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Background Image */}
            <Image 
              src={item.image} 
              alt={item.title}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 z-10 transition-opacity duration-500 group-hover:from-black/90"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
              <span className="text-xs uppercase tracking-widest text-muted-gold font-medium mb-1 opacity-90">
                {item.description}
              </span>
              <h2 className="font-display-md text-2xl text-white mb-4 group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                {item.title}
              </h2>
              <div className="flex items-center text-muted-gold font-label-md uppercase text-xs tracking-widest gap-2 group-hover:text-white transition-colors duration-300">
                Shop Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
