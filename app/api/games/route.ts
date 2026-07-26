import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const games = await prisma.game.findMany({
    where: { startsAt: { gte: new Date(Date.now() - 3600000) }, OR: [{ title: { contains: q, mode: "insensitive" } }, { location: { contains: q, mode: "insensitive" } }, { city: { contains: q, mode: "insensitive" } }] },
    include: { host: { select: { id: true, name: true, rating: true } }, participants: { include: { user: { select: { id: true, name: true } } } } },
    orderBy: { startsAt: "asc" }
  });
  return Response.json({ games });
}

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return Response.json({ error: "Prijavi se za objavu igre." }, { status: 401 });
  const { title, category, startsAt, location, city, description, rules, capacity, visibility } = await req.json();
  if (!title || !startsAt || !location || Number(capacity) < 2) return Response.json({ error: "Provjeri unesene podatke." }, { status: 400 });
  const game = await prisma.game.create({ data: { title, category: category || "Ostalo", startsAt: new Date(startsAt), location, city: city || "Zagreb", description: description || "", rules: rules || "", capacity: Number(capacity), visibility: visibility || "public", hostId: userId, participants: { create: { userId } } } });
  return Response.json({ game });
}
