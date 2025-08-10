'use client';

import React, { memo, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Chip,
  useTheme,
} from '@mui/material';
import { Info } from '@mui/icons-material';
import { BaseSummaryCardProps } from '../../types';
import { colors } from '../../contexts/ThemeContext';

const BaseSummaryCard: React.FC<BaseSummaryCardProps> = memo(({
  data,
  title,
  tooltipContent,
  backgroundColor,
  textColor,
  hoverColor,
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  const chipBackgroundColor = useMemo(() => {
    if (!data) return 'text.secondary';
    const delta = data.delta;
    if (delta > 0) return 'error.main';
    if (delta < 0) return 'success.main';
    return 'text.secondary';
  }, [data]);

  const getDeltaPrefix = (delta: number) => {
    if (delta > 0) return '+';
    return '';
  };

  const getAverageValueDisplay = (averageValue: number, delta: number) => {
    const roundedValue = Math.round(averageValue);
    if (delta < 0) return `-${roundedValue}`;
    return roundedValue.toString();
  };

  return (
    <Card sx={{
      backgroundColor: isDarkMode ? backgroundColor.dark : backgroundColor.light,
      border: `1px solid ${isDarkMode ? backgroundColor.dark : backgroundColor.light}`,
      position: 'relative',
      height: 150,
    }}>
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" color={isDarkMode ? textColor.dark : textColor.light}>
            {title}
          </Typography>
          <Tooltip title={tooltipContent}>
            <IconButton
              size="small"
              sx={{
                color: isDarkMode ? textColor.dark : textColor.light,
                p: 0.5,
                '&:hover': {
                  backgroundColor: isDarkMode ? hoverColor.dark : hoverColor.light,
                },
              }}
            >
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              opacity: data ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              mb: 1,
              minHeight: 40,
              height: 40,
              display: 'flex',
              alignItems: 'flex-start',
              position: 'relative',
            }}
          >
            {data && (
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: isDarkMode ? textColor.dark : textColor.light,
                  lineHeight: 1.2,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                {getAverageValueDisplay(data.averageValue, data.delta)}
              </Typography>
            )}
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 1,
            minHeight: 32,
            height: 32,
            position: 'relative',
          }}>
            <Typography variant="body2" color={isDarkMode ? textColor.dark : textColor.light}>
              Average change
            </Typography>
            <Box
              sx={{
                opacity: (data && data.delta !== 0) ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                visibility: (data && data.delta !== 0) ? 'visible' : 'hidden',
              }}
            >
              {data && data.delta !== 0 && (
                <Chip
                  label={`${getDeltaPrefix(data.delta)}${data.delta.toFixed(1)}%`}
                  size="small"
                  sx={{
                    backgroundColor: chipBackgroundColor,
                    color: colors.white,
                    fontWeight: 'medium',
                    height: 24,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

BaseSummaryCard.displayName = 'BaseSummaryCard';

export default BaseSummaryCard;
