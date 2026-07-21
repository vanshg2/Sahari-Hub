import { Award, ShieldCheck, Truck, HeadphonesIcon } from "lucide-react";

export function StoreFeatures() {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-[#D6A9A3] stroke-[1.5]" />,
      title: "PREMIUM QUALITY",
      description: "Finest materials & attention to detail"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#D6A9A3] stroke-[1.5]" />,
      title: "SECURE PAYMENT",
      description: "100% safe & secure checkout"
    },
    {
      icon: <Truck className="w-8 h-8 text-[#D6A9A3] stroke-[1.5]" />,
      title: "FAST DELIVERY",
      description: "Quick delivery across India"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-[#D6A9A3] stroke-[1.5]" />,
      title: "CUSTOMER SUPPORT",
      description: "We're here to help you always"
    }
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-8">
      <div className="bg-[#FAF8F7] rounded-xl px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 px-4 pt-4 sm:pt-0">
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h4 className="font-label-md text-xs tracking-widest text-[#3A2C27] font-bold mb-1">{feature.title}</h4>
                <p className="text-gray-500 text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
