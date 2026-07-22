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
    <footer className="bg-surface-container w-full py-12 mt-auto border-t border-outline-variant/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-gutter-desktop px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        
        {/* Brand */}
        <div className="col-span-1 flex flex-col justify-between items-start">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-3">
              <img 
                src="/logo.jpg" 
                alt="Sahari Hub Logo" 
                className="h-14 w-14 rounded-full object-cover shadow-sm border border-white/80 shrink-0" 
              />
              <span className="font-cinzel text-[#3A2C27] text-lg font-semibold tracking-widest">
                SAHARI HUB
              </span>
            </Link>
            <p className="text-xs text-on-surface-variant/80 font-medium max-w-xs leading-relaxed">
              Refined Luxury for the Modern Silhouette. Premium bags, dresses &amp; suits.
            </p>
          </div>

          <div className="font-body-md text-xs text-on-surface-variant opacity-80 mt-6 md:mt-0">
            © {new Date().getFullYear()} Sahari Hub. All Rights Reserved.
          </div>
        </div>

        {/* Links Grid */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
          
          {/* Company */}
          <div className="flex flex-col space-y-3">
            <span className="font-label-sm text-primary uppercase tracking-widest mb-1 font-bold text-xs">Company</span>
            <Link href="/story" className="font-body-md text-sm text-on-surface-variant hover:text-[#3A2C27] hover:underline transition-all opacity-80 hover:opacity-100">
              Brand Story
            </Link>
            <Link href="/contact" className="font-body-md text-sm text-on-surface-variant hover:text-[#3A2C27] hover:underline transition-all opacity-80 hover:opacity-100">
              Contact Us
            </Link>
            <a
              href="https://www.instagram.com/sahari.hub/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body-md text-sm text-on-surface-variant hover:text-[#3A2C27] transition-all opacity-80 hover:opacity-100"
            >
              <InstagramIcon className="w-4 h-4 text-[#3A2C27]" />
              <span>Instagram (@sahari.hub)</span>
            </a>
          </div>

          {/* Support */}
          <div className="flex flex-col space-y-3">
            <span className="font-label-sm text-primary uppercase tracking-widest mb-1 font-bold text-xs">Support &amp; Contact</span>
            <Link href="/shipping" className="font-body-md text-sm text-on-surface-variant hover:text-[#3A2C27] hover:underline transition-all opacity-80 hover:opacity-100">
              Shipping &amp; Returns
            </Link>
            <div className="flex items-center gap-2 font-body-md text-sm text-on-surface-variant opacity-80">
              <Phone className="w-4 h-4 text-muted-gold shrink-0" />
              <span>+91 87450 92024</span>
            </div>
            <div className="flex items-center gap-2 font-body-md text-sm text-on-surface-variant opacity-80">
              <Mail className="w-4 h-4 text-muted-gold shrink-0" />
              <a href="mailto:hubsahari@gmail.com" className="hover:text-[#3A2C27] transition-colors">hubsahari@gmail.com</a>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col space-y-3">
            <span className="font-label-sm text-primary uppercase tracking-widest mb-1 font-bold text-xs">Legal</span>
            <Link href="/privacy" className="font-body-md text-sm text-on-surface-variant hover:text-[#3A2C27] hover:underline transition-all opacity-80 hover:opacity-100">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-body-md text-sm text-on-surface-variant hover:text-[#3A2C27] hover:underline transition-all opacity-80 hover:opacity-100">
              Terms of Service
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
