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
│   │   │   ├── FilterWrapper.tsx
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
- **Node.js**: Version 18.18.0 or higher (required for Next.js)
- **Yarn**: Version 1.22.22 or higher

### Installation

**Option 1: Install from project root (Recommended)**
```bash
# Clone the repository
git clone https://github.com/johnnaumann/ui-interview-codetest.git
cd ui-interview-codetest

# Install all dependencies (root + frontend) concurrently
yarn install:all

# Start both GraphQL server and frontend
yarn dev
```

**Option 2: Install frontend only**
```bash
# Clone the repository
git clone https://github.com/johnnaumann/ui-interview-codetest.git
cd ui-interview-codetest/frontend

# Install frontend dependencies
yarn install

# Start frontend only (requires GraphQL server on port 3000)
yarn dev
```

### Access the Application
- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **GraphQL Server**: [http://localhost:3000](http://localhost:3000)

### Available Scripts

**Frontend Scripts (run from frontend directory):**
- `yarn dev` - Start development server on port 3001
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report

**Root Scripts (run from project root):**
- `yarn dev` - Start both GraphQL server and frontend concurrently
- `yarn dev:server` - Start GraphQL server only
- `yarn dev:frontend` - Start frontend only
- `yarn install:all` - Install dependencies in both root and frontend concurrently
- `yarn build` - Build the frontend application
- `yarn test` - Run frontend tests
- `yarn lint` - Run frontend linting

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

### Filter Layout
- **Desktop**: Time range filter on left, criticality filter on right
- **Mobile**: Filters stack vertically with optimized sizing
- **Responsive chips**: Smaller, more compact criticality chips on mobile
- **Full-width selects**: Time range filter takes full width on mobile
- **Centered alignment**: Criticality chips center on mobile for better visual balance

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

## 🔧 Troubleshooting

### Node.js Version Issues
```bash
# Check your Node.js version
node --version

# Should be 18.18.0 or higher for Next.js compatibility
```

### Port Conflicts
```bash
# Stop all running processes
pkill -f "nodemon\|next"

# Restart with
yarn dev
```

### Dependency Issues
```bash
# Clean install all dependencies
rm -rf node_modules
yarn install
```

### GraphQL Server Connection
- Ensure the GraphQL server is running on port 3000
- Check that the frontend can connect to http://localhost:3000
- Verify Apollo Client configuration in `src/api/apollo-client.ts`

## 🤝 Contributing

1. Follow the existing code style and TypeScript patterns
2. Write tests for new components
3. Update interfaces when adding new data structures
4. Ensure responsive design for all new components
5. Use yarn for all package management operations

## 📄 License

This project is part of a UI interview code test.
