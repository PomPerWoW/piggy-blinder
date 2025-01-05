import config from '@piggy/core/config/config';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (config.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
