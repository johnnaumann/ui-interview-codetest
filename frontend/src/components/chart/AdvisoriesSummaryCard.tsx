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


interface AdvisoriesSummaryData {
  averageValue: number;
  delta: number;
}

interface AdvisoriesSummaryCardProps {
  data?: AdvisoriesSummaryData;
  loading?: boolean;
}

const AdvisoriesSummaryCard: React.FC<AdvisoriesSummaryCardProps> = ({
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

  return (
               <Card sx={{
             backgroundColor: theme.palette.mode === 'dark' ? '#A855F7' : '#E9D5FF',
             position: 'relative',
           }}>
                   <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                           <Typography variant="h6" color={theme.palette.mode === 'dark' ? 'white' : '#6B46C1'}>
                   Advisories
                 </Typography>
          <Tooltip title="Security advisories are official notifications about security issues, vulnerabilities, or threats. This shows the average number of advisories issued over the selected time period.">
                               <IconButton size="small" sx={{ color: theme.palette.mode === 'dark' ? 'white' : '#6B46C1', p: 0.5 }}>
              <Info fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 60 }}>
                               <Typography variant="body2" color={theme.palette.mode === 'dark' ? 'white' : '#6B46C1'}>
                     Loading...
                   </Typography>
          </Box>
        ) : data ? (
          <>
                               <Typography variant="h4" component="div" sx={{ mb: 1, color: theme.palette.mode === 'dark' ? 'white' : '#6B46C1' }}>
                     {Math.round(data.averageValue)}
                   </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                   <Typography variant="body2" color={theme.palette.mode === 'dark' ? 'white' : '#6B46C1'}>
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
                           <Typography variant="body2" color={theme.palette.mode === 'dark' ? 'white' : '#6B46C1'}>
                   No data available
                 </Typography>
        )}
        
        
      </CardContent>
    </Card>
  );
};

export default AdvisoriesSummaryCard;
