# Zinthiya Trust - Frontend Application

Official frontend web portal for **The Zinthiya Trust** (Charity #1137350), supporting crisis intervention, poverty alleviation, women & children refuge support, and charitable grant distribution in Leicestershire.

## Features

- **Public Giving Portal**: Public campaign awareness, donation workflows, and charity impact highlights.
- **Donor Management & Portal**: Recurring and one-off giving, Gift Aid verification, donation history, and dynamic receipts.
- **Beneficiary Support Hub**: Individual and organisation self-service, welfare assistance requests, case document tracking, and advocate communications.
- **Administrative Suite**: Comprehensive back-office dashboard featuring:
  - Granular CRM for donors, campaigns, and pledges
  - Casework and beneficiary management
  - Fund Allocation & Distribution ledger with dynamic funding targets
  - Staff management & activity audit logs
  - Multi-channel communication & newsletter dispatches

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Bundler & Tooling**: Vite 6 & React Router v6
- **State Management & Querying**: Zustand & TanStack React Query

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- `pnpm` (or `npm`)

### Installation

```bash
# Install dependencies
pnpm install
```

### Running Locally

```bash
# Start Vite development server
pnpm run dev
```

The portal will be accessible at `http://localhost:5173`.

### Production Build

```bash
# Type-check and build production bundle
pnpm run build

# Preview production build
pnpm run preview
```
