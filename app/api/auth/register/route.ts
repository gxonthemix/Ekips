import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password, city } = await req.json();
  if (!name || !email || !password) return Response.json({ error: "Ispuni sva obavezna polja." }, { status: 400 });
  if (password.length < 8) return Response.json({ error: "Lozinka mora imati najmanje 8 znakova." }, { status: 400 });
  const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (exists) return Response.json({ error: "Račun s tim emailom već postoji." }, { status: 409 });
  const user = await prisma.user.create({ data: { name, email: email.toLowerCase(), password: await bcrypt.hash(password, 10), city: city || "Zagreb", settings: { create: {} } } });
  await createSession(user.id);
  return Response.json({ user: { id: user.id, name: user.name, email: user.email } });
}
