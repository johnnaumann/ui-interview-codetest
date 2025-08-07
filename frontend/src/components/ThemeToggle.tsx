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
        color="inherit"
        sx={{
          ml: 1,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
}
