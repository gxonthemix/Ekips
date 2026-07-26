import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const id = await getUserId();
  if (!id) return Response.json({ user: null });
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true, city: true, bio: true, reliability: true, rating: true } });
  return Response.json({ user });
}
