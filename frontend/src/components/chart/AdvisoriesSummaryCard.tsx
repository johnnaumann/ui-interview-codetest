'use client';

import React, { memo } from 'react';
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
import { AdvisoriesSummaryCardProps } from '../../types';
import { colors } from '../../contexts/ThemeContext';

const AdvisoriesSummaryCard: React.FC<AdvisoriesSummaryCardProps> = memo(({
  data,
}) => {
  const theme = useTheme();
  const getDeltaColor = (delta: number) => {
    if (delta > 0) return 'error.main';
    if (delta < 0) return 'success.main';
    return 'text.secondary';
  };

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
      backgroundColor: theme.palette.mode === 'dark' ? colors.advisories.dark : colors.advisories.light,
      border: `1px solid ${theme.palette.mode === 'dark' ? colors.advisories.dark : colors.advisories.light}`,
      position: 'relative',
      height: 150, // Based on actual measured height
    }}>
      <CardContent sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" color={theme.palette.mode === 'dark' ? colors.white : colors.primary.main}>
            Advisories
          </Typography>
          <Tooltip title="Security advisories are official notifications about security issues, vulnerabilities, or threats. This shows the average number of advisories issued over the selected time period.">
            <IconButton
              size="small"
              sx={{
                color: `${theme.palette.mode === 'dark' ? colors.white : colors.primary.main} !important`,
                p: 0.5,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.04)',
                  color: `${theme.palette.mode === 'dark' ? colors.white : colors.primary.main} !important`,
                },
                '& .MuiSvgIcon-root': {
                  color: `${theme.palette.mode === 'dark' ? colors.white : colors.primary.main} !important`,
                },
                '&:hover .MuiSvgIcon-root': {
                  color: `${theme.palette.mode === 'dark' ? colors.white : colors.primary.main} !important`,
                },
                '& svg': {
                  color: `${theme.palette.mode === 'dark' ? colors.white : colors.primary.main} !important`,
                },
                '&:hover svg': {
                  color: `${theme.palette.mode === 'dark' ? colors.white : colors.primary.main} !important`,
                }
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
              minHeight: 40, // Fixed height for h4 typography
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            {data && (
              <Typography variant="h4" component="div" sx={{ color: theme.palette.mode === 'dark' ? colors.white : colors.primary.main, lineHeight: 1.2 }}>
                {getAverageValueDisplay(data.averageValue, data.delta)}
              </Typography>
            )}
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            mt: 1,
            minHeight: 32, // Fixed height for body2 + chip row
          }}>
            <Typography variant="body2" color={theme.palette.mode === 'dark' ? colors.white : colors.primary.main}>
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
                    backgroundColor: getDeltaColor(data.delta),
                    color: 'white',
                    fontWeight: 'medium',
                    height: 24, // Fixed chip height
                    '& .MuiChip-label': {
                      px: 1,
                      fontSize: 'inherit',
                    },
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

AdvisoriesSummaryCard.displayName = 'AdvisoriesSummaryCard';

export default AdvisoriesSummaryCard;
