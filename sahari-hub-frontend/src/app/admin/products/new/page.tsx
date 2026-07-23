"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { productsApi, categoriesApi } from "@/lib/api";
import { Category } from "@/lib/types";
import { ImageUploader, ProductImage } from "@/components/admin/ImageUploader";

export default function AdminNewProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<ProductImage[]>([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    compareAtPrice: "",
    stockQuantity: "",
    categoryId: "",
    badge: "",
    isPublished: true,
  });

  useEffect(() => {
    categoriesApi.list().then((res) => setCategories(Array.isArray(res) ? res : [])).catch(() => {});
  }, []);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        sku: form.sku,
        slug: slugify(form.name),
        description: form.description,
        price: parseFloat(form.price) || 0,
        compareAtPrice: form.compareAtPrice ? parseFloat(form.compareAtPrice) : undefined,
        badge: form.badge || undefined,
        stockQuantity: form.stockQuantity ? parseInt(form.stockQuantity) : undefined,
        categoryId: form.categoryId,
        isPublished: form.isPublished,
        images: images.map((img, i) => ({
          url: img.url,
          altText: img.altText || form.name,
          isPrimary: img.isPrimary,
          order: i,
        })),
      };

      await productsApi.create(payload);
      router.push("/admin/products");
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-display-lg-mobile text-primary">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-background border border-surface-container rounded-xl shadow-sm p-8 flex flex-col gap-8">
        {/* Basic Info */}
        <div className="flex flex-col gap-4">
          <h2 className="font-headline-md text-primary border-b border-surface-container pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Product Name *</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                placeholder="Enter product name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">SKU *</label>
              <input
                type="text"
                name="sku"
                required
                value={form.sku}
                onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                placeholder="e.g. SH-BAG-001"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Category *</label>
              <select
                name="categoryId"
                required
                value={form.categoryId}
                onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Status</label>
              <select
                name="isPublished"
                value={form.isPublished ? "true" : "false"}
                onChange={(e) => setForm({ ...form, isPublished: e.target.value === "true" })}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
              >
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Description *</label>
              <textarea
                name="description"
                rows={4}
                required
                value={form.description}
                onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                placeholder="Enter product description"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="flex flex-col gap-4">
          <h2 className="font-headline-md text-primary border-b border-surface-container pb-2">Pricing &amp; Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Price (₹) *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                placeholder="0.00"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Compare at Price (₹)</label>
              <input
                type="number"
                name="compareAtPrice"
                min="0"
                step="0.01"
                value={form.compareAtPrice}
                onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                placeholder="0.00"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                min="0"
                value={form.stockQuantity}
                onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                placeholder="0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Product Tag / Badge</label>
              <select
                name="badge"
                value={form.badge}
                onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
              >
                <option value="">None</option>
                <option value="SALE">SALE</option>
                <option value="NEW ARRIVAL">NEW ARRIVAL</option>
                <option value="BEST SELLER">BEST SELLER</option>
                <option value="LIMITED EDITION">LIMITED EDITION</option>
                <option value="FEATURED">FEATURED</option>
                <option value="TRENDING">TRENDING</option>
              </select>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="flex flex-col gap-4">
          <h2 className="font-headline-md text-primary border-b border-surface-container pb-2">Product Images</h2>
          <p className="font-body-sm text-on-surface-variant">
            Upload images or paste URLs. Click the star icon to set the main image shown first.
          </p>
          <ImageUploader images={images} onChange={setImages} productName={form.name} />
        </div>

        {error && <p className="text-error font-body-md text-sm">{error}</p>}

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-4 pt-8 border-t border-surface-container">
          <Link href="/admin/products" className="bg-transparent text-primary border border-primary px-8 py-3 rounded-DEFAULT font-label-md uppercase tracking-widest hover:bg-surface-container-low transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-DEFAULT font-label-md uppercase tracking-widest hover:bg-secondary transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
