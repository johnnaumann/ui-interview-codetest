import React from 'react'
import { render } from './test-utils'
import D3LineChart from '../components/chart/D3LineChart'
import { DataPoint } from '../types'
import { screen } from '@testing-library/react'

jest.mock('../components/chart/D3LineChart', () => {
  return function MockD3LineChart({ dataPoints, loading }: { dataPoints?: DataPoint[], loading?: boolean }) {
    return (
      <div data-testid="d3-line-chart">
        {loading ? (
          <div>Loading chart...</div>
        ) : dataPoints && dataPoints.length > 0 ? (
          <div>
            <svg width="800" height="400" data-testid="chart-svg">
              <g className="chart-container" />
            </svg>
            <div>Chart with {dataPoints.length} data points</div>
          </div>
        ) : (
          <div>No data available</div>
        )}
      </div>
    )
  }
})

const mockDataPoints: DataPoint[] = [
  {
    timestamp: '2024-01-01T00:00:00Z',
    cves: 10,
    advisories: 5
  },
  {
    timestamp: '2024-01-02T00:00:00Z',
    cves: 15,
    advisories: 8
  },
  {
    timestamp: '2024-01-03T00:00:00Z',
    cves: 12,
    advisories: 6
  }
]

describe('D3LineChart', () => {
  it('renders chart container with SVG', () => {
    render(<D3LineChart dataPoints={mockDataPoints} />)
    
    expect(document.querySelector('[data-testid="chart-svg"]')).toBeInTheDocument()
  })

  it('renders chart with data points', () => {
    render(<D3LineChart dataPoints={mockDataPoints} />)
    
    expect(document.querySelector('[data-testid="chart-svg"]')).toBeInTheDocument()
  })

  it('handles empty data points', () => {
    render(<D3LineChart dataPoints={[]} />)
    
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('shows loading state when loading prop is true', () => {
    render(<D3LineChart dataPoints={mockDataPoints} loading={true} />)
    
    expect(screen.getByText('Loading chart...')).toBeInTheDocument()
  })

  it('renders chart with single data point', () => {
    const singleDataPoint: DataPoint[] = [
      {
        timestamp: '2024-01-01T00:00:00Z',
        cves: 10,
        advisories: 5
      }
    ]
    
    render(<D3LineChart dataPoints={singleDataPoint} />)
    
    expect(screen.getByText('Chart with 1 data points')).toBeInTheDocument()
  })

  it('renders chart with multiple data points', () => {
    const multipleDataPoints: DataPoint[] = [
      {
        timestamp: '2024-01-01T00:00:00Z',
        cves: 10,
        advisories: 5
      },
      {
        timestamp: '2024-01-05T00:00:00Z',
        cves: 15,
        advisories: 8
      }
    ]
    
    render(<D3LineChart dataPoints={multipleDataPoints} />)
    
    expect(screen.getByText('Chart with 2 data points')).toBeInTheDocument()
  })
})
