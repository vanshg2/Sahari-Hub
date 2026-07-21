"use client";

import { ShoppingBag } from "lucide-react";

export function ProductCardSkeleton() {
  return (
    <article className="group flex flex-col gap-4 animate-pulse">
      <div className="relative aspect-[4/5] bg-surface-container-low rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-outline-variant/30" />
        </div>
      </div>
      <div className="flex flex-col items-center text-center gap-2">
        <div className="h-3 w-16 bg-surface-container rounded" />
        <div className="h-5 w-40 bg-surface-container rounded" />
        <div className="h-4 w-20 bg-surface-container rounded" />
      </div>
    </article>
  );
}
