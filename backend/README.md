<p align="center">
  <a href="https://akomo.xyz" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Akomo Logo" /></a>
</p>

<p align="center">A progressive Node.js framework backend for <b>Akomo</b>, tracking builds and exchange rates with precision.</p>

## Description

Akomo Backend is built with [NestJS](https://github.com/nestjs/nest), utilizing [Prisma ORM](https://www.prisma.io/) and [Neon Postgres](https://neon.tech/) for high-performance, serverless data management.

## Infrastructure: Supabase to Neon Migration

We have recently migrated our data layer from Supabase to **Neon Postgres** using **Prisma 7**.

### Key Changes
- **Database:** Neon (Serverless Postgres)
- **ORM:** Prisma 7 with Neon Adapter
- **Architecture:** Moved from direct Supabase client to a centralized `PrismaService` with global dependency injection.

## Project setup

```bash
$ pnpm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
PORT=3000
```

> [!IMPORTANT]
> Ensure your `DATABASE_URL` is a valid Neon connection string. For Prisma migrations and `db push`, it is recommended to use the **Direct Connection** URL from the Neon console.

## Database Management

We use Prisma for schema management and migrations.

```bash
# Sync database with schema (Recommended for Dev/Neon)
$ npx prisma db push

# Generate Prisma Client
$ npx prisma generate

# Open Prisma Studio to view data
$ npx prisma studio
```

## Compile and run the project

```bash
# development
$ pnpm start

# watch mode (Includes automatic port cleanup on port 3000)
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## Scripts & Sync

The backend includes utility scripts for data synchronization:

```bash
# Sync exchange rates from Binance
$ pnpm sync:binance

# Sync exchange rates from BCV
$ pnpm sync:bcv
```

## API Documentation

Swagger UI is available for API exploration:
- **Local:** `http://localhost:3000/api/docs`

## License

Akomo is [MIT licensed](LICENSE).
