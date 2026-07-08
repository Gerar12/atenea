<p align="center">
  <img src="public/logo.png" alt="Atenea" height="90">
</p>

<h1 align="center">Residencial Atenea — Web & Admin Platform</h1>

<p align="center">
  Marketing website + lead-capture and admin platform for <b>Residencial Atenea</b>,
  a premium lot subdivision in Costa del Sol, El Salvador.
  <br>
  🌐 <b>Live:</b> <a href="https://atenea.sv">atenea.sv</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/NextAuth-v5-000000?logo=auth0&logoColor=white">
</p>

---

## What it is

A full-stack Next.js platform that serves two audiences from one codebase:

- **A public marketing site** to showcase the development — house-model renders, virtual-tour videos, an interactive lot map, and downloadable documents (purchase process, community bylaws).
- **An admin back office** to capture and manage leads, register event guests, and run email marketing campaigns.

It's integrated with **UrbaNext** (a multi-tenant real-estate SaaS) for the live, interactive lot map.

## Features

**Public site**
- Hero video, lightbox gallery and house-model carousels (Embla)
- Virtual-tour videos and high-resolution renders
- Interactive online lot map (UrbaNext integration)
- Lead & subscriber capture with **DUI and phone validation**
- Event guest registration with a **downloadable QR code**
- Full SEO: JSON-LD structured data, Open Graph, per-market metadata

**Admin panel** (protected with NextAuth v5)
- Lead / subscriber management with search and **Excel export**
- Email marketing — welcome, confirmation and **bulk campaigns** composed in a rich-text editor (Tiptap)
- Transactional email via Nodemailer (SMTP)

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Auth | NextAuth v5 |
| Database | PostgreSQL + Prisma 6 |
| Email | Nodemailer (SMTP) |
| Editor | Tiptap |
| UI | Tailwind CSS, Embla Carousel |

## Getting started

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env        # then fill in your values

# 3. Database
npx prisma migrate deploy   # or: npx prisma migrate dev

# 4. Run
npm run dev                 # http://localhost:3000
```

See [`.env.example`](./.env.example) for the required environment variables (database, NextAuth, SMTP, admin credentials). **No secrets are committed to this repository.**

## Project structure

```
prisma/        Prisma schema and migrations (DDL only)
public/        Renders, videos, PDFs and brand assets
src/ · app/    Next.js App Router pages, components and API routes
```

---

## About

Built by **Gerar Arévalo** ([gcoder.dev](https://gcoder.dev)) at **Salex Corp**. Published as a work sample. The renders, videos and documents are the developer's own work and are already public on the live site.

More of my work: [Case studies](https://github.com/Gerar12/case-studies) · [Portfolio](https://gcoder.dev)

## License

**Source-available — all rights reserved.** © 2026 Gerar Arévalo / Salex Corp. You may read this code to evaluate the author's work; you may not reuse, redistribute or sell it without written permission. See [`LICENSE`](./LICENSE).
