import React from 'react'
import { render, screen, fireEvent } from './test-utils'
import CriticalityFilter from '../components/chart/CriticalityFilter'


describe('CriticalityFilter', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders all criticality chips', () => {
    render(
      <CriticalityFilter
        value={[]}
        onChange={mockOnChange}
      />
    )
    
    expect(screen.getByText('NONE')).toBeInTheDocument()
    expect(screen.getByText('LOW')).toBeInTheDocument()
    expect(screen.getByText('MEDIUM')).toBeInTheDocument()
    expect(screen.getByText('HIGH')).toBeInTheDocument()
    expect(screen.getByText('CRITICAL')).toBeInTheDocument()
  })

  it('shows selected criticalities as filled chips', () => {
    render(
      <CriticalityFilter
        value={['HIGH', 'CRITICAL']}
        onChange={mockOnChange}
      />
    )
    
    const highChip = screen.getByText('HIGH')
    const criticalChip = screen.getByText('CRITICAL')
    
    expect(highChip.closest('.MuiChip-root')).toHaveClass('MuiChip-filled')
    expect(criticalChip.closest('.MuiChip-root')).toHaveClass('MuiChip-filled')
  })

  it('shows unselected criticalities as outlined chips', () => {
    render(
      <CriticalityFilter
        value={['HIGH']}
        onChange={mockOnChange}
      />
    )
    
    const lowChip = screen.getByText('LOW')
    const mediumChip = screen.getByText('MEDIUM')
    
    expect(lowChip.closest('.MuiChip-root')).toHaveClass('MuiChip-outlined')
    expect(mediumChip.closest('.MuiChip-root')).toHaveClass('MuiChip-outlined')
  })

  it('calls onChange when chip is clicked', () => {
    render(
      <CriticalityFilter
        value={['HIGH']}
        onChange={mockOnChange}
      />
    )
    
    const lowChip = screen.getByText('LOW')
    fireEvent.click(lowChip)
    
    expect(mockOnChange).toHaveBeenCalledWith(['HIGH', 'LOW'])
  })

  it('removes criticality when selected chip is clicked', () => {
    render(
      <CriticalityFilter
        value={['HIGH', 'CRITICAL']}
        onChange={mockOnChange}
      />
    )
    
    const highChip = screen.getByText('HIGH')
    fireEvent.click(highChip)
    
    expect(mockOnChange).toHaveBeenCalledWith(['CRITICAL'])
  })

  it('is disabled when disabled prop is true', () => {
    render(
      <CriticalityFilter
        value={[]}
        onChange={mockOnChange}
        disabled={true}
      />
    )
    
    const lowChip = screen.getByText('LOW')
    fireEvent.click(lowChip)
    
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('handles multiple criticality selections', () => {
    render(
      <CriticalityFilter
        value={['LOW', 'MEDIUM']}
        onChange={mockOnChange}
      />
    )
    
    const highChip = screen.getByText('HIGH')
    fireEvent.click(highChip)
    
    expect(mockOnChange).toHaveBeenCalledWith(['LOW', 'MEDIUM', 'HIGH'])
  })
})
