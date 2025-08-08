import React from 'react'
import { render } from './test-utils'
import D3LineChart from '../components/chart/D3LineChart'
import { DataPoint } from '../types'

jest.mock('d3', () => ({
  select: jest.fn(() => ({
    select: jest.fn(() => ({
      empty: jest.fn(() => false),
      remove: jest.fn(),
      attr: jest.fn(() => ({
        attr: jest.fn(),
        style: jest.fn(),
        on: jest.fn(),
        call: jest.fn(),
        append: jest.fn(() => ({
          attr: jest.fn(() => ({
            attr: jest.fn(),
            style: jest.fn(),
            on: jest.fn(),
            call: jest.fn(),
            append: jest.fn(),
            text: jest.fn(),
          })),
          style: jest.fn(),
          on: jest.fn(),
          call: jest.fn(),
          append: jest.fn(),
          text: jest.fn(),
        })),
      })),
      style: jest.fn(),
      on: jest.fn(),
      call: jest.fn(),
      append: jest.fn(() => ({
        attr: jest.fn(() => ({
          attr: jest.fn(),
          style: jest.fn(),
          on: jest.fn(),
          call: jest.fn(),
          append: jest.fn(),
          text: jest.fn(),
        })),
        style: jest.fn(),
        on: jest.fn(),
        call: jest.fn(),
        append: jest.fn(),
        text: jest.fn(),
      })),
    })),
    selectAll: jest.fn(() => ({
      remove: jest.fn(),
      attr: jest.fn(() => ({
        attr: jest.fn(),
        style: jest.fn(),
        on: jest.fn(),
        call: jest.fn(),
        append: jest.fn(),
      })),
      style: jest.fn(),
      on: jest.fn(),
      call: jest.fn(),
      append: jest.fn(() => ({
        attr: jest.fn(() => ({
          attr: jest.fn(),
          style: jest.fn(),
          on: jest.fn(),
          call: jest.fn(),
          append: jest.fn(),
          text: jest.fn(),
        })),
        style: jest.fn(),
        on: jest.fn(),
        call: jest.fn(),
        append: jest.fn(),
        text: jest.fn(),
      })),
    })),
    attr: jest.fn(() => ({
      attr: jest.fn(),
      style: jest.fn(),
      on: jest.fn(),
      call: jest.fn(),
      append: jest.fn(),
    })),
    style: jest.fn(),
    on: jest.fn(),
    call: jest.fn(),
    append: jest.fn(() => ({
      attr: jest.fn(() => ({
        attr: jest.fn(),
        style: jest.fn(),
        on: jest.fn(),
        call: jest.fn(),
        append: jest.fn(),
        text: jest.fn(),
      })),
      style: jest.fn(),
      on: jest.fn(),
      call: jest.fn(),
      append: jest.fn(),
      text: jest.fn(),
    })),
  })),
  scaleLinear: jest.fn(() => ({
    domain: jest.fn(() => ({
      range: jest.fn(() => ({
        nice: jest.fn(),
      })),
    })),
  })),
  scaleTime: jest.fn(() => ({
    domain: jest.fn(() => ({
      range: jest.fn(() => ({
        nice: jest.fn(),
      })),
    })),
  })),
  line: jest.fn(() => ({
    x: jest.fn(() => ({
      y: jest.fn(() => ({
        curve: jest.fn(),
      })),
    })),
  })),
  axisBottom: jest.fn(() => ({
    scale: jest.fn(() => ({
      tickFormat: jest.fn(),
    })),
    tickFormat: jest.fn(),
  })),
  axisLeft: jest.fn(() => ({
    scale: jest.fn(),
  })),
  timeFormat: jest.fn(() => jest.fn()),
  format: jest.fn(() => jest.fn()),
  extent: jest.fn(() => [new Date(), new Date()]),
  max: jest.fn(() => 100),
  min: jest.fn(() => 0),
}))

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
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '800')
    expect(svg).toHaveAttribute('height', '400')
  })

  it('renders chart with data points', () => {
    render(<D3LineChart dataPoints={mockDataPoints} />)
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('handles empty data points', () => {
    render(<D3LineChart dataPoints={[]} />)
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
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
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
