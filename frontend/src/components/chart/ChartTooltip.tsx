import React, { forwardRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const ChartTooltip = forwardRef<HTMLDivElement>((props, ref) => {
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      data-testid="chart-tooltip"
      sx={{
        position: 'fixed',
        backgroundColor: theme.palette.tooltip.background,
        color: theme.palette.gray[700],
        padding: 1.5,
        borderRadius: 1,
        zIndex: 1000,
        pointerEvents: 'none',
        border: `1px solid ${theme.palette.tooltip.border}`,
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
        left: 0,
        top: 0,
        minWidth: '150px',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '12px',
          fontWeight: 'bold',
          color: theme.palette.gray[800],
          marginBottom: 0.5,
          whiteSpace: 'nowrap',
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '12px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      />
    </Box>
  );
});

ChartTooltip.displayName = 'ChartTooltip';

export default ChartTooltip;
