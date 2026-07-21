import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.review.count();
  if (count > 0) {
    console.log('Reviews already seeded.');
    return;
  }

  const reviews = [
    { name: 'Priya Sharma', location: 'Mumbai', rating: 5, text: 'The craftsmanship on my burgundy tote is absolutely stunning. Every stitch is perfect. I receive compliments every time I carry it.', product: 'Classic Burgundy Tote' },
    { name: 'Ananya Reddy', location: 'Hyderabad', rating: 5, text: 'Ordered the silk suit for a wedding. The fabric quality exceeded my expectations. Will definitely order again!', product: 'Heritage Silk Suit' },
    { name: 'Meera Joshi', location: 'Delhi', rating: 5, text: 'Fast delivery and the bag looks even better in person. The leather is soft and premium. Worth every rupee.', product: 'Noir Leather Clutch' },
    { name: 'Kavya Nair', location: 'Bangalore', rating: 5, text: 'I\'ve been looking for a good ethnic suit collection for so long. Sahari Hub finally fills that gap. Beautiful designs!', product: 'Pearl Anarkali Set' },
    { name: 'Ritu Agarwal', location: 'Jaipur', rating: 4, text: 'The gold chain necklace is delicate and elegant. Perfect for daily wear. Packaging was also very premium.', product: 'Gold Chain Necklace' },
    { name: 'Sneha Patel', location: 'Ahmedabad', rating: 5, text: 'Customer service was amazing. They helped me pick the right size and the return process was hassle-free. Highly recommend!', product: 'Classic Burgundy Tote' },
    { name: 'Deepa Iyer', location: 'Chennai', rating: 5, text: 'Bought the complete suit set for Diwali. The color, fit, and material are all top-notch. Truly luxury fashion.', product: 'Heritage Silk Suit' },
    { name: 'Nisha Gupta', location: 'Lucknow', rating: 5, text: 'This is my third purchase from Sahari Hub. Consistent quality every single time. The bags are my absolute favorite.', product: 'Noir Leather Clutch' },
  ];

  for (const r of reviews) {
    await prisma.review.create({ data: r });
  }

  console.log(`Seeded ${reviews.length} reviews.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
