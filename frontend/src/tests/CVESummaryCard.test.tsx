import React from 'react'
import { render, screen } from './test-utils'
import CVESummaryCard from '../components/chart/CVESummaryCard'

const mockData = {
  averageValue: 25.5,
  delta: 12.3
}

describe('CVESummaryCard', () => {
  it('renders CVE summary card with title', () => {
    render(<CVESummaryCard data={mockData} />)
    
    expect(screen.getByText('CVEs')).toBeInTheDocument()
  })

  it('displays average value as integer', () => {
    render(<CVESummaryCard data={mockData} />)
    
    expect(screen.getByText('26')).toBeInTheDocument()
  })

  it('shows average change text', () => {
    render(<CVESummaryCard data={mockData} />)
    
    expect(screen.getByText('Average change')).toBeInTheDocument()
  })

  it('displays delta percentage in chip', () => {
    render(<CVESummaryCard data={mockData} />)
    
    expect(screen.getByText('+12.3%')).toBeInTheDocument()
  })

  it('shows loading state when loading prop is true', () => {
    render(<CVESummaryCard loading={true} />)
    
    // Check that LoadingOverlay is rendered (it contains CircularProgress)
    expect(document.querySelector('.MuiCircularProgress-root')).toBeInTheDocument()
  })

  it('shows no data message when no data provided', () => {
    render(<CVESummaryCard />)
    
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('renders info icon with tooltip', () => {
    render(<CVESummaryCard data={mockData} />)
    
    const infoIcon = screen.getByTestId('InfoIcon')
    expect(infoIcon).toBeInTheDocument()
  })

  it('displays negative delta without plus sign', () => {
    const negativeData = {
      averageValue: 15.2,
      delta: -5.7
    }
    
    render(<CVESummaryCard data={negativeData} />)
    
    expect(screen.getByText('-5.7%')).toBeInTheDocument()
  })

  it('displays negative average value when delta is negative', () => {
    const negativeData = {
      averageValue: 15.2,
      delta: -5.7
    }
    
    render(<CVESummaryCard data={negativeData} />)
    
    expect(screen.getByText('-15')).toBeInTheDocument()
  })
})
