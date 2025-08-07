# TypeScript Interfaces

This directory contains all TypeScript interfaces used throughout the security metrics dashboard application. All interfaces are centralized in `index.ts` for easy importing and maintenance.

## Usage

Import interfaces from the centralized location:

```typescript
import { 
  DataPoint, 
  TimeRange, 
  CriticalityLevel,
  CVESummaryCardProps 
} from '../interfaces';
```

## Interface Categories

### Theme Context Interfaces
- `Palette` - MUI theme palette extension for advisories color
- `PaletteOptions` - MUI theme palette options extension
- `ThemeContextType` - Theme context provider interface
- `ThemeProviderProps` - Theme provider component props

### GraphQL Data Interfaces
- `DataPoint` - Individual data point for time series
- `MetricSummary` - Summary statistics for a metric
- `TimeSeriesSummary` - Complete summary of time series data
- `TimeSeriesData` - Complete time series dataset
- `TimeSeriesResponse` - GraphQL response wrapper
- `User` - User data structure
- `UserResponse` - User GraphQL response wrapper

### GraphQL Type Definitions
- `TimeRange` - Available time range options
- `CriticalityLevel` - Security criticality levels

### Component Props Interfaces
- `WrapperProps` - Main app wrapper component props
- `LogoProps` - Logo component props

### Chart Component Interfaces
- `CVESummaryData` - CVE summary data structure
- `CVESummaryCardProps` - CVE summary card component props
- `AdvisoriesSummaryData` - Advisories summary data structure
- `AdvisoriesSummaryCardProps` - Advisories summary card component props
- `SummaryData` - Combined summary data structure
- `SummaryCardsProps` - Summary cards container props
- `D3LineChartProps` - D3 chart component props
- `TimeRangeFilterProps` - Time range filter component props
- `CriticalityFilterProps` - Criticality filter component props
- `ChartControlsProps` - Chart controls component props

### Utility Interfaces
- `TooltipState` - D3 chart tooltip state
- `ChartDimensions` - Chart dimensions structure

## Benefits of Centralized Interfaces

1. **Single Source of Truth**: All interfaces are defined in one place
2. **Easy Maintenance**: Changes to interfaces only need to be made in one file
3. **Type Safety**: Consistent typing across the entire application
4. **Better IDE Support**: Improved autocomplete and type checking
5. **Reduced Duplication**: No duplicate interface definitions across files

## Migration Notes

When adding new interfaces:
1. Add them to `src/interfaces/index.ts`
2. Update this README with documentation
3. Import from the centralized location in components
4. Remove any duplicate interface definitions from component files

## Backward Compatibility

The GraphQL queries file (`src/api/graphql-queries.ts`) re-exports types for backward compatibility, so existing imports will continue to work.
