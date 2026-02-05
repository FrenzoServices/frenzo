# Frenzo Architecture & Coding Standards

## 1. Architectural Pattern: Feature-Sliced Design (Hybrid)

We will move away from a pure "Layered" structure (`/components`, `/pages`) towards a **Feature-Based** structure for complex logic. This ensures "Screaming Architecture"—the folder structure tells you what the app _does_.

### Folder Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Shared "dumb" UI components (Design System)
│   ├── ui/          # Atoms: Button, Input, Card, Modal
│   ├── layout/      # Organisms: Navbar, Footer, Section
├── config/          # Global configuration (constants, environment)
├── features/        # Business Logic & Complex Features
│   ├── auth/        # FEATURE: Authentication
│   │   ├── api/     # authService.js (Register, Login, Google, Phone)
│   │   ├── components/ # LoginForm, ProtectedRoute
│   ├── analytics/   # FEATURE: Business Intelligence (New)
│   │   ├── analyticsService.js # Logic: Device ID, Page Logging, Aggregation
│   │   └── components/ # AdminAnalyticsView
│   ├── dashboard/   # FEATURE: User Portal
│   │   ├── components/ # AdminAnalyticsView (Consumed here)
│   │   └── styles/     # Dashboard specific styles
│   ├── contact/     # FEATURE: Contact Forms & Logic
│   └── solutions/   # FEATURE: Services & Use Cases
├── hooks/           # Shared global hooks (useScroll, useWindowSize)
├── lib/             # Utilities and helpers (firebase, date formatting)
├── pages/           # Page Routings (Page-level composition only)
└── styles/          # Global styles
```

## 2. Design Patterns

### A. Custom Hooks (Logic/UI Separation)

**Rule**: Components should not contain complex logic.

- **Bad**: `Pricing.jsx` having `calculateTotal()` and `useEffect` inside.
- **Good**: `const { total, subtotal } = usePricingCalculator();`
- **Why**: Follows **Single Responsibility Principle (SRP)**. The Component handles _Rendering_, the Hook handles _Logic_.

### B. Compound Components

For complex UI elements (like the Calculator or Tabs), use Compound Components to avoid "Prop Drilling".

### C. Container/Presentational

- **Container**: Fetches data, executes logic (often a Page or Feature Root).
- **Presentation**: Pure UI receives props and renders.

## 3. SOLID Principles in React

1.  **SRP (Single Responsibility)**: A file/component should do one thing.
2.  **OCP (Open/Closed)**: Open for extension, closed for modification.
3.  **LSP (Liskov Substitution)**: UI components (buttons, cards) should behave predictably and accept standard DOM props.
4.  **ISP (Interface Segregation)**: Don't pass massive objects to small components. Pass only what they need.
5.  **DIP (Dependency Inversion)**: High-level modules should not depend on low-level modules. Use abstractions (hooks/configs).

## 4. Authentication & Data Strategy

### A. Authentication (feature/auth)

We follow the **Repository/Service Pattern** (loosely) to decouple React Components from Firebase SDK.

- **Service Layer (`features/auth/api`)**: Direct calls to `firebase/auth` and `firestore`. Returns promises/data, not SDK objects if possible.
- **Global Store (`context/AuthContext`)**: Holds the _User State_ (isLoggedIn, userProfile).
- **Hooks (`hooks/useAuth`)**: Consumes the context. Components only use this hook.

### B. Persistence & Analytics

- **User Data**: Stored in `users/{uid}`. Strict R/W access for the owner only.
- **Analytics Data**: Stored in `analytics_events`.
  - **Write Strategy**: Open to public (allow `create` if true) to capture guest traffic.
  - **Read Strategy**: Restricted to Admin Email (`contact@frenzo.services`) via Security Rules.
  - **Identity**: Uses a persistent `uuid` in `localStorage` to track unique devices across sessions.
