import Link from "next/link";
import { MapPin, Clock, Users } from "lucide-react";
export type Game = { id: string; title: string; category: string; startsAt: string; location: string; city: string; capacity: number; description: string; host: { name: string; rating: number }; participants: { user: { id: string; name: string } }[] };
const emoji: Record<string,string> = { Bela: "🃏", Catan: "🏝️", Poker: "♠️", Uno: "🟥", Šah: "♟️" };
export default function GameCard({ game }: { game: Game }) {
  const date = new Date(game.startsAt);
  const left = Math.max(0, game.capacity - game.participants.length);
  return <Link href={`/game/${game.id}`} className="game-card web-game-card"><div className="game-icon">{emoji[game.title] || "🎲"}</div><div className="game-info"><div className="row between"><h3>{game.title}</h3><span className={left ? "pill" : "pill full"}>{left ? `Još ${left}` : "Popunjeno"}</span></div><p><Clock size={14}/>{date.toLocaleDateString("hr-HR", { day: "2-digit", month: "2-digit" })} u {date.toLocaleTimeString("hr-HR", { hour: "2-digit", minute: "2-digit" })}</p><p><MapPin size={14}/>{game.location}</p><p><Users size={14}/>{game.participants.length}/{game.capacity} igrača · domaćin {game.host.name}</p></div></Link>;
}
