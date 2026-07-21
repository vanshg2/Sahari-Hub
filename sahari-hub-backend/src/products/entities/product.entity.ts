export class Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  isPublished: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
