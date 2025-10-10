
import { defineConfig } from '@prisma/config';

export default defineConfig({
  cli: {
    seed: {
      command: 'bun run seed',
    },
  },
} as any);
