'use client';

import React, { memo } from 'react';
import { CVESummaryCardProps } from '../../types';
import { colors } from '../../contexts/ThemeContext';
import BaseSummaryCard from './BaseSummaryCard';

const CVESummaryCard: React.FC<CVESummaryCardProps> = memo(({
  data,
}) => {
  return (
    <BaseSummaryCard
      data={data}
      title="CVEs"
      tooltipContent="Common Vulnerabilities and Exposures (CVEs) are security flaws in software or hardware that can be exploited by attackers. This shows the average number of CVEs detected over the selected time period."
      backgroundColor={{
        light: colors.primary.main,
        dark: colors.primary.dark,
      }}
      textColor={{
        light: colors.white,
        dark: colors.white,
      }}
      hoverColor={{
        light: colors.dark.hover.card,
        dark: colors.dark.hover.card,
      }}
    />
  );
});

CVESummaryCard.displayName = 'CVESummaryCard';

export default CVESummaryCard;
