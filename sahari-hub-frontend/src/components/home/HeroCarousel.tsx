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
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=1000",
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
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-6">
      <div className={`relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden transition-colors duration-700 flex items-center justify-between ${slides[currentSlide].bgColor}`}>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 md:left-8 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-gray-700 hover:text-black hover:bg-white transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-4 md:right-8 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-gray-700 hover:text-black hover:bg-white transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 w-full h-full">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between px-12 md:px-24 transition-all duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-8 z-0 pointer-events-none"
              }`}
            >
              
              <div className="flex-1 flex flex-col items-start justify-center pt-16 md:pt-0">
                <span className={`inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-white rounded-full uppercase ${slide.tagColor}`}>
                  {slide.tag}
                </span>
                
                <h1 className="font-display-lg text-4xl md:text-6xl text-[#3A2C27] leading-tight mb-2">
                  {slide.title}
                </h1>
                <h2 className="font-display-lg italic text-4xl md:text-5xl lg:text-6xl text-[#3A2C27] font-light mb-6 flex items-center gap-2">
                  {slide.subtitle}
                </h2>
                
                <p className="text-gray-700 text-lg mb-8 font-medium">
                  {slide.description}
                </p>
                
                <Link 
                  href={slide.link}
                  className="px-8 py-3 bg-[#3A2C27] text-white text-sm font-semibold tracking-widest uppercase hover:bg-black transition-colors rounded-sm shadow-md hover:shadow-lg"
                >
                  {slide.linkText}
                </Link>
              </div>

              <div className="flex-1 relative w-full h-[300px] md:h-full flex items-center justify-end md:justify-center p-4 md:p-12">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src={slide.image} 
                    alt={slide.title} 
                    fill
                    className={`object-cover object-center transition-transform duration-1000 ${
                      index === currentSlide ? "scale-100" : "scale-110"
                    }`}
                  />
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? `${slide.tagColor} w-6` : "bg-gray-400 opacity-60 hover:opacity-100"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
