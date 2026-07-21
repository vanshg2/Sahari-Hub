import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@saharihub.com' },
    update: {},
    create: {
      email: 'admin@saharihub.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log('Seeded admin:', admin.email);

  const bagsCategory = await prisma.category.upsert({
    where: { slug: 'bags' },
    update: {},
    create: {
      name: 'Luxury Bags',
      slug: 'bags',
      description: 'Handcrafted premium leather bags blending traditional Indian artistry with contemporary design.',
    },
  });

  const suitsCategory = await prisma.category.upsert({
    where: { slug: 'suits' },
    update: {},
    create: {
      name: 'Ethnic Suits',
      slug: 'suits',
      description: 'Elegant ethnic suits for the modern Indian woman.',
    },
  });

  const dressesCategory = await prisma.category.upsert({
    where: { slug: 'dresses' },
    update: {},
    create: {
      name: 'Dresses',
      slug: 'dresses',
      description: 'Elegant corset and two-piece dresses.',
    },
  });

  const accessoriesCategory = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Curated accessories to complement your style.',
    },
  });

  console.log('Seeded categories');

  const products = [
    {
      sku: 'SH-BG-001',
      name: 'The Classic Burgundy Tote',
      slug: 'classic-burgundy-tote',
      description: 'A timeless burgundy leather tote crafted from premium full-grain leather. Features a spacious interior with zippered pockets, magnetic snap closure, and reinforced handles. Perfect for the modern woman who values both style and functionality.',
      price: 12999,
      compareAtPrice: 15999,
      stockQuantity: 42,
      categoryId: bagsCategory.id,
      images: [
        { url: 'https://lh3.googleusercontent.com/pw/AP1GczPqYfFh8bCE2jKLqzCdPJvT1D8KJq0b3J8KJ3L5M7N9P0R2T4V6X8Z0A2C4E6G8I0K2M4N6P8R0T2V4X6Z0=s800', altText: 'Classic Burgundy Tote - Front View', isPrimary: true, order: 0 },
        { url: 'https://lh3.googleusercontent.com/pw/AP1GczPqYfFh8bCE2jKLqzCdPJvT1D8KJq0b3J8KJ3L5M7N9P0R2T4V6X8Z0A2C4E6G8I0K2M4N6P8R0T2V4X6Z0=s800', altText: 'Classic Burgundy Tote - Side View', isPrimary: false, order: 1 },
      ],
    },
    {
      sku: 'SH-BG-002',
      name: 'Noir Evening Crossbody',
      slug: 'noir-evening-crossbody',
      description: 'An elegant crossbody bag in deep noir leather, designed for evening occasions. Features a detachable chain strap, suede interior lining, and gold-tone hardware. Compact yet surprisingly spacious.',
      price: 8499,
      compareAtPrice: 10999,
      stockQuantity: 28,
      categoryId: bagsCategory.id,
      images: [
        { url: 'https://lh3.googleusercontent.com/pw/AP1GczNf8kL2mPqR4sT6uW0yX2z4A6C8E0G2I4K6M8O0Q2S4U6W8Y0A2C4E6G8I0K2M4N6P8R0T2V4X6Z0=s800', altText: 'Noir Evening Crossbody - Front View', isPrimary: true, order: 0 },
      ],
    },
    {
      sku: 'SH-BG-003',
      name: 'Pearl Structured Clutch',
      slug: 'pearl-structured-clutch',
      description: 'A refined structured clutch in pearl white leather. Features a detachable wristlet strap, magnetic closure, and interior card slots. The perfect companion for formal events.',
      price: 6999,
      compareAtPrice: 8999,
      stockQuantity: 35,
      categoryId: bagsCategory.id,
      images: [
        { url: 'https://lh3.googleusercontent.com/pw/AP1GczJf8kL2mPqR4sT6uW0yX2z4A6C8E0G2I4K6M8O0Q2S4U6W8Y0A2C4E6G8I0K2M4N6P8R0T2V4X6Z0=s800', altText: 'Pearl Structured Clutch - Front View', isPrimary: true, order: 0 },
      ],
    },
    {
      sku: 'SH-BG-004',
      name: 'Heritage Tan Satchel',
      slug: 'heritage-tan-satchel',
      description: 'A heritage-inspired tan leather satchel with hand-stitched detailing. Features an adjustable shoulder strap, brass buckle closures, and a padded laptop compartment. A bridge between tradition and modernity.',
      price: 14999,
      compareAtPrice: 18999,
      stockQuantity: 15,
      categoryId: bagsCategory.id,
      images: [
        { url: 'https://lh3.googleusercontent.com/pw/AP1GczMf8kL2mPqR4sT6uW0yX2z4A6C8E0G2I4K6M8O0Q2S4U6W8Y0A2C4E6G8I0K2M4N6P8R0T2V4X6Z0=s800', altText: 'Heritage Tan Satchel - Front View', isPrimary: true, order: 0 },
      ],
    },
    {
      sku: 'SH-BG-005',
      name: 'Ivory Minimal Tote',
      slug: 'ivory-minimal-tote',
      description: 'A minimalist tote in soft ivory leather. Clean lines, no unnecessary embellishments. Features a magnetic snap closure and spacious interior with a zip pocket.',
      price: 11499,
      stockQuantity: 22,
      categoryId: bagsCategory.id,
      images: [
        { url: 'https://lh3.googleusercontent.com/pw/AP1GczLf8kL2mPqR4sT6uW0yX2z4A6C8E0G2I4K6M8O0Q2S4U6W8Y0A2C4E6G8I0K2M4N6P8R0T2V4X6Z0=s800', altText: 'Ivory Minimal Tote - Front View', isPrimary: true, order: 0 },
      ],
    },
    {
      sku: 'SH-AC-001',
      name: 'Gold Chain Necklace',
      slug: 'gold-chain-necklace',
      description: 'A delicate 18K gold-plated chain necklace with a minimalist pendant. Perfect for everyday elegance or layering with other pieces.',
      price: 3499,
      compareAtPrice: 4999,
      stockQuantity: 60,
      categoryId: accessoriesCategory.id,
      images: [
        { url: 'https://lh3.googleusercontent.com/pw/AP1GczOf8kL2mPqR4sT6uW0yX2z4A6C8E0G2I4K6M8O0Q2S4U6W8Y0A2C4E6G8I0K2M4N6P8R0T2V4X6Z0=s800', altText: 'Gold Chain Necklace', isPrimary: true, order: 0 },
      ],
    },
    {
      sku: 'SH-DR-001',
      name: 'Crimson Silk Corset Dress',
      slug: 'crimson-silk-corset-dress',
      description: 'An elegant crimson silk dress featuring a beautifully structured corset bodice and flowing two-piece silhouette.',
      price: 15999,
      compareAtPrice: 19999,
      stockQuantity: 12,
      categoryId: dressesCategory.id,
      images: [
        { url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=400', altText: 'Crimson Silk Corset Dress', isPrimary: true, order: 0 },
      ],
    },
  ];

  for (const productData of products) {
    const { images, ...data } = productData;
    const product = await prisma.product.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        images: {
          create: images,
        },
      },
    });
    console.log(`Seeded product: ${product.name}`);
  }

  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
