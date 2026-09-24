# Inventory Management Web App

A modern inventory management dashboard built with Next.js, TypeScript, Tailwind CSS, Prisma, and SQLite/PostgreSQL.

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite for local development
- PostgreSQL-ready configuration

## Features

- Dashboard overview
- Product catalog management
- Supplier management
- Category tracking
- Stock-in / stock-out transaction records
- Low-stock monitoring
- Inventory value reporting
- Seeded demo data

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npx prisma generate
```

3. Run database migration:

```bash
npx prisma migrate dev --name init
```

4. Seed the database:

```bash
npm run db:seed
```

5. Start the app:

```bash
npm run dev
```

Open http://localhost:3000

## Production database

To switch to PostgreSQL, update the `DATABASE_URL` in your `.env` file and keep the Prisma schema unchanged.

## App pages

- `/` — dashboard
- `/products` — product list
- `/products/new` — create product
- `/categories` — categories
- `/suppliers` — suppliers
- `/transactions` — stock transaction log
