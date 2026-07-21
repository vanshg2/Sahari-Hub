"use client";

import { useState, useEffect } from "react";
import { reviewsApi } from "@/lib/api";
import { Star, Plus, Trash2, Eye, EyeOff, X } from "lucide-react";

interface Review {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  text: string;
  product: string | null;
  isActive: boolean;
  createdAt: string;
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="p-0.5 transition-colors"
        >
          <Star className={`w-5 h-5 ${n <= value ? "text-muted-gold fill-muted-gold" : "text-outline-variant/30 hover:text-muted-gold"}`} />
        </button>
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: 5,
    text: "",
    product: "",
    isActive: true,
  });

  const fetchReviews = async () => {
    try {
      const data = await reviewsApi.list();
      setReviews(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReviews();
  }, []);

  const resetForm = () => {
    setForm({ name: "", location: "", rating: 5, text: "", product: "", isActive: true });
    setError("");
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await reviewsApi.create({
        name: form.name,
        location: form.location || undefined,
        rating: form.rating,
        text: form.text,
        product: form.product || undefined,
        isActive: form.isActive,
      });
      resetForm();
      fetchReviews();
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to add review");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (review: Review) => {
    try {
      await reviewsApi.update(review.id, { isActive: !review.isActive });
      setReviews((prev) =>
        prev.map((r) => (r.id === review.id ? { ...r, isActive: !r.isActive } : r))
      );
    } catch {
      /* ignore */
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      await reviewsApi.delete(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display-lg-mobile text-primary">Reviews</h1>
          <p className="font-body-md text-on-surface-variant mt-1">
            Manage customer reviews shown on the homepage
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 font-label-md uppercase tracking-widest hover:bg-secondary transition-colors shadow-sm"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Review"}
        </button>
      </div>

      {/* Add Review Form */}
      {showForm && (
        <div className="bg-background border border-surface-container rounded-xl shadow-sm p-8">
          <h2 className="font-headline-md text-primary mb-6">New Review</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                  placeholder="e.g. Priya Sharma"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                  placeholder="e.g. Mumbai"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Rating *</label>
                <StarInput value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Product</label>
                <input
                  type="text"
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors"
                  placeholder="e.g. Classic Burgundy Tote"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label-sm uppercase tracking-widest text-on-surface-variant">Review Text *</label>
              <textarea
                rows={3}
                required
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="w-full p-4 bg-surface-container-low border border-outline-variant/30 rounded-md font-body-md text-primary focus:outline-none focus:border-muted-gold transition-colors resize-none"
                placeholder="What did the customer say?"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 accent-muted-gold"
                />
                <span className="font-body-md text-primary">Show on website</span>
              </label>
            </div>

            {error && <p className="text-error font-body-md text-sm">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="self-start bg-primary text-white px-8 py-3 font-label-md uppercase tracking-widest hover:bg-secondary transition-colors shadow-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Review"}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-surface-container rounded-xl h-48" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-24 bg-background border border-surface-container rounded-xl">
          <Star className="w-16 h-16 text-outline-variant/30 mx-auto mb-4" />
          <p className="font-body-lg text-on-surface-variant">No reviews yet</p>
          <p className="font-body-sm text-on-surface-variant/60 mt-2">Click &quot;Add Review&quot; to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-background border rounded-xl shadow-sm p-6 flex flex-col gap-4 transition-all ${
                review.isActive ? "border-surface-container" : "border-outline-variant/20 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center font-bold text-primary text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-label-md text-primary">{review.name}</p>
                    {review.location && (
                      <p className="font-body-sm text-on-surface-variant">{review.location}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-muted-gold fill-muted-gold" : "text-outline-variant/30"}`} />
                  ))}
                </div>
              </div>

              <p className="font-body-md text-on-surface-variant leading-relaxed line-clamp-3">
                &ldquo;{review.text}&rdquo;
              </p>

              {review.product && (
                <span className="self-start text-xs font-label-sm text-muted-gold bg-muted-gold/10 px-3 py-1 rounded-full">
                  {review.product}
                </span>
              )}

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container">
                <span className="font-body-sm text-on-surface-variant/50">
                  {new Date(review.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle(review)}
                    className={`p-2 rounded-lg transition-colors ${review.isActive ? "text-green-600 hover:bg-green-50" : "text-on-surface-variant hover:bg-surface-container-low"}`}
                    title={review.isActive ? "Hide from website" : "Show on website"}
                  >
                    {review.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-colors"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
