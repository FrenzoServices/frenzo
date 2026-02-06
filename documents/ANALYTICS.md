# Analytics & Admin Dashboard Documentation

## Overview

Frenzo includes a custom-built analytics engine designed to track visitor behavior and generate leads without relying on third-party cookies. This data is visualized in the Admin Dashboard, allowing for deep insights into user engagement.

## Data Collection Strategy

### 1. Anonymous Visitor Tracking

- **Device Fingerprinting**: We generate a unique `uuid` for every visitor and store it in `localStorage`. This allows us to track returning visitors even if they don't log in.
- **Page Views**: Every route change triggers a `log_event` to Firestore.
- **Session Data**: We capture:
  - IP Address (for location approximation)
  - User Agent (Device Type, Browser)
  - Referrer
  - Time on Site (inferred from event timestamps)

### 2. Identity Resolution

- When a user **Logs In** or **Registers**, we link their anonymous `visitorId` to their authenticated `userId`.
- This allows us to see the _past history_ of a now-known client (e.g., "They visited the Pricing page 5 times before signing up").

## Admin Dashboard Features

### A. Business Dashboard (`/dashboard`)

- **Metrics**: Total Visitors, Total Views, Unique Users, Conversion Rate.
- **Visualization**: Charts displaying traffic trends over time.

### B. Visitor List Table

- **Path**: Accessible via the "View All Visitors" link.
- **Columns**:
  - **User**: "Guest" or Name (if resolved).
  - **Location**: City/Country (IP-based).
  - **Device**: Mobile/Desktop icon.
  - **Last Active**: Real-time timestamp.
  - **Visits**: Count of distinct sessions.
- **Pagination**: Server-side pagination handles thousands of records efficiently.

### C. Visitor Detail View (`/admin/visitor/:id`)

- **Timeline**: A chronological feed of every action the user took (Page Views, Clicks, Form Submits).
- **Profile Integration**: If the user has a profile, we display their specific requirements, phone number, and company details alongside their activity.

## Audit Tool Integration

- The **Tech Stack Audit** (`/audit`) is a lead generation tool.
- **Saving Results**:
  - **Logged In**: Results are saved to the `users` collection under the `audit` field.
  - **Anonymous**: Users are prompted to log in to save functionality.
- **Admin View**: Admins can view a client's Audit Score and Answers directly in the User Profile section of the dashboard, providing context for sales calls.
