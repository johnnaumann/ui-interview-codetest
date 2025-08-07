'use client';

import React from 'react';
import { Box } from '@mui/material';
import CVESummaryCard from './CVESummaryCard';
import AdvisoriesSummaryCard from './AdvisoriesSummaryCard';
import { SummaryCardsProps } from '../../interfaces';

const SummaryCards: React.FC<SummaryCardsProps> = ({
  data,
  loading = false,
}) => {
    return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <CVESummaryCard
        data={data?.cves}
        loading={loading}
      />
      <AdvisoriesSummaryCard
        data={data?.advisories}
        loading={loading}
      />
    </Box>
  );
};

export default SummaryCards;
