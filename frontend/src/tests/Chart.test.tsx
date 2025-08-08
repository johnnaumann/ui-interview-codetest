import React from 'react'
import { render, screen } from './test-utils'
import Chart from '../components/Chart'


jest.mock('@apollo/client', () => ({
  useQuery: jest.fn()
}))


jest.mock('../api/graphql-queries', () => ({
  GET_TIME_SERIES_DATA: 'mock-query',
}))


jest.mock('../types', () => ({
  TimeRange: {
    THREE_DAYS: 'THREE_DAYS',
    SEVEN_DAYS: 'SEVEN_DAYS',
    FOURTEEN_DAYS: 'FOURTEEN_DAYS',
    THIRTY_DAYS: 'THIRTY_DAYS',
  },
  CriticalityLevel: {
    NONE: 'NONE',
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    CRITICAL: 'CRITICAL',
  },
}))

import { useQuery } from '@apollo/client';

const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;

const mockData = {
  timeSeriesData: {
    dataPoints: [
      {
        timestamp: '2024-01-01T00:00:00Z',
        cves: 10,
        advisories: 5
      },
      {
        timestamp: '2024-01-02T00:00:00Z',
        cves: 15,
        advisories: 8
      }
    ],
    summary: {
      cves: {
        averageValue: 25.5,
        delta: 12.3
      },
      advisories: {
        averageValue: 18.7,
        delta: -3.2
      }
    }
  }
}

describe('Chart', () => {
  beforeEach(() => {
    mockUseQuery.mockClear()
  })

  it('renders dashboard title', () => {
    mockUseQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: null
    })

    render(<Chart />)
    
    expect(screen.getByText('Security Metrics Dashboard')).toBeInTheDocument()
  })

  it('displays current date subtitle', () => {
    mockUseQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: null
    })

    render(<Chart />)
    
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    expect(screen.getByText(currentDate)).toBeInTheDocument()
  })

  it('shows loading spinner when data is loading', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null
    })

    render(<Chart />)
    

    expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
  })

  it('shows error message when there is an error', () => {
    const errorMessage = 'Failed to load data'
    mockUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: { message: errorMessage }
    })

    render(<Chart />)
    
    expect(screen.getByText(`Error loading security metrics: ${errorMessage}`)).toBeInTheDocument()
  })

  it('renders chart and summary cards when data is available', () => {
    mockUseQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: null
    })

    render(<Chart />)
    

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    

    expect(screen.getByText('CVEs')).toBeInTheDocument()
    expect(screen.getByText('Advisories')).toBeInTheDocument()
  })

  it('renders time range filter', () => {
    mockUseQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: null
    })

    render(<Chart />)
    
    expect(screen.getByText('Time Range')).toBeInTheDocument()
  })

  it('renders criticality filter', () => {
    mockUseQuery.mockReturnValue({
      data: mockData,
      loading: false,
      error: null
    })

    render(<Chart />)
    
    expect(screen.getByText('NONE')).toBeInTheDocument()
    expect(screen.getByText('LOW')).toBeInTheDocument()
    expect(screen.getByText('MEDIUM')).toBeInTheDocument()
    expect(screen.getByText('HIGH')).toBeInTheDocument()
    expect(screen.getByText('CRITICAL')).toBeInTheDocument()
  })
})
