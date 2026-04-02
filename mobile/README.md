# Mobile Client (React Native + Expo)

This folder contains a new mobile frontend for the cards game.

## Prerequisites

- Node.js 20+
- Expo Go app on iOS/Android device, or Android/iOS simulator

## Setup

1. Copy `.env.example` to `.env` and set backend URLs.
2. Install dependencies:

   npm install

3. Start app:

   npm run start

## Environment Variables

- `EXPO_PUBLIC_API_BASE_URL`: REST URL for authentication (e.g., `http://192.168.1.50:3000`)
- `EXPO_PUBLIC_SOCKET_URL`: Socket.IO URL (usually same host/port as API)

## Important

When testing on a physical phone, do not use `localhost`; use your machine LAN IP.
