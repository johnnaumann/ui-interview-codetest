# Security Metrics Dashboard Frontend

A modern React-based dashboard for visualizing security metrics using D3.js charts and Apollo GraphQL for data fetching. Built with Next.js 15, Material-UI 7, and TypeScript.

## 📝 Assignment Overview

This project implements a modern, interactive dashboard that visualizes security metrics over time using the provided GraphQL API. The focus is on creating an intuitive and responsive visualization that helps users quickly understand security trends and patterns.

### ✅ Technical Requirements Met

- **React for the frontend framework** ✅ Next.js 15 with React 19
- **Material-UI for the component library** ✅ Material-UI 7.3.1 with custom theming
- **Apollo Client for GraphQL integration** ✅ Apollo Client 3.13.9 with TypeScript
- **D3.js for the chart implementation** ✅ D3.js 7.9.0 with custom line chart

## 🚀 Core Features Implementation

### Interactive Line Chart ✅
- **Display security metrics over time**: Real-time visualization of CVE and advisory data
- **Support for multiple data series**: Dual-line chart showing CVEs and Advisories
- **Smooth animations for data updates**: D3.js transitions and Material-UI animations
- **Responsive design**: Chart adapts to different screen sizes with responsive breakpoints

### Filtering System ✅
- **Filter data by criticality levels**: Interactive chips for Critical, High, Medium, Low, None
- **Real-time updates when filters change**: Immediate chart updates via Apollo Client
- **Clear visual indication of active filters**: Selected chips with custom styling and 25% opacity hover states

### Enhanced User Experience ✅
- **Interactive tooltips**: Detailed information on hover with formatted timestamps and values
- **Smooth transitions and animations**: D3.js transitions and Material-UI component animations
- **Clear data visualization**: Color-coded lines
- **Responsive layout**: Mobile-first design with adaptive layouts

### Modern Design Elements ✅
- **Clean, professional interface**: Material-UI design system with custom branding
- **Consistent spacing and typography**: Roboto font with consistent spacing system
- **Appropriate use of color**: Semantic color coding for data and interactions
- **Clear visual hierarchy**: Card-based layout with clear information architecture

## 🎯 Evaluation Criteria Coverage

### Technical Implementation ✅
- **Code organization and structure**: Modular component architecture with clear separation of concerns
- **Proper use of React patterns and hooks**: Custom hooks, context providers, and functional components
- **Efficient data fetching and state management**: Apollo Client with GraphQL queries and local state

### Visualization Quality ✅
- **Clarity of data presentation**: Clean line charts with clear axes and labels
- **Effectiveness of interactive elements**: Hover tooltips, clickable filters, smooth animations
- **Responsiveness and adaptability**: Mobile-responsive charts with adaptive sizing
- **Smooth animations and transitions**: D3.js transitions and Material-UI animations

### User Experience ✅
- **Intuitive filtering system**: Time range dropdown and criticality chip filters
- **Helpful tooltips and information display**: Detailed hover information with formatted data
- **Overall usability and accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Error handling and loading states**: Loading spinners, error boundaries, and graceful fallbacks

### Code Quality ✅
- **Clean, maintainable code**: TypeScript with comprehensive interfaces and documentation
- **Proper TypeScript usage**: Full type safety with custom interfaces and generics
- **Appropriate error handling**: Try-catch blocks, error boundaries, and user-friendly messages

## 🏆 Bonus Features Implemented

### Additional Chart Types ✅
- **Summary Cards**: Visual summary statistics with delta indicators

### Advanced Filtering Options ✅
- **Time range filtering**: 3, 7, 14, 30 day options with real-time updates
- **Criticality filtering**: Multi-select chips with visual feedback
- **Combined filtering**: Filters work together for precise data selection

### Custom Theme Implementation ✅
- **Dark/Light theme toggle**: Complete theme switching with custom color palettes
- **Custom Material-UI theme**: Extended theme with security-focused color scheme
- **Responsive theming**: Theme adapts to different screen sizes

### Unit Tests ✅
- **Comprehensive test coverage**: Tests for all components and utilities

## 🔄 Recent Updates

The codebase has been optimized with the following architectural improvements:

### Component Architecture
- **Removed unused ChartControls component**: Replaced with FilterWrapper for better responsive design
- **Optimized Logo component**: Simplified props interface (removed unused className prop)
- **Enhanced CriticalityFilter**: Added 25% opacity hover states for better UX
- **Improved test coverage**: Updated all test suites to reflect current component implementations

### Code Quality
- **Removed dead code**: Eliminated unused components and props
- **Updated type definitions**: Cleaned up unused TypeScript interfaces
- **Test alignment**: All tests now accurately reflect actual component functionality

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### UI & Styling
- **Material-UI 7.3.1** - Component library with custom theme
- **@mui/icons-material** - Material Design icons
- **@toolpad/core** - Theme provider integration

### Data Visualization
- **D3.js 7.9.0** - Data-driven document manipulation

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
│   │   │   ├── ChartTitle.tsx
│   │   │   ├── CriticalityFilter.tsx
│   │   │   ├── CVESummaryCard.tsx
│   │   │   ├── D3LineChart.tsx
│   │   │   ├── FilterWrapper.tsx
│   │   │   ├── SummaryCards.tsx
│   │   │   ├── TimeRangeFilter.tsx
│   │   │   └── index.ts
│   │   ├── Chart.tsx          # Main chart container
│   │   ├── LoadingOverlay.tsx # Loading state component
│   │   ├── Logo.tsx           # Application logo
│   │   ├── ThemeToggle.tsx    # Theme switcher
│   │   └── Wrapper.tsx        # Layout wrapper
│   ├── contexts/              # React contexts
│   │   └── ThemeContext.tsx   # Theme management
│   ├── types/                 # TypeScript interfaces
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
git clone https://github.com/your-username/ui-interview-codetest.git
cd ui-interview-codetest

# Install all dependencies (single package.json)
yarn install

# Start both GraphQL server and frontend
yarn dev
```

**Option 2: Install frontend only**
```bash
# Clone the repository
git clone https://github.com/your-username/ui-interview-codetest.git
cd ui-interview-codetest

# Install all dependencies (single package.json)
yarn install

# Start frontend only (requires GraphQL server on port 3000)
yarn dev:frontend
```

### Access the Application
- **Frontend**: [http://localhost:3001](http://localhost:3001)
- **GraphQL Server**: [http://localhost:3000](http://localhost:3000)

### Available Scripts

**Root Scripts (run from project root):**
- `yarn dev` - Start both GraphQL server and frontend concurrently
- `yarn dev:server` - Start GraphQL server only
- `yarn dev:frontend` - Start frontend only
- `yarn build` - Build the frontend application
- `yarn start` - Start the production frontend
- `yarn test` - Run frontend tests
- `yarn test:watch` - Run frontend tests in watch mode
- `yarn test:coverage` - Run frontend tests with coverage report
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
- **Custom color palette**
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