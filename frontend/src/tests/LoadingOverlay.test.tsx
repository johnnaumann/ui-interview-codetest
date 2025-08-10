import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingOverlay from '../components/LoadingOverlay';

describe('LoadingOverlay', () => {
  it('renders with default props', () => {
    render(<LoadingOverlay />);
    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toBeInTheDocument();
  });

  it('renders fullscreen overlay when fullScreen prop is true', () => {
    render(<LoadingOverlay fullScreen />);
    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toBeInTheDocument();
    
    // Check that the container has fullscreen styles
    const container = progressElement.closest('div');
    expect(container).toHaveStyle({
      height: '100vh',
      width: '100%',
      position: 'fixed',
      top: '0px',
      left: '0px',
      zIndex: 1000,
    });
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<LoadingOverlay size="small" />);
    let progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('style', expect.stringContaining('width: 24px'));

    rerender(<LoadingOverlay size="large" />);
    progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('style', expect.stringContaining('width: 48px'));

    rerender(<LoadingOverlay size="medium" />);
    progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('style', expect.stringContaining('width: 40px'));
  });

  it('renders with different colors', () => {
    const { rerender } = render(<LoadingOverlay color="secondary" />);
    let progressElement = screen.getByRole('progressbar');
    expect(progressElement).toBeInTheDocument();

    rerender(<LoadingOverlay color="inherit" />);
    progressElement = screen.getByRole('progressbar');
    expect(progressElement).toBeInTheDocument();
  });
});
