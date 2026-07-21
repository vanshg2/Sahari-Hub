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
    <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 md:px-margin-desktop py-3 md:py-6">
      <div className={`relative w-full h-[580px] sm:h-[620px] md:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden transition-colors duration-700 flex items-center justify-between ${slides[currentSlide].bgColor}`}>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-8 z-30 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-gray-700 hover:text-black hover:bg-white transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-8 z-30 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-gray-700 hover:text-black hover:bg-white transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 w-full h-full">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between px-5 sm:px-12 md:px-24 transition-all duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-8 z-0 pointer-events-none"
              }`}
            >
              
              {/* Text Side */}
              <div className="flex-1 flex flex-col items-start justify-center pt-6 sm:pt-10 md:pt-0 z-10 w-full">
                <span className={`inline-block px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-wider text-white rounded-full uppercase mb-2 sm:mb-4 ${slide.tagColor}`}>
                  {slide.tag}
                </span>
                
                <h1 className="font-display-lg text-2xl sm:text-4xl md:text-6xl text-[#3A2C27] leading-tight mb-1 sm:mb-2">
                  {slide.title}
                </h1>
                <h2 className="font-display-lg italic text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#3A2C27] font-light mb-2 sm:mb-5 flex items-center gap-2">
                  {slide.subtitle}
                </h2>
                
                <p className="text-gray-700 text-xs sm:text-base md:text-lg mb-3 sm:mb-6 font-medium">
                  {slide.description}
                </p>
                
                <Link 
                  href={slide.link}
                  className="px-5 py-2 sm:px-8 sm:py-3 bg-[#3A2C27] text-white text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-black transition-colors rounded-sm shadow-md hover:shadow-lg mb-2 md:mb-0"
                >
                  {slide.linkText}
                </Link>
              </div>

              {/* Image Side */}
              <div className="flex-1 relative w-full h-[260px] sm:h-[320px] md:h-full flex items-center justify-center p-2 sm:p-4 md:p-10 pb-8 md:pb-12">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-white/70 backdrop-blur-md border border-white/80 p-3 sm:p-5 flex items-center justify-center">
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
        <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-30">
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
