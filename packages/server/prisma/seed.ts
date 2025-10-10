import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding started...');

  // --- Create Products ---
  const products = await prisma.product.createMany({
    data: [
      {
        id: 1,
        name: 'Aurora Smart Lamp',
        description:
          'A voice-controlled smart lamp with adaptive brightness and mood-based lighting presets.',
        price: 89.99,
      },
      {
        id: 2,
        name: 'Nimbus Noise-Cancelling Headphones',
        description:
          'Over-ear wireless headphones with active noise cancellation and immersive sound.',
        price: 199.5,
      },
      {
        id: 3,
        name: 'VitaBlend Pro 5000 Blender',
        description:
          'A professional-grade blender designed for smoothies, soups, and frozen desserts.',
        price: 149.0,
      },
      {
        id: 4,
        name: 'TerraBrew Coffee Maker',
        description:
          'An intelligent coffee maker that learns your brewing preferences and syncs with your phone.',
        price: 129.95,
      },
      {
        id: 5,
        name: 'AeroMat Pro Yoga Mat',
        description:
          'A high-density, eco-friendly yoga mat built for comfort and durability.',
        price: 59.99,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${products.count} products`);

  // --- Create Reviews ---
  await prisma.review.createMany({
    data: [
      // Product 1: Aurora Smart Lamp
      {
        author: 'Emily Johnson',
        rating: 5,
        content:
          'The Aurora Smart Lamp completely changed my nighttime routine. The adaptive lighting automatically adjusts to my mood and the voice commands are incredibly responsive. It even syncs with my bedtime playlist—pure magic.',
        productId: 1,
      },
      {
        author: 'Lucas Reed',
        rating: 4,
        content:
          'Beautiful design and functionality! The only thing I wish it had was a built-in battery for portability, but the lighting quality and app control are outstanding.',
        productId: 1,
      },
      {
        author: 'Sophia Martinez',
        rating: 5,
        content:
          'This lamp has made my reading corner so much more inviting. The soft glow is perfect, and I love that I can change the color temperature with just a phrase.',
        productId: 1,
      },
      {
        author: 'David Kim',
        rating: 4,
        content:
          'Setup was super simple, and I love the mood presets. The “Sunset Calm” mode helps me unwind after long days. Slight lag when using Alexa, but not a dealbreaker.',
        productId: 1,
      },
      {
        author: 'Rachel Nguyen',
        rating: 5,
        content:
          'Honestly the best lamp I’ve ever owned. It’s sleek, intuitive, and feels like part of my smart home ecosystem seamlessly.',
        productId: 1,
      },

      // Product 2: Nimbus Noise-Cancelling Headphones
      {
        author: 'Mark Peterson',
        rating: 5,
        content:
          'The Nimbus headphones completely block out my noisy office. The sound quality is rich, with deep bass and crystal-clear highs. I can wear them for hours without discomfort.',
        productId: 2,
      },
      {
        author: 'Olivia Brown',
        rating: 4,
        content:
          'Amazing noise cancellation and comfort! They feel premium, though I wish the battery life were slightly longer. Still, the soundstage is phenomenal.',
        productId: 2,
      },
      {
        author: 'James Allen',
        rating: 5,
        content:
          'Perfect for flights. The ANC works wonders, and I’ve rediscovered my favorite albums with the clarity these provide.',
        productId: 2,
      },
      {
        author: 'Hannah Lee',
        rating: 5,
        content:
          'I’ve tried many headphones, but Nimbus takes the crown. The app customization and ambient mode make it so versatile.',
        productId: 2,
      },
      {
        author: 'Ethan Clark',
        rating: 4,
        content:
          'Incredible sound. I love the soft earcups and how they mold to my head. Only minor issue is the touch controls can be too sensitive.',
        productId: 2,
      },

      // Product 3: VitaBlend Pro 5000 Blender
      {
        author: 'Sarah Wilson',
        rating: 5,
        content:
          'The VitaBlend Pro 5000 makes the smoothest smoothies I’ve ever had. It crushes frozen fruit effortlessly and even makes silky soups.',
        productId: 3,
      },
      {
        author: 'Daniel Rivera',
        rating: 4,
        content:
          'A powerhouse of a blender! It’s a bit loud, but that’s understandable for its performance. Cleanup is easy, and I use it daily.',
        productId: 3,
      },
      {
        author: 'Ava Thompson',
        rating: 5,
        content:
          'I love how quickly it blends everything. My morning protein shakes have never been smoother. The pulse function is a game changer.',
        productId: 3,
      },
      {
        author: 'Michael Carter',
        rating: 5,
        content:
          'I use this for meal prep, sauces, and even nut butters. It’s durable and feels professional-grade. Definitely worth the investment.',
        productId: 3,
      },
      {
        author: 'Lily Adams',
        rating: 4,
        content:
          'It’s my kitchen MVP. The power is unmatched, but the lid can be a bit tricky to lock in place sometimes.',
        productId: 3,
      },

      // Product 4: TerraBrew Coffee Maker
      {
        author: 'John Roberts',
        rating: 5,
        content:
          'The TerraBrew is like having a barista at home. It remembers how I like my morning coffee and adjusts the brew strength automatically.',
        productId: 4,
      },
      {
        author: 'Isabella Torres',
        rating: 5,
        content:
          'The app connectivity is genius. I can start brewing from bed and walk into the kitchen with a fresh cup waiting. The aroma alone is worth it.',
        productId: 4,
      },
      {
        author: 'William Scott',
        rating: 4,
        content:
          'Excellent brewing consistency and design. The water temperature control is precise, giving me better-tasting coffee than most cafés.',
        productId: 4,
      },
      {
        author: 'Chloe White',
        rating: 5,
        content:
          'Stylish, smart, and super easy to use. I love that it recommends new coffee blends based on my preferences.',
        productId: 4,
      },
      {
        author: 'Benjamin Davis',
        rating: 4,
        content:
          'Brews delicious coffee every time. Slightly bulky for my small counter space, but totally worth it.',
        productId: 4,
      },

      // Product 5: AeroMat Pro Yoga Mat
      {
        author: 'Natalie Brooks',
        rating: 5,
        content:
          'The AeroMat Pro is a dream to practice on. It grips perfectly during hot yoga and still feels cushioned for my knees.',
        productId: 5,
      },
      {
        author: 'Jacob Green',
        rating: 5,
        content:
          'Extremely durable and comfortable. I’ve been using it daily for months and it still looks brand new. The eco-friendly material is a huge plus.',
        productId: 5,
      },
      {
        author: 'Ella Watson',
        rating: 4,
        content:
          'This mat strikes the perfect balance between firm support and soft texture. I just wish it came with a carrying strap.',
        productId: 5,
      },
      {
        author: 'Ryan Murphy',
        rating: 5,
        content:
          'No slipping, no sliding—just focus and flow. The mat stays flat even after being rolled up tightly.',
        productId: 5,
      },
      {
        author: 'Mia Hernandez',
        rating: 5,
        content:
          'Beautiful color, perfect thickness, and feels luxurious. My yoga sessions have never felt more grounded.',
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
