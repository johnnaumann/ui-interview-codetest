'use client';

import React, { memo } from 'react';
import { AdvisoriesSummaryCardProps } from '../../types';
import { colors } from '../../contexts/ThemeContext';
import BaseSummaryCard from './BaseSummaryCard';

const AdvisoriesSummaryCard: React.FC<AdvisoriesSummaryCardProps> = memo(({
  data,
}) => {
  return (
    <BaseSummaryCard
      data={data}
      title="Advisories"
      tooltipContent="Security advisories are official notifications about security issues, vulnerabilities, or threats. This shows the average number of advisories issued over the selected time period."
      backgroundColor={{
        light: colors.advisories.light,
        dark: colors.advisories.dark,
      }}
      textColor={{
        light: colors.primary.main,
        dark: colors.white,
      }}
      hoverColor={{
        light: colors.light.hover.card,
        dark: colors.dark.hover.card,
      }}
    />
  );
});

AdvisoriesSummaryCard.displayName = 'AdvisoriesSummaryCard';

export default AdvisoriesSummaryCard;
