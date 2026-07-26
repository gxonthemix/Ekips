import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "EKIPS — pronađi ekipu za igru", description: "Pronađi ljude u svom gradu za društvene igre, karte i gaming večeri.", manifest: "/manifest.webmanifest", themeColor: "#7157ff" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="hr"><body>{children}</body></html>; }
