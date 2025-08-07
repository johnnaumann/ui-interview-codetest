import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'


const TestComponent = () => {
  const { mode, toggleColorMode } = useTheme()
  return (
    <div>
      <span data-testid="theme-mode">{mode}</span>
      <button onClick={toggleColorMode}>Toggle Theme</button>
    </div>
  )
}

describe('ThemeContext', () => {
  it('provides light mode by default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light')
  })

  it('toggles theme when toggleColorMode is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    
    const toggleButton = screen.getByText('Toggle Theme')
    

    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light')
    

    fireEvent.click(toggleButton)
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('dark')
    

    fireEvent.click(toggleButton)
    expect(screen.getByTestId('theme-mode')).toHaveTextContent('light')
  })

  it('provides theme object', () => {
    const TestThemeComponent = () => {
      const { theme } = useTheme()
      return (
        <div>
          <span data-testid="theme-palette-mode">{theme.palette.mode}</span>
          <span data-testid="theme-primary-color">{theme.palette.primary.main}</span>
        </div>
      )
    }

    render(
      <ThemeProvider>
        <TestThemeComponent />
      </ThemeProvider>
    )
    
    expect(screen.getByTestId('theme-palette-mode')).toHaveTextContent('light')
    expect(screen.getByTestId('theme-primary-color')).toHaveTextContent('#6B46C1')
  })

  it('throws error when useTheme is used outside provider', () => {

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useTheme must be used within a ThemeProvider')
    
    consoleSpy.mockRestore()
  })
})
