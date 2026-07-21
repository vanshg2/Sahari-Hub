"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { productsApi, categoriesApi } from "@/lib/api";
import { Product, Category } from "@/lib/types";
import { ImageUploader, ProductImage } from "@/components/admin/ImageUploader";

export default function AdminEditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    isPublished: true,
  });

  useEffect(() => {
    Promise.all([
      productsApi.get(id),
      categoriesApi.list(),
    ]).then(([prod, cats]) => {
      setProduct(prod);
      setCategories(Array.isArray(cats) ? cats : []);
      setForm({
        name: prod.name,
        sku: prod.sku,
        description: prod.description,
        price: String(prod.price),
        compareAtPrice: prod.compareAtPrice ? String(prod.compareAtPrice) : "",
        stockQuantity: String(prod.stockQuantity),
        categoryId: prod.categoryId,
        isPublished: prod.isPublished,
      });
      // Map existing product images to the uploader format
      if (prod.images && prod.images.length > 0) {
        setImages(
          prod.images.map((img, i) => ({
            url: img.url,
            altText: img.altText || prod.name,
            isPrimary: img.isPrimary,
            order: img.order ?? i,
          }))
        );
      }
    }).catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name,
        sku: form.sku,
        slug: slugify(form.name),
        description: form.description,
        price: parseFloat(form.price) || 0,
        compareAtPrice: form.compareAtPrice ? parseFloat(form.compareAtPrice) : undefined,
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
      await productsApi.update(id, payload);
      router.push("/admin/products");
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await productsApi.delete(id);
      router.push("/admin/products");
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface-container rounded w-48" />
          <div className="h-96 bg-surface-container rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="font-display-lg-mobile text-primary">Edit Product</h1>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 text-error hover:bg-error-container/20 rounded-lg transition-colors font-label-md"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-background border border-surface-container rounded-xl shadow-sm p-8 flex flex-col gap-8">
        {/* Basic Info */}
        <div className="flex flex-col gap-4">
          <h2 className="font-headline-md text-primary border-b border-surface-container pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Product Name *</label>
              <input type="text" name="name" required value={form.name} onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">SKU *</label>
              <input type="text" name="sku" required value={form.sku} onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Category *</label>
              <select name="categoryId" required value={form.categoryId} onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors">
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
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors">
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Description *</label>
              <textarea name="description" rows={4} required value={form.description} onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="flex flex-col gap-4">
          <h2 className="font-headline-md text-primary border-b border-surface-container pb-2">Pricing &amp; Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Price (₹) *</label>
              <input type="number" name="price" required min="0" step="0.01" value={form.price} onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Compare at Price (₹)</label>
              <input type="number" name="compareAtPrice" min="0" step="0.01" value={form.compareAtPrice} onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Stock Quantity</label>
              <input type="number" name="stockQuantity" min="0" value={form.stockQuantity} onChange={handleChange}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors" />
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

        <div className="flex justify-end gap-4 mt-4 pt-8 border-t border-surface-container">
          <Link href="/admin/products" className="bg-transparent text-primary border border-primary px-8 py-3 rounded-DEFAULT font-label-md uppercase tracking-widest hover:bg-surface-container-low transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-DEFAULT font-label-md uppercase tracking-widest hover:bg-secondary transition-colors shadow-sm disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
