import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "BAGS",
    subtitle: "Stylish & Functional",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=400",
    href: "/collections/bags",
  },
  {
    title: "DRESSES",
    subtitle: "Corset, Two Pieces",
    image: "/dress.png",
    href: "/collections/dresses",
  },
  {
    title: "SUITS",
    subtitle: "Elegant Ethnic Wear",
    image: "/suit.jpg",
    href: "/collections/suits",
  },
];

export function CategoryCards() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-2 md:py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        {categories.map((category, idx) => (
          <div 
            key={idx} 
            className="group relative bg-[#F5F2ED] rounded-2xl overflow-hidden flex items-center h-32 sm:h-36 md:h-40 cursor-pointer transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md"
          >
            {/* Image side */}
            <div className="relative w-2/5 h-full">
              <Image 
                src={category.image} 
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
              />
            </div>
            
            {/* Text side */}
            <div className="w-3/5 p-4 sm:p-5 flex flex-col justify-center">
              <h3 className="font-display-lg text-xl md:text-2xl text-[#3A2C27] mb-0.5">{category.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm mb-2 sm:mb-3 font-medium">{category.subtitle}</p>
              
              <Link 
                href={category.href}
                className="inline-flex items-center text-xs font-bold tracking-widest text-[#3A2C27] uppercase group-hover:text-black"
              >
                SHOP NOW <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
