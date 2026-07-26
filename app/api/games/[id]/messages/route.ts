import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const messages = await prisma.message.findMany({ where: { gameId: id }, include: { user: { select: { id: true, name: true } } }, orderBy: { createdAt: "asc" } });
  return Response.json({ messages });
}
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return Response.json({ error: "Prijavi se." }, { status: 401 });
  const { id } = await params;
  const { body } = await req.json();
  if (!String(body || "").trim()) return Response.json({ error: "Poruka je prazna." }, { status: 400 });
  const member = await prisma.participant.findUnique({ where: { userId_gameId: { userId, gameId: id } } });
  if (!member) return Response.json({ error: "Moraš biti član igre." }, { status: 403 });
  const message = await prisma.message.create({ data: { body: String(body).trim(), userId, gameId: id }, include: { user: { select: { id: true, name: true } } } });
  return Response.json({ message });
}
