import React from 'react'
import { render, screen, fireEvent } from './test-utils'
import ThemeToggle from '../components/ThemeToggle'

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    
    const toggleButton = screen.getByRole('button')
    expect(toggleButton).toBeInTheDocument()
  })

  it('shows correct tooltip text', () => {
    render(<ThemeToggle />)
    
    const toggleButton = screen.getByRole('button')
    expect(toggleButton).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />)
    
    const toggleButton = screen.getByRole('button')
    fireEvent.click(toggleButton)
    
    // After clicking, the tooltip should change to indicate light mode
    expect(toggleButton).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('displays correct icon based on current theme', () => {
    render(<ThemeToggle />)
    
    // Initially should show dark mode icon (Brightness4)
    const darkIcon = screen.getByTestId('Brightness4Icon')
    expect(darkIcon).toBeInTheDocument()
    
    // Click to toggle to dark mode
    const toggleButton = screen.getByRole('button')
    fireEvent.click(toggleButton)
    
    // Should now show light mode icon (Brightness7)
    const lightIcon = screen.getByTestId('Brightness7Icon')
    expect(lightIcon).toBeInTheDocument()
  })
})
