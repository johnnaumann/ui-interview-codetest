import React from 'react'
import { render, screen } from './test-utils'
import AdvisoriesSummaryCard from '../components/chart/AdvisoriesSummaryCard'

const mockData = {
  averageValue: 18.7,
  delta: -3.2
}

describe('AdvisoriesSummaryCard', () => {
  it('renders Advisories summary card with title', () => {
    render(<AdvisoriesSummaryCard data={mockData} />)
    
    expect(screen.getByText('Advisories')).toBeInTheDocument()
  })

  it('displays average value as integer', () => {
    render(<AdvisoriesSummaryCard data={mockData} />)
    
    expect(screen.getByText('19')).toBeInTheDocument() // Math.round(18.7) = 19
  })

  it('shows average change text', () => {
    render(<AdvisoriesSummaryCard data={mockData} />)
    
    expect(screen.getByText('Average change')).toBeInTheDocument()
  })

  it('displays delta percentage in chip', () => {
    render(<AdvisoriesSummaryCard data={mockData} />)
    
    expect(screen.getByText('-3.2%')).toBeInTheDocument()
  })

  it('shows loading state when loading prop is true', () => {
    render(<AdvisoriesSummaryCard loading={true} />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows no data message when no data provided', () => {
    render(<AdvisoriesSummaryCard />)
    
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('renders info icon with tooltip', () => {
    render(<AdvisoriesSummaryCard data={mockData} />)
    
    const infoIcon = screen.getByTestId('InfoIcon')
    expect(infoIcon).toBeInTheDocument()
  })

  it('displays positive delta with plus sign', () => {
    const positiveData = {
      averageValue: 22.1,
      delta: 8.9
    }
    
    render(<AdvisoriesSummaryCard data={positiveData} />)
    
    expect(screen.getByText('+8.9%')).toBeInTheDocument()
  })
})
