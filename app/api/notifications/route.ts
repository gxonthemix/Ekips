import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const userId = await getUserId();
  if (!userId) return Response.json({ notifications: [] });
  const notifications = await prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
  return Response.json({ notifications });
}
