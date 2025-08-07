'use client';

import React from 'react';
import { Box } from '@mui/material';
import CVESummaryCard from './CVESummaryCard';
import AdvisoriesSummaryCard from './AdvisoriesSummaryCard';

interface SummaryData {
  cves: {
    averageValue: number;
    delta: number;
  };
  advisories: {
    averageValue: number;
    delta: number;
  };
}

interface SummaryCardsProps {
  data?: SummaryData;
  loading?: boolean;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  data,
  loading = false,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
