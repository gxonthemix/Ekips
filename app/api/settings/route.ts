import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const userId = await getUserId();
  if (!userId) return Response.json({ error: "Nisi prijavljen." }, { status: 401 });
  const settings = await prisma.setting.upsert({ where: { userId }, update: {}, create: { userId } });
  return Response.json({ settings });
}
export async function PUT(req: Request) {
  const userId = await getUserId();
  if (!userId) return Response.json({ error: "Nisi prijavljen." }, { status: 401 });
  const body = await req.json();
  delete body.id; delete body.userId;
  const settings = await prisma.setting.upsert({ where: { userId }, update: body, create: { userId, ...body } });
  return Response.json({ settings });
}
