"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function InteractiveHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax effects on scroll
  const yText = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  
  // Smooth spring for mouse movement
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to center of screen [-1, 1]
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
      mouseX.set(x * 50); // Max 50px offset
      mouseY.set(y * 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative h-screen min-h-[700px] w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Animated Abstract Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 bg-surface-dim"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 bg-muted-gold"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Grid Overlay for Texture */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none"></div>

      {/* Main Content Area */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-7xl mx-auto"
        style={{ y: yText, opacity: opacityText }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.div 
            className="flex items-center gap-4 mb-4"
            style={{ x: useTransform(mouseX, (v) => v * 0.2), y: useTransform(mouseY, (v) => v * 0.2) }}
          >
            <div className="h-[1px] w-12 bg-muted-gold"></div>
            <span className="font-label-sm tracking-[0.3em] uppercase text-on-surface-variant">
              The Essence of Elegance
            </span>
            <div className="h-[1px] w-12 bg-muted-gold"></div>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="font-display-lg-mobile md:text-[6rem] lg:text-[8rem] text-primary leading-[0.9] tracking-tighter mix-blend-overlay mb-2"
            style={{ x: useTransform(mouseX, (v) => v * -0.5), y: useTransform(mouseY, (v) => v * -0.5) }}
          >
            <span className="block italic font-light text-muted-gold/80">Crafting</span>
            <span className="block font-medium">Timeless</span>
            <span className="block">Allure</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="font-body-lg text-on-surface-variant max-w-lg mx-auto mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Exclusive collections of luxury women&apos;s handbags. <br className="hidden md:block" /> 
            <span className="italic text-muted-gold">Curated ethnic suits launching soon.</span>
          </motion.p>

          {/* Magnetic Interactive CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/collections"
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-10 py-5 text-on-primary font-label-md uppercase tracking-widest transition-all hover:bg-muted-gold hover:text-primary hover:shadow-[0_0_40px_rgba(212,180,131,0.4)]"
            >
              <span className="relative z-10">Explore Collections</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="font-label-sm uppercase tracking-[0.2em] text-[10px]">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-muted-gold to-transparent"
          animate={{ height: ["0%", "100%", "0%"], y: [0, 20, 40] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
