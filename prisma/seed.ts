import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const password = await bcrypt.hash("demo1234", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@ekips.hr" },
    update: {},
    create: { name: "Marko Perić", email: "demo@ekips.hr", password, city: "Zagreb", bio: "Volim društvene igre i dobru ekipu." }
  });
  await prisma.setting.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } });
  const count = await prisma.game.count();
  if (count === 0) {
    const items = [
      ["Bela", "Karte", "Kafić Time, Trešnjevka", 4, 2],
      ["Catan", "Društvene igre", "Meeple's Corner, Zagreb", 5, 4],
      ["Poker", "Karte", "Centar, Zagreb", 6, 1]
    ] as const;
    for (const [title, category, location, capacity, hours] of items) {
      const game = await prisma.game.create({ data: { title, category, location, city: "Zagreb", capacity, startsAt: new Date(Date.now() + hours * 3600000), hostId: user.id, description: "Opušteno druženje, svi su dobrodošli.", rules: "Standardna pravila." } });
      await prisma.participant.create({ data: { userId: user.id, gameId: game.id } });
    }
  }
}
main().finally(() => prisma.$disconnect());
