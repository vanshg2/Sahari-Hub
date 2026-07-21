import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-container w-full py-8 mt-auto border-t border-outline-variant/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-gutter-desktop px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1 flex flex-col justify-between items-start">
          <Link href="/" className="flex items-center justify-center -ml-4 md:-ml-2 mb-4">
            <img src="/logo.jpg" alt="Sahari Hub Logo" className="h-12 w-auto mix-blend-multiply" />
          </Link>
          <div className="font-body-md text-xs text-on-surface-variant opacity-80 mt-auto">
            © {new Date().getFullYear()} Sahari Hub. All Rights Reserved.
          </div>
        </div>

        {/* Links */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col space-y-3">
            <span className="font-label-sm text-primary uppercase tracking-widest mb-1">Company</span>
            <Link href="/story" className="font-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all opacity-80 hover:opacity-100">
              Brand Story
            </Link>
            <Link href="/contact" className="font-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all opacity-80 hover:opacity-100">
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <span className="font-label-sm text-primary uppercase tracking-widest mb-1">Support</span>
            <Link href="/shipping" className="font-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all opacity-80 hover:opacity-100">
              Shipping &amp; Returns
            </Link>
            <div className="flex items-center gap-2 font-body-md text-on-surface-variant opacity-80">
              <Phone className="w-4 h-4 text-muted-gold shrink-0" />
              <span>+91 87450 92024</span>
            </div>
            <div className="flex items-center gap-2 font-body-md text-on-surface-variant opacity-80">
              <Mail className="w-4 h-4 text-muted-gold shrink-0" />
              <a href="mailto:hubsahari@gmail.com" className="hover:text-secondary transition-colors">hubsahari@gmail.com</a>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <span className="font-label-sm text-primary uppercase tracking-widest mb-1">Legal</span>
            <Link href="/privacy" className="font-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all opacity-80 hover:opacity-100">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-body-md text-on-surface-variant hover:text-secondary hover:underline transition-all opacity-80 hover:opacity-100">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
