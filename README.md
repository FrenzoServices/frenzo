# Frenzo - Freedom to Scale

The official website for **Frenzo**, a global digital growth systems company.

## 🚀 Overview

Frenzo empowers creators and businesses to build independent, scalable, and revenue-driven digital infrastructure. This repository contains the source code for the Frenzo public-facing website.

## 🛠️ Tech Stack

- **Framework**: React (via Vite)
- **Styling**: Vanilla CSS (Variables, Flexbox/Grid) for premium, lightweight design.
- **Routing**: `react-router-dom`
- **Deployment**: GitHub Actions (Pages)

## ⚡ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/frenzo.git
   cd frenzo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local development server:

```bash
npm run dev
```

Access the site at `http://localhost:5173`.

## 📦 Building for Production

To create a production build (outputs to `/dist`):

```bash
npm run build
```

## 🚀 Deployment (GitHub Actions)

This project is configured to automatically deploy to **GitHub Pages** using GitHub Actions.

### Workflow

The deployment workflow is defined in `.github/workflows/deploy.yml`.

1.  **Trigger**: Pushes to the `main` branch.
2.  **Build**: Installs dependencies and runs `npm run build`.
3.  **Deploy**: Uploads the `dist` folder to the `gh-pages` branch using `JamesIves/github-pages-deploy-action`.

### Setup Steps

To enable deployment on your GitHub repository:

1.  **Push Code**: Push this code to your GitHub repository (main branch).
2.  **Wait for Action**: The Action will run automatically on push. Wait for it to complete (check the "Actions" tab).
3.  **Configure Pages**:
    - Go to **Settings > Pages** in your repository.
    - Under **Source**, select **Deploy from a branch**.
    - Select **gh-pages** as the branch.
    - Click **Save**.
4.  **Live Site**: Your site will be live at `https://<username>.github.io/frenzo/`.

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/    # Navbar, Footer
│   └── ui/        # Reusable UI components (Button, Card, Section)
├── pages/         # Page components (Home, About, Services, etc.)
├── styles/        # Global CSS and variables
├── App.jsx        # Main application component & Routing
└── main.jsx       # Entry point
```

## 📄 License

All rights reserved. Frenzo 2026.
