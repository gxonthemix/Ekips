"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Plus, MessageCircle, User, Settings, Dice5 } from "lucide-react";
const items = [["/", Home, "Početna"], ["/games", Gamepad2, "Istraži igre"], ["/create", Plus, "Organiziraj igru"], ["/chat", MessageCircle, "Poruke"], ["/profile", User, "Profil"], ["/settings", Settings, "Postavke"]] as const;
export default function Nav() { const path=usePathname(); return <aside className="sidebar"><Link href="/" className="sidebar-brand"><span className="brandmark"><Dice5 size={20}/></span><b>EKIPS</b></Link><div className="sidebar-copy">Pronađi ljude za društvene igre u svom gradu.</div><nav>{items.map(([href,Icon,label])=><Link key={href} href={href} className={path===href||(href!=="/"&&path.startsWith(href))?"active":""}><Icon size={19}/><span>{label}</span></Link>)}</nav><div className="sidebar-cta"><strong>Nema prave igre?</strong><span>Organiziraj svoju i pozovi ekipu.</span><Link href="/create">Nova igra</Link></div></aside> }
