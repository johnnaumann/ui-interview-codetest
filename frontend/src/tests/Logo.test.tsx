import React from 'react'
import { render } from './test-utils'
import Logo from '../components/Logo'

describe('Logo', () => {
  it('renders logo with default props', () => {
    const { container } = render(<Logo />)
    
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders logo with custom width and height', () => {
    const { container } = render(<Logo width={200} height={50} />)
    
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '200')
    expect(svg).toHaveAttribute('height', '50')
  })

  it('renders logo with custom className', () => {
    const { container } = render(<Logo className="custom-logo" />)
    
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('custom-logo')
  })

  it('renders logo with all custom props', () => {
    const { container } = render(
      <Logo 
        width={150} 
        height={40} 
        className="test-logo"
      />
    )
    
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '150')
    expect(svg).toHaveAttribute('height', '40')
    expect(svg).toHaveClass('test-logo')
  })
})
