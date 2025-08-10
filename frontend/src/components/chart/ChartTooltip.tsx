import React, { forwardRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { colors } from '../../contexts/ThemeContext';

interface ChartTooltipProps {
  cardType?: 'cve' | 'advisories' | null;
}

const ChartTooltip = forwardRef<HTMLDivElement, ChartTooltipProps>(({ cardType, ...props }, ref) => {
  const theme = useTheme();
  
  // Determine the background color based on card type and theme mode
  const getBackgroundColor = () => {
    if (theme.palette.mode === 'dark' && cardType) {
      if (cardType === 'cve') {
        return colors.primary.dark;
      } else if (cardType === 'advisories') {
        return colors.advisories.dark;
      }
    }
    return theme.palette.tooltip.background;
  };

  // Determine the border color based on card type and theme mode
  const getBorderColor = () => {
    if (theme.palette.mode === 'dark' && cardType) {
      if (cardType === 'cve') {
        return colors.primary.dark;
      } else if (cardType === 'advisories') {
        return colors.advisories.dark;
      }
    }
    return theme.palette.tooltip.border;
  };

  // Determine the text color based on theme mode
  const getTextColor = () => {
    if (theme.palette.mode === 'dark') {
      return colors.white;
    }
    return theme.palette.tooltip.text;
  };

  return (
    <Box
      ref={ref}
      data-testid="chart-tooltip"
      sx={{
        position: 'fixed',
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        padding: 1.5,
        borderRadius: 1,
        zIndex: 1000,
        pointerEvents: 'none',
        border: `1px solid ${getBorderColor()}`,
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
        left: 0,
        top: 0,
        minWidth: '150px',
        whiteSpace: 'nowrap',
        boxShadow: `0 2px 8px ${theme.palette.tooltip.shadow}`,
      }}
    >
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px',
            fontWeight: 'medium',
            color: getTextColor(),
            marginBottom: 0.5,
            whiteSpace: 'nowrap',
          }}
        />
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px',
            fontWeight: 'regular',
            color: getTextColor(),
            whiteSpace: 'nowrap',
          }}
        />
    </Box>
  );
});

ChartTooltip.displayName = 'ChartTooltip';

export default ChartTooltip;
