import Link from "next/link";
import { Mail, Phone } from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1A1412] text-white w-full pt-16 pb-8 mt-auto border-t border-[#3A2C27]">
      <div className="px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="Sahari Hub Logo" 
                className="h-14 w-14 rounded-full object-cover shadow-md border-2 border-[#D6A9A3] shrink-0" 
              />
              <span className="font-cinzel text-white text-xl font-semibold tracking-[0.2em]">
                SAHARI HUB
              </span>
            </Link>
            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs">
              Refined Luxury for the Modern Silhouette. Thoughtfully curated handbags, designer dresses, and traditional ethnic suits.
            </p>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Company */}
            <div className="flex flex-col space-y-3">
              <span className="font-cinzel text-[#D6A9A3] uppercase tracking-[0.2em] mb-1 font-bold text-xs">Company</span>
              <Link href="/story" className="text-sm text-gray-300 hover:text-white transition-colors">
                Brand Story
              </Link>
              <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
              <a
                href="https://www.instagram.com/sahari.hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#D6A9A3]" />
                <span>Instagram</span>
              </a>
            </div>

            {/* Support */}
            <div className="flex flex-col space-y-3">
              <span className="font-cinzel text-[#D6A9A3] uppercase tracking-[0.2em] mb-1 font-bold text-xs">Customer Concierge</span>
              <Link href="/shipping" className="text-sm text-gray-300 hover:text-white transition-colors">
                Shipping &amp; Returns Policy
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-[#D6A9A3] shrink-0" />
                <span>+91 87450 92024</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-[#D6A9A3] shrink-0" />
                <a href="mailto:hubsahari@gmail.com" className="hover:text-white transition-colors">hubsahari@gmail.com</a>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col space-y-3">
              <span className="font-cinzel text-[#D6A9A3] uppercase tracking-[0.2em] mb-1 font-bold text-xs">Policies</span>
              <Link href="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#3A2C27] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Sahari Hub. All Rights Reserved.</p>
          <p className="text-[11px] text-gray-500">Crafted with Elegance &bull; Designed for You</p>
        </div>
      </div>
    </footer>
  );
}
