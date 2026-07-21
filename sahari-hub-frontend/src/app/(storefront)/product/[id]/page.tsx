"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FadeIn } from "@/components/animations/FadeIn";
import { Heart, Star, ChevronRight, Truck, RefreshCw, Plus, Minus } from "lucide-react";
import { productsApi } from "@/lib/api";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

export default function ProductDetails() {
  const params = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!params.id) return;
    productsApi
      .get(params.id as string)
      .then((p) => {
        setProduct(p);
        setSelectedImage(0);
        return productsApi.related(p.id, 4);
      })
      .then(setRelatedProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="w-full px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="animate-pulse">
            <div className="aspect-[4/5] bg-surface-container-low rounded-xl" />
          </div>
          <div className="animate-pulse flex flex-col gap-4 pt-4 md:pt-12">
            <div className="h-8 w-3/4 bg-surface-container rounded" />
            <div className="h-6 w-1/4 bg-surface-container rounded" />
            <div className="h-20 w-full bg-surface-container rounded mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto py-24 text-center">
        <h1 className="font-display-lg text-primary mb-4">Product Not Found</h1>
        <Link href="/collections/bags" className="text-muted-gold underline">Back to Collections</Link>
      </div>
    );
  }

  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: primaryImage?.url || "",
        sku: product.sku,
        stockQuantity: product.stockQuantity,
      },
      quantity
    );
  };

  return (
    <>
      {/* Breadcrumbs */}
      <section className="w-full pt-8 pb-4 px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
        <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/collections/bags" className="hover:text-primary transition-colors">Bags</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary font-bold">{product.name}</span>
        </div>
      </section>

      {/* Product Main Section */}
      <section className="w-full px-gutter-mobile md:px-margin-desktop max-w-[1440px] mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Images */}
          <FadeIn className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden product-shadow">
              {primaryImage && (
                <Image
                  alt={product.images[selectedImage]?.altText || product.name}
                  className="w-full h-full object-cover"
                  src={product.images[selectedImage]?.url || primaryImage.url}
                  fill
                  priority
                />
              )}
              <button className="absolute top-4 right-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-white shadow-sm transition-all z-20">
                <Heart className="w-6 h-6" />
              </button>
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square bg-surface-container-low rounded-md overflow-hidden border transition-colors ${
                      selectedImage === i ? "border-muted-gold" : "border-transparent hover:border-muted-gold"
                    }`}
                  >
                    <Image alt={img.altText || `View ${i + 1}`} className="w-full h-full object-cover" src={img.url} fill />
                  </button>
                ))}
              </div>
            )}
          </FadeIn>

          {/* Right: Product Info */}
          <FadeIn delay={0.2} className="flex flex-col pt-4 md:pt-12">
            <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-2">{product.name}</h1>
            <p className="font-headline-md text-primary mb-4">{formatPrice(product.price)}</p>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="font-body-md text-on-surface-variant line-through mb-4">{formatPrice(product.compareAtPrice)}</p>
            )}

            <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">{product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="font-label-md text-primary uppercase">Quantity</span>
                <div className="flex items-center gap-4 border border-outline-variant rounded-full px-4 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-on-surface-variant hover:text-primary"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-label-md text-primary w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="text-on-surface-variant hover:text-primary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="font-label-sm text-on-surface-variant">
                  {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="w-full bg-primary text-white font-label-md uppercase tracking-widest py-4 hover:bg-secondary transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <Link
                href="/checkout"
                className="w-full text-center bg-transparent text-primary border border-primary font-label-md uppercase tracking-widest py-4 hover:bg-surface-container-low transition-colors"
              >
                Checkout Now
              </Link>
            </div>

            {/* Guarantees */}
            <div className="flex flex-col gap-6 pt-8 border-t border-surface-container">
              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 text-muted-gold flex-shrink-0" />
                <div>
                  <h4 className="font-label-md text-primary uppercase tracking-widest mb-1">Free Premium Shipping</h4>
                  <p className="font-body-md text-on-surface-variant text-sm">Complimentary express delivery on all orders over ₹2,000.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <RefreshCw className="w-6 h-6 text-muted-gold flex-shrink-0" />
                <div>
                  <h4 className="font-label-md text-primary uppercase tracking-widest mb-1">30-Day Returns</h4>
                  <p className="font-body-md text-on-surface-variant text-sm">Seamless returns via our concierge service.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto bg-surface-container-low">
          <FadeIn className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">You May Also Like</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p, i) => (
              <FadeIn key={p.id} delay={(i + 1) * 0.1}>
                <div className="group flex flex-col gap-4">
                  <Link href={`/product/${p.id}`} className="relative aspect-[4/5] bg-surface-container-low rounded-lg overflow-hidden block">
                    {p.images?.[0] && (
                      <Image alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={p.images[0].url} fill />
                    )}
                  </Link>
                  <div className="flex flex-col items-center text-center gap-1">
                    <h3 className="font-headline-md text-headline-md text-primary">
                      <Link href={`/product/${p.id}`}>{p.name}</Link>
                    </h3>
                    <p className="font-body-md text-body-md text-primary font-medium">{formatPrice(p.price)}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
