"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchOverlay } from "@/components/SearchOverlay";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/collections/bags", label: "Bags" },
    { href: "/collections/dresses", label: "Dresses" },
    { href: "/collections/suits", label: "Suits" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 border-b border-outline-variant/30 ${
          scrolled ? "bg-surface-container/95 backdrop-blur-md shadow-sm" : "bg-surface-container/90 backdrop-blur-md"
        }`}
      >
        <div className="flex justify-between items-center px-gutter-mobile md:px-margin-desktop h-20 max-w-[1440px] mx-auto">
          
          {/* Menu Toggle (Always Visible for Luxury Feel) */}
          <div className="flex-1 flex justify-start">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-primary p-2 hover:bg-surface-container-low/50 rounded-full transition-all duration-200 flex items-center gap-2 group"
            >
              <Menu className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="hidden md:block text-[10px] font-bold tracking-[0.25em] uppercase mt-[2px]">MENU</span>
            </button>
          </div>
          
          {/* Brand - Centered */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center justify-center gap-3">
              <img src="/logo.jpg" alt="Sahari Hub Logo" className="h-16 w-auto mix-blend-multiply" />
              <span className="font-display-lg text-[#3A2C27] text-2xl font-semibold tracking-widest hidden sm:block">
                SAHARI HUB
              </span>
            </Link>
          </div>
          
          {/* Trailing Icons */}
          <div className="flex-1 flex justify-end items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-primary hover:bg-surface-container-low/50 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="p-2 text-primary hover:bg-surface-container-low/50 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center relative">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#3A2C27] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div 
          className={`absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-surface-container">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-display-lg-mobile text-primary text-xl">
              Sahari Hub
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container-low transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 p-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 font-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
