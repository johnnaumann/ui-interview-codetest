import React from 'react'
import { render, screen } from './test-utils'
import SummaryCards from '../components/chart/SummaryCards'

const mockData = {
  cves: {
    averageValue: 25.5,
    delta: 12.3
  },
  advisories: {
    averageValue: 18.7,
    delta: -3.2
  }
}

describe('SummaryCards', () => {
  it('renders both CVE and Advisories cards', () => {
    render(<SummaryCards data={mockData} />)
    
    expect(screen.getByText('CVEs')).toBeInTheDocument()
    expect(screen.getByText('Advisories')).toBeInTheDocument()
  })

  it('displays CVE data correctly', () => {
    render(<SummaryCards data={mockData} />)
    
    expect(screen.getByText('26')).toBeInTheDocument()
    expect(screen.getByText('+12.3%')).toBeInTheDocument()
  })

  it('displays Advisories data correctly', () => {
    render(<SummaryCards data={mockData} />)
    
    expect(screen.getByText('-19')).toBeInTheDocument()
    expect(screen.getByText('-3.2%')).toBeInTheDocument()
  })

  it('renders cards even when no data provided', () => {
    render(<SummaryCards />)
    
    expect(screen.getByText('CVEs')).toBeInTheDocument()
    expect(screen.getByText('Advisories')).toBeInTheDocument()
  })

  it('renders info icons for both cards', () => {
    render(<SummaryCards data={mockData} />)
    
    const infoIcons = screen.getAllByTestId('InfoIcon')
    expect(infoIcons).toHaveLength(2)
  })

  it('displays average change text for both cards', () => {
    render(<SummaryCards data={mockData} />)
    
    const averageChangeTexts = screen.getAllByText('Average change')
    expect(averageChangeTexts).toHaveLength(2)
  })
})
