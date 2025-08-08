'use client';

import React from 'react';
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

const CVESummaryCard: React.FC<CVESummaryCardProps> = ({
  data,
  loading = false,
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
      position: 'relative',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" color="white">
            CVEs
          </Typography>
          <Tooltip title="Common Vulnerabilities and Exposures (CVEs) are security flaws in software or hardware that can be exploited by attackers. This shows the average number of CVEs detected over the selected time period.">
            <IconButton size="small" sx={{ color: 'white', p: 0.5 }}>
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 60 }}>
            <Typography variant="body2" color="white">
              Loading...
            </Typography>
          </Box>
        ) : data ? (
          <>
            <Typography variant="h4" component="div" sx={{ mb: 1, color: 'white' }}>
              {getAverageValueDisplay(data.averageValue, data.delta)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Typography variant="body2" color="white">
                Average change
              </Typography>
              <Chip
                label={`${getDeltaPrefix(data.delta)}${data.delta.toFixed(1)}%`}
                size="small"
                sx={{
                  backgroundColor: getDeltaColor(data.delta),
                  color: 'white',
                  fontWeight: 'medium',
                  height: 'auto',
                  '& .MuiChip-label': {
                    px: 1,
                    fontSize: 'inherit',
                  },
                }}
              />
            </Box>
          </>
        ) : (
          <Typography variant="body2" color="white">
            No data available
          </Typography>
        )}


      </CardContent>
    </Card>
  );
};

export default CVESummaryCard;
