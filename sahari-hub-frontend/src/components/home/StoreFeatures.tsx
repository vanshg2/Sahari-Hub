import { Award, ShieldCheck, Truck, HeadphonesIcon } from "lucide-react";

export function StoreFeatures() {
  const features = [
    {
      icon: <Award className="w-7 h-7 text-[#D6A9A3] stroke-[1.5]" />,
      title: "PREMIUM CRAFTSMANSHIP",
      description: "Finest materials & meticulous detail"
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#D6A9A3] stroke-[1.5]" />,
      title: "SECURE PAYMENTS",
      description: "Razorpay & Cash on Delivery"
    },
    {
      icon: <Truck className="w-7 h-7 text-[#D6A9A3] stroke-[1.5]" />,
      title: "EXPRESS SHIPPING",
      description: "Fast delivery across India"
    },
    {
      icon: <HeadphonesIcon className="w-7 h-7 text-[#D6A9A3] stroke-[1.5]" />,
      title: "DEDICATED SUPPORT",
      description: "WhatsApp & Email concierge"
    }
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12">
      <div className="bg-[#FAF8F5] border border-[#EAE3DC] rounded-2xl px-6 py-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#EAE3DC]">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 px-4 pt-4 sm:pt-0 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-[#EAE3DC] flex items-center justify-center shadow-sm group-hover:border-[#D6A9A3] transition-colors">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-cinzel text-xs tracking-[0.15em] text-[#3A2C27] font-semibold mb-0.5">{feature.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
