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
import { CVESummaryCardProps } from '../../types';
import { colors } from '../../contexts/ThemeContext';

const CVESummaryCard: React.FC<CVESummaryCardProps> = memo(({
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
      backgroundColor: theme.palette.mode === 'dark' ? colors.primary.dark : colors.primary.main,
      border: `1px solid ${theme.palette.mode === 'dark' ? colors.primary.dark : colors.primary.main}`,
      position: 'relative',
      height: 150, // Based on actual measured height
    }}>
      <CardContent sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" color={colors.white}>
            CVEs
          </Typography>
          <Tooltip title="Common Vulnerabilities and Exposures (CVEs) are security flaws in software or hardware that can be exploited by attackers. This shows the average number of CVEs detected over the selected time period.">
            <IconButton 
              size="small" 
              sx={{ 
                color: `${colors.white} !important`,
                p: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: `${colors.white} !important`,
                },
                '& .MuiSvgIcon-root': {
                  color: `${colors.white} !important`,
                },
                '&:hover .MuiSvgIcon-root': {
                  color: `${colors.white} !important`,
                },
                '& svg': {
                  color: `${colors.white} !important`,
                },
                '&:hover svg': {
                  color: `${colors.white} !important`,
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
              <Typography variant="h4" component="div" sx={{ color: colors.white, lineHeight: 1.2 }}>
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
            <Typography variant="body2" color={colors.white}>
              Average change
            </Typography>
            <Box 
              sx={{ 
                opacity: data ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
            >
              {data && (
                <Chip
                  label={`${getDeltaPrefix(data.delta)}${data.delta.toFixed(1)}%`}
                  size="small"
                  sx={{
                    backgroundColor: getDeltaColor(data.delta),
                    color: colors.white,
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

CVESummaryCard.displayName = 'CVESummaryCard';

export default CVESummaryCard;
