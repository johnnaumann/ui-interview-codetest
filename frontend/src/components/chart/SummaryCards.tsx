'use client';

import React from 'react';
import { Box } from '@mui/material';
import CVESummaryCard from './CVESummaryCard';
import AdvisoriesSummaryCard from './AdvisoriesSummaryCard';
import { SummaryCardsProps } from '../../types';

const SummaryCards: React.FC<SummaryCardsProps> = ({
  data,
  loading = false,
}) => {
    return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row', xl: 'column' },
      gap: 2,
    }}>
      <Box sx={{ flex: { xs: 'none', sm: 1, xl: 'none' } }}>
        <CVESummaryCard
          data={data?.cves}
          loading={loading}
        />
      </Box>
      <Box sx={{ flex: { xs: 'none', sm: 1, xl: 'none' } }}>
        <AdvisoriesSummaryCard
          data={data?.advisories}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default SummaryCards;
