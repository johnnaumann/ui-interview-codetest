import React from 'react'
import { render, screen } from './test-utils'
import D3LineChart from '../components/chart/D3LineChart'
import { DataPoint } from '../types'


jest.mock('d3', () => {
  const mockChain = {
    attr: jest.fn(() => mockChain),
    style: jest.fn(() => mockChain),
    on: jest.fn(() => mockChain),
    transition: jest.fn(() => mockChain),
    duration: jest.fn(() => mockChain),
    delay: jest.fn(() => mockChain),
    ease: jest.fn(() => mockChain),
    remove: jest.fn(() => mockChain),
    data: jest.fn(() => mockChain),
    append: jest.fn(() => mockChain),
    selectAll: jest.fn(() => mockChain),
    node: jest.fn(() => ({ getTotalLength: () => 100 })),
  };

  return {
    select: jest.fn(() => mockChain),
    scaleTime: jest.fn(() => ({
      domain: jest.fn(() => ({
        range: jest.fn(),
      })),
    })),
    scaleLinear: jest.fn(() => ({
      domain: jest.fn(() => ({
        range: jest.fn(),
      })),
    })),
    line: jest.fn(() => ({
      x: jest.fn(() => ({
        y: jest.fn(() => ({
          curve: jest.fn(),
        })),
      })),
    })),
    curveMonotoneX: jest.fn(),
    extent: jest.fn(() => [new Date(), new Date()]),
    max: jest.fn(() => 100),
    easeLinear: jest.fn(),
  };
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
  it('renders chart container', () => {
    render(<D3LineChart dataPoints={mockDataPoints} />)
    
    const chartContainer = screen.getByRole('img', { hidden: true })
    expect(chartContainer).toBeInTheDocument()
  })

  it('displays date range label', () => {
    render(<D3LineChart dataPoints={mockDataPoints} />)
    

    expect(screen.getByText(/Mon, January 1 – Wed, January 3/)).toBeInTheDocument()
  })

  it('renders chart when data points are provided', () => {
    render(<D3LineChart dataPoints={mockDataPoints} />)
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('handles empty data points', () => {
    render(<D3LineChart dataPoints={[]} />)
    

    expect(screen.getByText('')).toBeInTheDocument()
  })

  it('shows loading state when loading prop is true', () => {
    render(<D3LineChart dataPoints={mockDataPoints} loading={true} />)
    

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
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
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('formats date range correctly for multiple data points', () => {
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
    
    expect(screen.getByText(/Mon, January 1 – Fri, January 5/)).toBeInTheDocument()
  })
})
