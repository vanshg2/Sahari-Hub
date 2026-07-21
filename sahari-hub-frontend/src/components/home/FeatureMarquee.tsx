import { Star, Truck, Gift, Sparkles } from "lucide-react";

export function FeatureMarquee() {
  const items = [
    { icon: <Star className="w-4 h-4 fill-current" />, text: "BEST SELLERS" },
    { icon: <Truck className="w-4 h-4" />, text: "FREE SHIPPING ACROSS INDIA" },
    { icon: <Gift className="w-4 h-4" />, text: "EASY RETURNS" },
    { icon: <Sparkles className="w-4 h-4" />, text: "NEW COLLECTION EVERY WEEK" },
  ];

  return (
    <div className="w-full bg-[#D6A9A3] py-3 overflow-hidden flex whitespace-nowrap">
      <div className="animate-marquee inline-flex items-center gap-8 text-white font-bold text-sm tracking-widest">
        {/* Render the items twice for seamless looping */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="inline-flex items-center gap-8">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
                <span className="mx-4 text-white/50 font-normal">|</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
