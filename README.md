# AKomo

AKomo is a comprehensive solution for tracking currency rates in Venezuela, featuring a robust backend for data synchronization and a user-friendly mobile application.

## 📂 Project Structure

Verified as a monorepo containing:

- **[`mobile`](./mobile)**: A React Native application built with [Expo](https://expo.dev).
- **[`backend`](./backend)**: A RESTful API built with [NestJS](https://nestjs.com).

## 🚀 Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **pnpm** (Package manager)

### Installation

Since this repository contains two separate projects, you need to install dependencies for each one individually.

#### Backend

```bash
cd backend
pnpm install
```

#### Mobile

```bash
cd mobile
pnpm install
```

## 🛠 Usage

### Backend

The backend service handles API requests and synchronizes currency rates (e.g., from Binance, BCV).

Start the development server:
```bash
cd backend
pnpm start:dev
```

**Sync Scripts:**
- Sync Binance rates: `pnpm sync:binance`
- Sync BCV rates: `pnpm sync:bcv`

### Mobile App

The mobile application is built with Expo.

Start the Expo development server:
```bash
cd mobile
pnpm start
```

You can then open the app in:
- **Expo Go**: Scan the QR code with your phone.
- **Android Emulator**: Press `a`.
- **iOS Simulator**: Press `i`.
- **Web**: Press `w`.

## 🏗 Tech Stack

### Mobile
- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Routing**: Expo Router
- **UI/Styling**: Lucide React Native, Expo Vector Icons, Noto Sans Font
- **Forms**: React Hook Form

### Backend
- **Framework**: NestJS
- **Database**: Supabase (PostgreSQL)
- **Data Sync**: Axios, Cheerio (for scraping)
- **Validation**: Class Validator

## 📝 Configuration

Ensure you have the necessary environment variables set up for both `backend` and `mobile`.
- **Backend**: Requires Supabase credentials and database connection strings.
- **Mobile**: May require API endpoints and public keys.

Refer to `.env.example` files in the respective directories if available.

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.
