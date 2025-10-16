import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database URL:', process.env.DATABASE_URL);

  console.log('🌱 Seeding started...');

// --- Clear old data safely ---
await prisma.$transaction([
  prisma.summary.deleteMany({}),
  prisma.review.deleteMany({}),
  prisma.product.deleteMany({}),
]);


  // --- Create Products ---
  const products = await prisma.product.createMany({
    data: [
      {
        id: 1,
        name: 'Aquila',
        description: 'A thrilling roller coaster that soars high above the park with breathtaking loops and drops.',
        price: 45.0,
      },
      {
        id: 2,
        name: 'Fatamorgana',
        description: 'An enchanting dark ride through mystical scenes, illusions, and magical storytelling.',
        price: 38.5,
      },
      {
        id: 3,
        name: 'The Dragon Boats',
        description: 'A gentle water ride with vibrant dragon-themed boats, perfect for families.',
        price: 25.0,
      },
      {
        id: 4,
        name: 'The Golden Tower',
        description: 'A towering drop ride that offers a mix of adrenaline and stunning park views.',
        price: 42.75,
      },
      {
        id: 5,
        name: 'The Demon',
        description: 'An intense roller coaster with high speeds, inversions, and heart-pounding excitement.',
        price: 50.0,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${products.count} products`);

  // --- Create Reviews ---
  await prisma.review.createMany({
    data: [
      // Product 1: Aquila
      {
        author: 'Emma L.',
        rating: 5,
        content: 'Aquila gave me the ride of my life! The drops were exhilarating and the loops felt like flying. Absolutely loved it!',
        productId: 1,
      },
      {
        author: 'Liam P.',
        rating: 4,
        content: 'The speed and height of Aquila are insane. A few parts were scary, but that is what makes it fun!',
        productId: 1,
      },
      {
        author: 'Sophia R.',
        rating: 5,
        content: 'Every twist on Aquila kept me on the edge of my seat. The engineering and thrills are top-notch.',
        productId: 1,
      },
      {
        author: 'Noah M.',
        rating: 4,
        content: 'Aquila is amazing, but the line was a bit long. Still, the ride experience was totally worth it.',
        productId: 1,
      },

      // Product 2: Fatamorgana
      {
        author: 'Olivia K.',
        rating: 5,
        content: 'Fatamorgana is magical! The visuals and illusions transported me to another world. Highly recommend for all ages.',
        productId: 2,
      },
      {
        author: 'Ethan S.',
        rating: 4,
        content: 'The attention to detail in Fatamorgana is incredible. Very immersive and perfect for a calm, fun ride.',
        productId: 2,
      },
      {
        author: 'Ava J.',
        rating: 5,
        content: 'Loved the mystical scenes in Fatamorgana. Felt like stepping into a fairytale. A must-visit attraction!',
        productId: 2,
      },
      {
        author: 'Mason B.',
        rating: 4,
        content: 'Fatamorgana is enchanting. Kids will love it, and adults can appreciate the creativity too.',
        productId: 2,
      },

      // Product 3: The Dragon Boats
      {
        author: 'Isabella T.',
        rating: 5,
        content: 'The Dragon Boats are so cute and fun. Perfect for a relaxing ride while enjoying the water scenery.',
        productId: 3,
      },
      {
        author: 'Lucas F.',
        rating: 4,
        content: 'A very charming ride. The dragons are colorful and the boat ride is peaceful. Great for families.',
        productId: 3,
      },
      {
        author: 'Mia H.',
        rating: 5,
        content: 'The Dragon Boats made our family day perfect. The ride is gentle yet entertaining for everyone.',
        productId: 3,
      },
      {
        author: 'Benjamin G.',
        rating: 4,
        content: 'Fun ride on The Dragon Boats. The theme is delightful and it’s an easy way to enjoy some water fun.',
        productId: 3,
      },

      // Product 4: The Golden Tower
      {
        author: 'Charlotte W.',
        rating: 5,
        content: 'The Golden Tower gave me the most thrilling drop! The view from the top was spectacular and nerve-wracking!',
        productId: 4,
      },
      {
        author: 'James D.',
        rating: 4,
        content: 'I loved the adrenaline rush from The Golden Tower. The height is impressive and the drop is intense.',
        productId: 4,
      },
      {
        author: 'Amelia C.',
        rating: 5,
        content: 'An incredible ride! The Golden Tower combines fear and excitement perfectly. Highly recommended.',
        productId: 4,
      },
      {
        author: 'Henry K.',
        rating: 4,
        content: 'The tower is majestic and thrilling. The wait was long, but the drop made it all worth it.',
        productId: 4,
      },

      // Product 5: The Demon
      {
        author: 'Ella V.',
        rating: 5,
        content: 'The Demon is a heart-stopping roller coaster! High speed, twists, and inversions – an adrenaline junkie’s dream.',
        productId: 5,
      },
      {
        author: 'Alexander R.',
        rating: 5,
        content: 'I screamed the entire ride! The Demon is intense and perfectly designed for thrill-seekers.',
        productId: 5,
      },
      {
        author: 'Grace N.',
        rating: 4,
        content: 'The Demon delivers extreme excitement. A few moments are terrifying, but in the best way possible.',
        productId: 5,
      },
      {
        author: 'William S.',
        rating: 5,
        content: 'Incredible ride! The Demon keeps you on edge with every twist and turn. Definitely a highlight of Tivoli.',
        productId: 5,
      },
      {
        author: 'Sofia P.',
        rating: 4,
        content: 'The Demon is amazing for those who love roller coasters. Fast, twisting, and full of surprises.',
        productId: 5,
      },
    ],
  });

  console.log('✅ Reviews seeded successfully!');
}

main()
  .then(() => console.log('🌟 Database seeding complete!'))
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
