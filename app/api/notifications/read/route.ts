import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function POST() {
  const userId = await getUserId();
  if (!userId) return Response.json({ error: "Nisi prijavljen." }, { status: 401 });
  await prisma.notification.updateMany({ where: { userId }, data: { read: true } });
  return Response.json({ ok: true });
}
