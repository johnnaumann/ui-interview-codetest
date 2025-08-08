import React from 'react'
import { render, screen, fireEvent } from './test-utils'
import TimeRangeFilter from '../components/chart/TimeRangeFilter'


describe('TimeRangeFilter', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders time range filter', () => {
    render(
      <TimeRangeFilter
        value="THIRTY_DAYS"
        onChange={mockOnChange}
      />
    )
    
    expect(screen.getAllByText('Time Range')[0]).toBeInTheDocument()
  })

  it('displays current selected value', () => {
    render(
      <TimeRangeFilter
        value="SEVEN_DAYS"
        onChange={mockOnChange}
      />
    )
    
    expect(screen.getByText('Last 7 Days')).toBeInTheDocument()
  })

  it('calls onChange when selection changes', () => {
    render(
      <TimeRangeFilter
        value="THIRTY_DAYS"
        onChange={mockOnChange}
      />
    )
    
    const select = screen.getByRole('combobox')
    fireEvent.mouseDown(select)
    
    const option = screen.getByText('Last 7 Days')
    fireEvent.click(option)
    
    expect(mockOnChange).toHaveBeenCalledWith('SEVEN_DAYS')
  })

  it('is disabled when disabled prop is true', () => {
    render(
      <TimeRangeFilter
        value="THIRTY_DAYS"
        onChange={mockOnChange}
        disabled={true}
      />
    )
    
    const select = screen.getByRole('combobox')
    expect(select).toHaveAttribute('aria-disabled', 'true')
  })

  it('shows all time range options', () => {
    render(
      <TimeRangeFilter
        value="THIRTY_DAYS"
        onChange={mockOnChange}
      />
    )
    
    const select = screen.getByRole('combobox')
    fireEvent.mouseDown(select)
    
    expect(screen.getByText('Last 3 Days')).toBeInTheDocument()
    expect(screen.getByText('Last 7 Days')).toBeInTheDocument()
    expect(screen.getByText('Last 14 Days')).toBeInTheDocument()
    expect(screen.getAllByText('Last 30 Days')[1]).toBeInTheDocument()
  })
})
