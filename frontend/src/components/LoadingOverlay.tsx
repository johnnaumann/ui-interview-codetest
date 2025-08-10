import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingOverlayProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'inherit';
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  fullScreen = false,
  size = 'medium',
  color = 'primary'
}) => {
  const getSize = () => {
    switch (size) {
      case 'small': return 24;
      case 'large': return 48;
      default: return 40;
    }
  };

  const containerStyles = fullScreen ? {
    height: '100vh',
    width: '100%',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    zIndex: 1000,
    pointerEvents: 'none' as const,
  } : {
    height: '100%',
    width: '100%',
    position: 'relative' as const,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={containerStyles}
    >
      <CircularProgress size={getSize()} color={color} />
    </Box>
  );
};

export default LoadingOverlay;
