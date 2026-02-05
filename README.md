# Frenzo Services Platform

A modern, feature-sliced React application designed as a **Business Service Platform**. It features robust Authentication (Email/Phone/Google), a Business Dashboard for client requirements, and a custom privacy-focused Analytics engine.

## 🚀 Key Features

### 1. Business Intelligence & Analytics

- **Proprietary Analytics Engine**: Tracks unique visitors using privacy-friendly Device IDs (no invasive IP scraping).
- **Admin Dashboard**: Dedicated view for `contact@frenzo.services` to monitor traffic, popular pages, and user acquisition channels.
- **Event Tracking**: Logs Page Views and Login Methods (Email vs Phone vs Google).

### 2. Client Portal (Dashboard)

- **Business Profile**: Clients can manage their Company Name, Contact Info, and detailed Business Requirements.
- **Smart Forms**: The "Start a Project" contact form auto-fills and locks data for authenticated users to ensure data integrity.

### 3. Authentication & Security

- **Multi-Method Login**: Supports Email/Password, Google OAuth, and Phone Number (SMS) authentication.
- **Protected Routes**: Secures Dashboard, Pricing, and Service Detail pages.
- **Firestore Security**:
  - **Strict Ownership**: Users can only read/write their own profiles.
  - **Public Analytics**: Specialized rules allow public write access for analytics events but restrict read access to Admins only.

## 🛠 Tech Stack

- **Frontend**: React (Vite), React Router v6
- **Styling**: CSS Modules / Global CSS (Dark Theme System)
- **Backend / BaaS**: Firebase (Auth, Firestore)
- **Architecture**: Feature-Sliced Design (FSD)

## 📂 Configuration & Deployment

### Firebase Setup

This project relies on Firebase. You must provide your own credentials.
For detailed setup instructions, including Environment Variables and GitHub Pages deployment, see [documents/DEPLOYMENT.md](./documents/DEPLOYMENT.md).

### Quick Start

1.  Clone the repository.
2.  Copy `.env.example` to `.env` and fill in your Firebase Keys.
3.  Run `npm install`.
4.  Run `npm run dev` to start the local server.

## 🏗 Architecture

This project follows a **Feature-Sliced Design** approach to ensure scalability.
See [documents/ARCHITECTURE.md](./documents/ARCHITECTURE.md) for a deep dive into the folder structure and coding standards.
