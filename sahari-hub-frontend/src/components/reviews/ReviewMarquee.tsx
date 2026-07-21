"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { reviewsApi } from "@/lib/api";

interface Review {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  text: string;
  product: string | null;
}

const fallbackReviews: Review[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The craftsmanship on my burgundy tote is absolutely stunning. Every stitch is perfect. I receive compliments every time I carry it.",
    product: "Classic Burgundy Tote",
  },
  {
    id: "2",
    name: "Ananya Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "Ordered the silk suit for a wedding. The fabric quality exceeded my expectations. Will definitely order again!",
    product: "Heritage Silk Suit",
  },
  {
    id: "3",
    name: "Meera Joshi",
    location: "Delhi",
    rating: 5,
    text: "Fast delivery and the bag looks even better in person. The leather is soft and premium. Worth every rupee.",
    product: "Noir Leather Clutch",
  },
  {
    id: "4",
    name: "Kavya Nair",
    location: "Bangalore",
    rating: 5,
    text: "I've been looking for a good ethnic suit collection for so long. Sahari Hub finally fills that gap. Beautiful designs!",
    product: "Pearl Anarkali Set",
  },
  {
    id: "5",
    name: "Ritu Agarwal",
    location: "Jaipur",
    rating: 4,
    text: "The gold chain necklace is delicate and elegant. Perfect for daily wear. Packaging was also very premium.",
    product: "Gold Chain Necklace",
  },
  {
    id: "6",
    name: "Sneha Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Customer service was amazing. They helped me pick the right size and the return process was hassle-free. Highly recommend!",
    product: "Classic Burgundy Tote",
  },
  {
    id: "7",
    name: "Deepa Iyer",
    location: "Chennai",
    rating: 5,
    text: "Bought the complete suit set for Diwali. The color, fit, and material are all top-notch. Truly luxury fashion.",
    product: "Heritage Silk Suit",
  },
  {
    id: "8",
    name: "Nisha Gupta",
    location: "Lucknow",
    rating: 5,
    text: "This is my third purchase from Sahari Hub. Consistent quality every single time. The bags are my absolute favorite.",
    product: "Noir Leather Clutch",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "text-muted-gold fill-muted-gold" : "text-outline-variant/30"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-[380px] bg-background border border-surface-container rounded-xl p-6 mx-3 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <StarRating rating={review.rating} />
      <p className="font-body-md text-on-surface leading-relaxed line-clamp-3">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container">
        <div>
          <p className="font-label-md text-primary">{review.name}</p>
          <p className="font-body-sm text-on-surface-variant">{review.location}</p>
        </div>
        {review.product && (
          <span className="font-label-sm text-muted-gold bg-muted-gold/10 px-3 py-1 rounded-full">
            {review.product}
          </span>
        )}
      </div>
    </div>
  );
}

export function ReviewMarquee() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);

  useEffect(() => {
    reviewsApi.active().then((data) => {
      if (data && data.length > 0) {
        setReviews(data);
      }
    }).catch(() => {});
  }, []);

  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-16 overflow-hidden bg-surface-container-low">
      <div className="text-center mb-10 px-4">
        <span className="font-label-sm text-label-sm tracking-[0.2em] uppercase text-muted-gold mb-3 block">
          What Our Customers Say
        </span>
        <h2 className="font-headline-lg text-headline-lg text-primary">
          Loved by Thousands
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-container-low to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-container-low to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {doubled.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
