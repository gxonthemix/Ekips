import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return Response.json({ error: "Prijavi se prije pridruživanja." }, { status: 401 });
  const { id } = await params;
  const game = await prisma.game.findUnique({ where: { id }, include: { participants: true } });
  if (!game) return Response.json({ error: "Igra ne postoji." }, { status: 404 });
  if (game.participants.length >= game.capacity) return Response.json({ error: "Igra je popunjena." }, { status: 409 });
  await prisma.participant.upsert({ where: { userId_gameId: { userId, gameId: id } }, update: {}, create: { userId, gameId: id } });
  if (game.hostId !== userId) await prisma.notification.create({ data: { userId: game.hostId, title: "Novi igrač", body: "Netko se pridružio tvojoj igri " + game.title + "." } });
  return Response.json({ ok: true });
}
