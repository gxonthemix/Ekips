"use client";
import Link from "next/link";
import { Bell, Dice5, Search } from "lucide-react";
export default function Header({ title = "EKIPS" }: { title?: string }) {
  return <header className="header">
    <Link href="/" className="brand"><span className="brandmark"><Dice5 size={20}/></span><span>{title}</span></Link>
    <div className="header-search"><Search size={17}/><input placeholder="Pretraži igre, grad ili lokaciju" /></div>
    <Link href="/notifications" className="icon-btn" aria-label="Obavijesti"><Bell size={20}/><span className="notification-dot"/></Link>
  </header>;
}
