import { PrismaClient } from '@prisma/client';

class Prisma {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!Prisma.instance) {
      Prisma.instance = new PrismaClient({ errorFormat: 'pretty' });
    }
    return Prisma.instance;
  }
}

export default Prisma;
