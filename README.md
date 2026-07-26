# EKIPS

EKIPS je full-stack responsive web aplikacija za pronalazak, organiziranje i pridruživanje lokalnim druženjima uz društvene igre.

## Funkcionalnosti
- registracija, prijava i sigurna HTTP-only sesija
- pretraživanje i filtriranje aktivnih igara
- organiziranje događaja i pridruživanje
- detalji događaja, sudionici i grupni chat
- korisnički profil, pouzdanost i postavke privatnosti
- obavijesti i osnovni administratorski pregled
- PostgreSQL baza, Prisma ORM, Docker i Railway konfiguracija
- responsive desktop/mobile sučelje i PWA manifest

## Lokalno pokretanje
1. Kopiraj `.env.example` u `.env` i postavi `DATABASE_URL` i `JWT_SECRET`.
2. Pokreni `npm install`.
3. Pokreni `npx prisma db push`.
4. Po želji pokreni `npm run seed`.
5. Pokreni `npm run dev`.

Demo račun nakon seeda: `demo@ekips.hr` / `demo1234`.
