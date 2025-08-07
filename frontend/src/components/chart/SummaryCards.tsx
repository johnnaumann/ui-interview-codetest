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
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <Box sx={{ flex: 1, minWidth: 300 }}>
        <CVESummaryCard
          data={data?.cves}
          loading={loading}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 300 }}>
        <AdvisoriesSummaryCard
          data={data?.advisories}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default SummaryCards;
