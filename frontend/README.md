# Security Metrics Dashboard Frontend

A modern React-based dashboard for visualizing security metrics using D3.js charts and Apollo GraphQL for data fetching. Built with Next.js 15, Material-UI 7, and TypeScript.

## 🚀 Features

- **Interactive D3.js Line Charts**: Real-time visualization of CVE and advisory data
- **Dynamic Filtering**: Time range and criticality level filters
- **Responsive Design**: Mobile-first approach with Material-UI components
- **Dark/Light Theme**: Theme toggle with custom color palette
- **Real-time Data**: Apollo GraphQL integration for live data updates
- **Type Safety**: Full TypeScript implementation with comprehensive interfaces
- **Testing**: Jest and React Testing Library for component testing

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### UI & Styling
- **Material-UI 7.3.1** - Component library with custom theme
- **@emotion/react & @emotion/styled** - CSS-in-JS styling
- **@mui/icons-material** - Material Design icons
- **@toolpad/core** - Theme provider integration

### Data Visualization
- **D3.js 7.9.0** - Data-driven document manipulation
- **@types/d3** - TypeScript definitions for D3

### Data Fetching
- **Apollo Client 3.13.9** - GraphQL client
- **GraphQL 16.11.0** - Query language

### Testing
- **Jest 30.0.5** - Testing framework
- **@testing-library/react** - React component testing
- **@testing-library/jest-dom** - Custom Jest matchers
- **@testing-library/user-event** - User interaction simulation
- **jest-environment-jsdom** - DOM testing environment

### Development Tools
- **ESLint 9** - Code linting with Next.js config
- **Node.js 20** - Runtime environment

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with theme provider
│   │   └── page.tsx           # Main dashboard page
│   ├── components/            # React components
│   │   ├── chart/            # Chart-specific components
│   │   │   ├── AdvisoriesSummaryCard.tsx
│   │   │   ├── ChartControls.tsx
│   │   │   ├── ChartTitle.tsx
│   │   │   ├── CriticalityFilter.tsx
│   │   │   ├── CVESummaryCard.tsx
│   │   │   ├── D3LineChart.tsx
│   │   │   ├── SummaryCards.tsx
│   │   │   └── TimeRangeFilter.tsx
│   │   ├── Chart.tsx          # Main chart container
│   │   ├── Logo.tsx           # Application logo
│   │   ├── ThemeToggle.tsx    # Theme switcher
│   │   └── Wrapper.tsx        # Layout wrapper
│   ├── contexts/              # React contexts
│   │   └── ThemeContext.tsx   # Theme management
│   ├── interfaces/            # TypeScript interfaces
│   │   └── index.ts           # All type definitions
│   ├── api/                   # API integration
│   │   ├── apollo-client.ts   # Apollo Client configuration
│   │   └── graphql-queries.ts # GraphQL queries
│   ├── lib/                   # Utility libraries
│   │   ├── branding.tsx       # Brand configuration
│   │   ├── navigation.tsx     # Navigation utilities
│   │   └── router.ts          # Routing utilities
│   └── tests/                 # Test files
│       ├── test-utils.tsx     # Testing utilities
│       └── [component].test.tsx # Component tests
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── next.config.ts            # Next.js configuration
├── jest.config.js            # Jest configuration
├── jest.setup.js             # Jest setup file
├── tsconfig.json             # TypeScript configuration
└── eslint.config.mjs         # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ui-interview-codetest/frontend
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report

## 📊 Data Structure

### GraphQL Schema
The application fetches data through GraphQL queries with the following structure:

```graphql
query GetTimeSeriesData($timeRange: TimeRange, $criticalities: [CriticalityLevel!]) {
  timeSeriesData(timeRange: $timeRange, criticalities: $criticalities) {
    dataPoints {
      timestamp
      cves
      advisories
    }
    summary {
      cves {
        averageValue
        delta
      }
      advisories {
        averageValue
        delta
      }
      timeRange
      criticalities
    }
  }
}
```

### TypeScript Interfaces
Comprehensive type definitions for:
- **DataPoint**: Individual time series data points
- **MetricSummary**: Summary statistics with averages and deltas
- **TimeRange**: Available time ranges (3, 7, 14, 30 days)
- **CriticalityLevel**: Security levels (NONE, LOW, MEDIUM, HIGH, CRITICAL)

## 🎨 Theming

The application uses a custom Material-UI theme with:
- **Light/Dark mode toggle**
- **Custom color palette** for advisories
- **Responsive breakpoints**
- **Typography system** with Roboto font

## 🧪 Testing

The project includes comprehensive testing with:
- **Unit tests** for all components
- **Integration tests** for data flow
- **Accessibility testing** with React Testing Library
- **Coverage reporting** with Jest

Run tests with:
```bash
yarn test
yarn test:coverage
```

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Mobile-first approach**
- **Grid-based layouts**
- **Adaptive chart sizing**
- **Touch-friendly controls**

## 🔧 Configuration

### Next.js Configuration
- App Router enabled
- TypeScript support
- Custom webpack configuration for D3.js

### Jest Configuration
- Next.js integration
- DOM testing environment
- Coverage collection
- Module path mapping

### ESLint Configuration
- Next.js recommended rules
- TypeScript support
- Custom rule overrides

## 🤝 Contributing

1. Follow the existing code style and TypeScript patterns
2. Write tests for new components
3. Update interfaces when adding new data structures
4. Ensure responsive design for all new components

## 📄 License

This project is part of a UI interview code test.
