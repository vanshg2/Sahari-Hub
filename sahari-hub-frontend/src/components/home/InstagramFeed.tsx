import Image from "next/image";

export function InstagramFeed() {
  const images = [
    "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=400",
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-12 mb-8">
      <div className="text-center mb-8">
        <h2 className="font-display-lg text-2xl md:text-3xl text-[#3A2C27] tracking-wider mb-2 uppercase">
          Follow Us On Instagram
        </h2>
        <p className="text-[#D6A9A3] font-medium">@sahari.hub</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((src, idx) => (
          <div key={idx} className={`relative aspect-[4/5] rounded-xl overflow-hidden group ${idx === 4 ? 'hidden md:block' : ''}`}>
            <Image 
              src={src} 
              alt="Instagram Post" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              {/* Could add instagram icon here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
