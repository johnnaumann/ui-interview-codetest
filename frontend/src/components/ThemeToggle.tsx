'use client';

import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function ThemeToggle() {
  const theme = useTheme();
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Initialize the color scheme attribute on component mount
  useEffect(() => {
    document.documentElement.setAttribute('data-mui-color-scheme', mode);
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    console.log('Toggling color mode from', mode, 'to', newMode);
    setMode(newMode);
    
    // Apply the color scheme to the document
    document.documentElement.setAttribute('data-mui-color-scheme', newMode);
  };

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton 
        onClick={toggleColorMode} 
        sx={{
          ml: 1,
          color: 'rgba(0, 0, 0, 0.54)', // Match the menu toggle dark grey color
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          // Dark mode colors and hover
          '[data-mui-color-scheme="dark"] &': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '[data-mui-color-scheme="dark"] &:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        }}
      >
        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
}
