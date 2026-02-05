# Frenzo App

A modern, feature-sliced React application with Firebase Authentication and Firestore.

## Configuration & Deployment

### Firebase Setup

This project uses Firebase for Authentication and Database.
For detailed setup instructions, including how to configure environment variables and deploy to GitHub Pages, please read [documents/DEPLOYMENT.md](./documents/DEPLOYMENT.md).

### Quick Start

1.  Copy `.env.example` to `.env` (or create one with your Firebase keys).
2.  Run `npm install`.
3.  Run `npm run dev`.

## Architecture

This project follows a Feature-Sliced Design. See [documents/ARCHITECTURE.md](documents/ARCHITECTURE.md) for details.

## Scripts

- `npm run dev`: Start dev server
- `npm run build`: Production build
- `npm run lint`: Run ESLint
