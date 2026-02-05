# Deployment & Configuration Guide

This document outlines the steps to configure Firebase and deploy the Frenzo application to GitHub Pages.

## 1. Firebase Setup

### A. Create Project & Enable Services

1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Create a project (e.g., `frenzo-app`).
3.  **Authentication**: Enable Email/Password, Google, and Phone providers.
4.  **Firestore**: Create Database (Production Mode) and set Rules:
    ```javascript
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /user_activities/{document} {
           allow read, write: if request.auth != null && request.auth.uid == request.resource.data.userId;
        }
        match /{document=**} {
            allow read, write: if false;
        }
      }
    }
    ```

### B. Get Configuration Keys

1.  In Project Overview, click the **Web Icon (</>)**.
2.  Register the app (Nickname: "Frenzo Web").
3.  Copy the `firebaseConfig` properties (apiKey, authDomain, etc.).

### C. Local Environment

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## 2. GitHub Pages Deployment

Since this is a React app built with Vite, we use **GitHub Actions** to build and deploy it. Because the app needs the Firebase keys _during the build process_ to embed them into the JavaScript, you must provide them as **GitHub Secrets**.

### A. Add Secrets to GitHub

1.  Go to your GitHub Repository.
2.  Click **Settings** > **Secrets and variables** > **Actions**.
3.  Click **New repository secret**.
4.  Add each key from your `.env` file individually:

| Name                                | Value                              |
| ----------------------------------- | ---------------------------------- |
| `VITE_FIREBASE_API_KEY`             | `AIzaSy...`                        |
| `VITE_FIREBASE_AUTH_DOMAIN`         | `frenzo-baf50.firebaseapp.com`     |
| `VITE_FIREBASE_PROJECT_ID`          | `frenzo-baf50`                     |
| `VITE_FIREBASE_STORAGE_BUCKET`      | `frenzo-baf50.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `309608455773`                     |
| `VITE_FIREBASE_APP_ID`              | `1:309...`                         |
| `VITE_FIREBASE_MEASUREMENT_ID`      | `G-LS...`                          |

### B. Configure Workflow

Ensure your `.github/workflows/deploy.yml` (create if missing) passes these secrets to the build script.

**Example Workflow (`.github/workflows/deploy.yml`):**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install and Build
        run: |
          npm ci
          npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
          VITE_FIREBASE_MEASUREMENT_ID: ${{ secrets.VITE_FIREBASE_MEASUREMENT_ID }}

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
```
