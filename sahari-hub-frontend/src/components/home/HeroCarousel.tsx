"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    tag: "New Collection",
    title: "EFFORTLESS STYLE,",
    subtitle: "Everyday You ♡",
    description: "Premium Bags & Elegant Suits",
    link: "/collections",
    linkText: "Shop Now",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&q=80&w=1000",
    bgColor: "bg-[#F3EBE7]",
    tagColor: "bg-[#D6A9A3]",
  },
  {
    tag: "Just Arrived",
    title: "MODERN ELEGANCE,",
    subtitle: "Redefined ✨",
    description: "The New Suits Collection",
    link: "/collections/suits",
    linkText: "Discover Suits",
    image: "/suit.jpg",
    bgColor: "bg-[#EAE9EB]",
    tagColor: "bg-[#A3B1D6]",
  },
  {
    tag: "Exclusive",
    title: "TIMELESS GLAMOUR,",
    subtitle: "Unveiled 🌟",
    description: "Our Premium Dresses",
    link: "/collections/dresses",
    linkText: "Explore Dresses",
    image: "/dress.png",
    bgColor: "bg-[#F3E7ED]",
    tagColor: "bg-[#D6A3BA]",
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToSlide = (index: number) => setCurrentSlide(index);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 md:px-margin-desktop py-2 md:py-3">
      <div className={`relative w-full h-[380px] sm:h-[420px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden transition-colors duration-700 flex items-center justify-between ${slides[currentSlide].bgColor}`}>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 z-30 w-8 h-8 md:w-9 md:h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-gray-700 hover:text-black hover:bg-white transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 z-30 w-8 h-8 md:w-9 md:h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-gray-700 hover:text-black hover:bg-white transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Content */}
        <div className="relative z-10 w-full h-full">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between px-5 sm:px-10 md:px-16 lg:px-20 transition-all duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-8 z-0 pointer-events-none"
              }`}
            >
              
              {/* Text Side */}
              <div className="flex-1 flex flex-col items-start justify-center pt-4 sm:pt-6 md:pt-0 z-10 w-full">
                <span className={`inline-block px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-wider text-white rounded-full uppercase mb-1.5 sm:mb-2.5 ${slide.tagColor}`}>
                  {slide.tag}
                </span>
                
                <h1 className="font-display-lg text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#3A2C27] leading-tight mb-1">
                  {slide.title}
                </h1>
                <h2 className="font-display-lg italic text-xl sm:text-3xl md:text-4xl lg:text-4xl text-[#3A2C27] font-light mb-2 sm:mb-3 flex items-center gap-2">
                  {slide.subtitle}
                </h2>
                
                <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-2 sm:mb-4 font-medium">
                  {slide.description}
                </p>
                
                <Link 
                  href={slide.link}
                  className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#3A2C27] text-white text-xs sm:text-xs font-semibold tracking-widest uppercase hover:bg-black transition-colors rounded-sm shadow-md hover:shadow-lg mb-2 md:mb-0"
                >
                  {slide.linkText}
                </Link>
              </div>

              {/* Image Side */}
              <div className="flex-1 relative w-full h-[180px] sm:h-[220px] md:h-full flex items-center justify-center p-2 sm:p-3 md:p-6 pb-6 md:pb-8">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-white/70 backdrop-blur-md border border-white/80 p-2 sm:p-3 flex items-center justify-center">
                  <Image 
                    src={slide.image} 
                    alt={slide.title} 
                    fill
                    className={`object-contain transition-transform duration-700 ${
                      index === currentSlide ? "scale-100" : "scale-95"
                    }`}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-30">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? `${slide.tagColor} w-6` : "bg-gray-400/60 w-2 hover:opacity-100"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
