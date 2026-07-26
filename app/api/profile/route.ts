import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const id = await getUserId();
  if (!id) return Response.json({ error: "Nisi prijavljen." }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, city: true, bio: true, reliability: true, rating: true, createdAt: true, memberships: { include: { game: true } } } });
  return Response.json({ user });
}
export async function PUT(req: Request) {
  const id = await getUserId();
  if (!id) return Response.json({ error: "Nisi prijavljen." }, { status: 401 });
  const { name, city, bio } = await req.json();
  const user = await prisma.user.update({ where: { id }, data: { name, city, bio }, select: { id: true, name: true, email: true, city: true, bio: true, reliability: true, rating: true } });
  return Response.json({ user });
}
