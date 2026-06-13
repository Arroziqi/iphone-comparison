# iPhone Price Comparison Dashboard

A modern web application for comparing iPhone models and managing price data. Built with React, TypeScript, and Vite, featuring a responsive interface, product comparison tools, and local data persistence.

## Overview

This application allows users to:

- Browse available iPhone models
- Compare multiple iPhone models side-by-side
- View specification differences
- Analyze price differences
- Manage product data through an admin interface

The application is fully frontend-based and uses localStorage to simulate a backend database, making it easy to deploy and demonstrate without additional infrastructure.

## Features

### Product Catalog

- Browse all available iPhone models
- Product cards with key information
- Featured products section
- Responsive grid layout

### Product Comparison

- Compare up to 4 iPhone models simultaneously
- Side-by-side specification comparison
- Price difference analysis
- Cheapest and most expensive product indicators
- Best value recommendation
- Comparison history persistence

### Admin Management

- Create new iPhone models
- Update existing products
- Delete products
- Search products
- Sort product data
- Pagination support
- Form validation
- Confirmation dialogs

### Search

- Real-time search
- Search by:
  - Model name
  - Chipset
  - Release year

### Data Export

- Export comparison results to PDF
- Export product data to CSV

### User Experience

- Responsive design
- Dark mode / Light mode
- Theme persistence
- Toast notifications
- Loading states
- Empty states
- Error handling

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

### State Management

- Context API / Zustand

### Storage

- Browser localStorage

### Deployment

- Vercel

## Project Structure

```bash
src/
├── components/
├── pages/
├── hooks/
├── context/
├── services/
├── types/
├── utils/
├── assets/
├── routes/
└── data/
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to project folder:

```bash
cd iphone-price-comparison
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open browser:

```bash
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment

### Deploy to Vercel

1. Push project to GitHub
2. Import repository in Vercel
3. Configure framework as Vite
4. Deploy

No environment variables required.

## Data Persistence

The application uses localStorage as its data source.

Data is automatically seeded with sample iPhone models on first launch.

Stored data includes:

- Product catalog
- Product changes
- Comparison history
- Theme preference
- Recently viewed products

To reset all data:

```javascript
localStorage.clear();
```

## Future Improvements

The application architecture is designed to support future enhancements with minimal refactoring:

- Authentication
- Role management
- Cloud database integration
- Product image upload
- Advanced filtering
- Product favorites
- API integration
- Multi-language support

## Deliverables

- Complete source code
- Responsive UI
- Admin management module
- Product comparison module
- Build and deployment documentation
- Demo-ready implementation

## License

This project is provided for demonstration and evaluation purposes.
