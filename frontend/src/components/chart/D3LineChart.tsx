'use client';

import React, { useEffect, useRef, useState, memo, useMemo } from 'react';
import * as d3 from 'd3';
import { Box, useTheme, Typography } from '@mui/material';
import { D3LineChartProps, DataPoint } from '../../types';
import ChartTooltip from './ChartTooltip';
import { colors } from '../../contexts/ThemeContext';

const D3LineChart: React.FC<D3LineChartProps> = memo(({
  dataPoints,
  timeRange,
  loading = false,
}) => {
  const theme = useTheme();

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousTimeRangeRef = useRef<string | undefined>(timeRange);

  // Create tooltip div once and reuse it
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [resizeKey, setResizeKey] = useState(0);
  const [currentTooltipType, setCurrentTooltipType] = useState<'cve' | 'advisories' | null>(null);

  useEffect(() => {
    if (!svgRef.current || loading || !dataPoints.length) return;

    const svg = d3.select(svgRef.current);

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Check if time range has changed
    const timeRangeChanged = previousTimeRangeRef.current !== timeRange;

    // Clear existing elements
    svg.selectAll('.grid-group, .chart-group, .data-points, .cve-line, .advisory-line').remove();

    if (timeRangeChanged) {
      previousTimeRangeRef.current = timeRange;
    }

    // Always create grid (ensures it's always visible)
    const gridGroup = svg
      .append('g')
      .attr('class', 'grid-group')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xGridSpacing = chartWidth / 4;
    const yGridSpacing = chartHeight / 4;

    for (let i = 0; i <= 4; i++) {
      const x = i * xGridSpacing;
      gridGroup.append('line')
        .attr('class', 'grid-line-vertical')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .style('stroke', theme.palette.divider)
        .style('stroke-width', 1)
        .style('stroke-dasharray', '3,3')
        .style('opacity', 1);
    }

    for (let i = 0; i <= 4; i++) {
      const y = i * yGridSpacing;
      gridGroup.append('line')
        .attr('class', 'grid-line-horizontal')
        .attr('x1', 0)
        .attr('x2', chartWidth)
        .attr('y1', y)
        .attr('y2', y)
        .style('stroke', theme.palette.divider)
        .style('stroke-width', 1)
        .style('stroke-dasharray', '3,3')
        .style('opacity', 1);
    }

    // Always create chart group for data elements
    const g = svg
      .append('g')
      .attr('class', 'chart-group')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    if (!dataPoints.length) return;

    /**
     * Data Processing
     * Convert timestamp strings to Date objects and sort chronologically
     */
    const parsedData = dataPoints
      .map(d => ({
        ...d,
        date: new Date(d.timestamp),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    /**
     * D3 Scales
     * X-axis: Time scale for dates
     * Y-axis: Linear scale for CVE and Advisory counts
     */
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(parsedData, d => d.date) as [Date, Date])
      .range([0, chartWidth]);


    const maxValue = Math.max(
      d3.max(parsedData, d => d.cves) || 0,
      d3.max(parsedData, d => d.advisories) || 0
    );

    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue * 1.1])
      .range([chartHeight, 0]);

    /**
     * Line Generators
     * Create smooth curved lines using D3's line generator
     * curveMonotoneX ensures lines are monotonic (no wiggles)
     */
    const cveLineGenerator = d3
      .line<DataPoint & { date: Date }>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.cves))
      .curve(d3.curveMonotoneX);

    const advisoryLineGenerator = d3
      .line<DataPoint & { date: Date }>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.advisories))
      .curve(d3.curveMonotoneX);

    /**
     * Create and animate the line paths
     * Lines are drawn with a stroke-dasharray animation for visual appeal
     */
    const cveLine = g.append('path')
      .attr('class', 'cve-line')
      .attr('fill', 'none')
      .attr('stroke', theme.palette.primary.main)
      .attr('stroke-width', 1.5)
      .attr('d', cveLineGenerator(parsedData))
      .style('cursor', 'pointer');

    const advisoryLine = g.append('path')
      .attr('class', 'advisory-line')
      .attr('fill', 'none')
      .attr('stroke', theme.palette.advisories.main)
      .attr('stroke-width', 1.5)
      .attr('d', advisoryLineGenerator(parsedData))
      .style('cursor', 'pointer');

    const cveTotalLength = cveLine.node()?.getTotalLength() || 0;
    cveLine
      .attr('stroke-dasharray', cveTotalLength + ' ' + cveTotalLength)
      .attr('stroke-dashoffset', cveTotalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    const advisoryTotalLength = advisoryLine.node()?.getTotalLength() || 0;
    advisoryLine
      .attr('stroke-dasharray', advisoryTotalLength + ' ' + advisoryTotalLength)
      .attr('stroke-dashoffset', advisoryTotalLength)
      .transition()
      .duration(1000)
      .delay(200)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    const dataPointsGroup = g.append('g').attr('class', 'data-points');

    parsedData.forEach((d, i) => {
      const cveY = yScale(d.cves);
      const advisoryY = yScale(d.advisories);
      const x = xScale(d.date);

      const cveColor = theme.palette.primary.main;

      dataPointsGroup.append('circle')
        .attr('cx', x)
        .attr('cy', cveY)
        .attr('r', 12)
        .attr('fill', 'transparent')
        .attr('data-index', i)
        .attr('data-type', 'cve-hit')
        .style('cursor', 'pointer')
        .on('mouseover', (event) => {
          const target = event.target as Element;
          const index = target.getAttribute('data-index');
          const type = target.getAttribute('data-type');
          if (index !== null && type === 'cve-hit') {
            d3.select(`.cve-halo[data-index="${index}"]`).style('opacity', 0.5);
          }

          // Set tooltip type for styling
          setCurrentTooltipType('cve');

          // Use D3's standard tooltip positioning with aggressive edge detection
          const tooltipDiv = d3.select(tooltipRef.current);

          // Estimate tooltip dimensions for proactive positioning
          const estimatedTooltipWidth = 150; // Reduced by another 50px for more compact tooltips
          const estimatedTooltipHeight = 80;
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // Calculate optimal position with edge detection
          let tooltipX = event.pageX + 10;
          let tooltipY = event.pageY - 10;

          // More aggressive horizontal edge detection - flip to left if within 50px of right edge
          if (event.pageX + estimatedTooltipWidth + 50 > viewportWidth) {
            tooltipX = event.pageX - estimatedTooltipWidth - 10;
          }

          // More aggressive vertical edge detection - flip above if within 30px of bottom edge
          if (event.pageY + estimatedTooltipHeight + 30 > viewportHeight) {
            tooltipY = event.pageY - estimatedTooltipHeight - 10;
          }

          // Ensure tooltip stays within viewport bounds
          if (tooltipX < 10) tooltipX = 10;
          if (tooltipY < 10) tooltipY = 10;
          if (tooltipX + estimatedTooltipWidth > viewportWidth) tooltipX = viewportWidth - estimatedTooltipWidth - 10;
          if (tooltipY + estimatedTooltipHeight > viewportHeight) tooltipY = viewportHeight - estimatedTooltipHeight - 10;

          // Position tooltip with calculated optimal position
          tooltipDiv
            .style('opacity', 1)
            .style('left', tooltipX + 'px')
            .style('top', tooltipY + 'px');

          // Set content for MUI Typography components
          const dateElement = tooltipDiv.select('p:first-child');
          const valueElement = tooltipDiv.select('p:last-child');

          if (dateElement.size() > 0) {
            dateElement.text(d.date.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }));
          }

          if (valueElement.size() > 0) {
            valueElement.text(`CVEs: ${d.cves}`);
            valueElement.style('color', theme.palette.mode === 'dark' ? colors.white : theme.palette.primary.main);
          }
        })
        .on('mouseout', (event) => {
          const target = event.target as Element;
          const index = target.getAttribute('data-index');
          const type = target.getAttribute('data-type');
          if (index !== null && type === 'cve-hit') {
            d3.select(`.cve-halo[data-index="${index}"]`).style('opacity', 0);
          }
          // Reset tooltip type and hide tooltip
          setCurrentTooltipType(null);
          d3.select(tooltipRef.current).style('opacity', 0);
        });

      /**
       * Halo effect circle
       * Semi-transparent circle that appears on hover
       * Uses pointer-events: none to let hit area handle interactions
       */
      dataPointsGroup.append('circle')
        .attr('class', 'cve-halo')
        .attr('data-index', i)
        .attr('cx', x)
        .attr('cy', cveY)
        .attr('r', 8)
        .attr('fill', cveColor)
        .style('opacity', 0)
        .style('pointer-events', 'none');

      /**
       * Main CVE dot
       * Visible data point with animated entrance
       * Uses pointer-events: none to let hit area handle interactions
       */
      dataPointsGroup.append('circle')
        .attr('cx', x)
        .attr('cy', cveY)
        .attr('r', 0)
        .attr('fill', cveColor)
        .style('cursor', 'pointer')
        .style('pointer-events', 'none')
        .transition()
        .delay(1000 + i * 50)
        .duration(300)
        .attr('r', 3);

      const advisoryColor = theme.palette.advisories.main;
      dataPointsGroup.append('circle')
        .attr('cx', x)
        .attr('cy', advisoryY)
        .attr('r', 12)
        .attr('fill', 'transparent')
        .attr('data-index', i)
        .attr('data-type', 'advisory-hit')
        .style('cursor', 'pointer')
        .on('mouseover', (event) => {
          const target = event.target as Element;
          const index = target.getAttribute('data-index');
          const type = target.getAttribute('data-type');
          if (index !== null && type === 'advisory-hit') {
            d3.select(`.advisory-halo[data-index="${index}"]`).style('opacity', 0.5);
          }

          // Set tooltip type for styling
          setCurrentTooltipType('advisories');

          // Use D3's standard tooltip positioning with aggressive edge detection
          const tooltipDiv = d3.select(tooltipRef.current);

          // Estimate tooltip dimensions for proactive positioning
          const estimatedTooltipWidth = 150;
          const estimatedTooltipHeight = 80;
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // Calculate optimal position with edge detection
          let tooltipX = event.pageX + 10;
          let tooltipY = event.pageY - 10;

          // More aggressive horizontal edge detection - flip to left if within 50px of right edge
          if (event.pageX + estimatedTooltipWidth + 50 > viewportWidth) {
            tooltipX = event.pageX - estimatedTooltipWidth - 10;
          }

          // More aggressive vertical edge detection - flip above if within 30px of bottom edge
          if (event.pageY + estimatedTooltipHeight + 30 > viewportHeight) {
            tooltipY = event.pageY - estimatedTooltipHeight - 10;
          }

          // Ensure tooltip stays within viewport bounds
          if (tooltipX < 10) tooltipX = 10;
          if (tooltipY < 10) tooltipY = 10;
          if (tooltipX + estimatedTooltipWidth > viewportWidth) tooltipX = viewportWidth - estimatedTooltipWidth - 10;
          if (tooltipY + estimatedTooltipHeight > viewportHeight) tooltipY = viewportHeight - estimatedTooltipHeight - 10;

          // Position tooltip with calculated optimal position
          tooltipDiv
            .style('opacity', 1)
            .style('left', tooltipX + 'px')
            .style('top', tooltipY + 'px');

          // Set content for MUI Typography components
          const dateElement = tooltipDiv.select('p:first-child');
          const valueElement = tooltipDiv.select('p:last-child');

          if (dateElement.size() > 0) {
            dateElement.text(d.date.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }));
          }

          if (valueElement.size() > 0) {
            valueElement.text(`Advisories: ${d.advisories}`);
            valueElement.style('color', theme.palette.mode === 'dark' ? colors.white : theme.palette.advisories.main);
          }
        })
        .on('mouseout', (event) => {
          const target = event.target as Element;
          const index = target.getAttribute('data-index');
          const type = target.getAttribute('data-type');
          if (index !== null && type === 'advisory-hit') {
            d3.select(`.advisory-halo[data-index="${index}"]`).style('opacity', 0);
          }
          // Reset tooltip type and hide tooltip
          setCurrentTooltipType(null);
          d3.select(tooltipRef.current).style('opacity', 0);
        });

      dataPointsGroup.append('circle')
        .attr('class', 'advisory-halo')
        .attr('data-index', i)
        .attr('cx', x)
        .attr('cy', advisoryY)
        .attr('r', 8)
        .attr('fill', advisoryColor)
        .style('opacity', 0)
        .style('pointer-events', 'none');

      dataPointsGroup.append('circle')
        .attr('cx', x)
        .attr('cy', advisoryY)
        .attr('r', 0)
        .attr('fill', advisoryColor)
        .style('cursor', 'pointer')
        .style('pointer-events', 'none')
        .transition()
        .delay(1000 + i * 50)
        .duration(300)
        .attr('r', 3);
    });

  }, [dataPoints, loading, timeRange, theme.palette.divider, theme.palette.primary.main, theme.palette.advisories.main, theme.palette.gray, theme.palette.mode, resizeKey]);

  /**
   * Resize Observer Effect
   *
   * Monitors container size changes and triggers chart redraw
   * Uses ResizeObserver API for efficient size change detection
   */
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setResizeKey(prev => prev + 1);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /**
   * Window Resize Effect
   *
   * Handles browser window resize events
   * Complements ResizeObserver for comprehensive resize handling
   */
  useEffect(() => {
    const handleResize = () => {
      setResizeKey(prev => prev + 1);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dateRangeLabel = useMemo(() => {
    if (!timeRange) return '';

    const endDate = new Date();
    let startDate: Date;

    switch (timeRange) {
      case 'THREE_DAYS':
        startDate = new Date(endDate.getTime() - (3 * 24 * 60 * 60 * 1000));
        break;
      case 'SEVEN_DAYS':
        startDate = new Date(endDate.getTime() - (7 * 24 * 60 * 60 * 1000));
        break;
      case 'FOURTEEN_DAYS':
        startDate = new Date(endDate.getTime() - (14 * 24 * 60 * 60 * 1000));
        break;
      case 'THIRTY_DAYS':
        startDate = new Date(endDate.getTime() - (30 * 24 * 60 * 60 * 1000));
        break;
      default:
        startDate = new Date(endDate.getTime() - (30 * 24 * 60 * 60 * 1000));
    }

    const startFormatted = startDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric'
    });

    const endFormatted = endDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric'
    });

    return `${startFormatted} – ${endFormatted}`;
  }, [timeRange]);

  return (
    <Box
      ref={containerRef}
      className="chart-container"
      sx={{
        width: '100%',
        height: '500px',
        backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        pb: 1,
        mb: 2,
        display: 'block'
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="calc(100% - 40px)"
        style={{
          display: 'block'
        }}
      />

      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          mt: 0.5,
          mb: 0.5,
          color: 'text.secondary',
          fontSize: '0.875rem',
          flexShrink: 0
        }}
      >
        {dateRangeLabel}
      </Typography>

      <ChartTooltip ref={tooltipRef} cardType={currentTooltipType} />
    </Box>
  );
});

D3LineChart.displayName = 'D3LineChart';

export default D3LineChart;