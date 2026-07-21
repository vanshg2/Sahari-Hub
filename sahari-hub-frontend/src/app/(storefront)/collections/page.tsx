"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
          Explore our exclusive range of luxury women's handbags. Ethnic suits are launching soon.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        <Link href="/collections/bags" className="group block relative overflow-hidden rounded-xl aspect-square bg-surface-container-low shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
          <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
            <h2 className="font-display-md text-white mb-2 group-hover:-translate-y-2 transition-transform duration-500 ease-out">Luxury Bags</h2>
            <div className="flex items-center text-muted-gold font-label-md uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 ease-out">
              Shop Now <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
        <Link href="/collections/suits" className="group block relative overflow-hidden rounded-xl aspect-square bg-surface-container-low shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
          <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
            <h2 className="font-display-md text-white mb-2 group-hover:-translate-y-2 transition-transform duration-500 ease-out">Ethnic Suits</h2>
            <div className="flex items-center text-muted-gold font-label-md uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 ease-out">
              Shop Now <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
