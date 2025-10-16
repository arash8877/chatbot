import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const productRepository = {
   getProduct(productId: number) {
      return prisma.product.findUnique({
         where: { id: productId },
      });
   },

   async getProducts() {
      return prisma.product.findMany({
         select: {
            id: true,
            name: true,
         },
         orderBy: { name: 'asc' },
      });
   },
};
