'use client';

import React, { memo } from 'react';
import { Box } from '@mui/material';
import CVESummaryCard from './CVESummaryCard';
import AdvisoriesSummaryCard from './AdvisoriesSummaryCard';
import { SummaryCardsProps } from '../../types';

const SummaryCards: React.FC<SummaryCardsProps> = memo(({
  data,
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
        />
      </Box>
      <Box sx={{ flex: { xs: 'none', sm: 1, xl: 'none' } }}>
        <AdvisoriesSummaryCard
          data={data?.advisories}
        />
      </Box>
    </Box>
  );
});

SummaryCards.displayName = 'SummaryCards';

export default SummaryCards;
