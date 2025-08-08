'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Box, useTheme, Typography } from '@mui/material';
import { D3LineChartProps, DataPoint } from '../../types';

const D3LineChart: React.FC<D3LineChartProps> = ({
  dataPoints,
  loading = false,
}) => {
  const theme = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({ visible: false, x: 0, y: 0, content: '' });
  const [resizeKey, setResizeKey] = useState(0);

  // Combined useEffect for grid and chart rendering
  useEffect(() => {
    if (!svgRef.current || loading) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Clear existing elements
    svg.selectAll('.grid-group, .chart-group, .data-points, .cve-line, .advisory-line').remove();

    // Create grid
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

    // Create chart group
    const g = svg
      .append('g')
      .attr('class', 'chart-group')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    if (!dataPoints.length) return;

    const parsedData = dataPoints
      .map(d => ({
        ...d,
        date: new Date(d.timestamp),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

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

    // Create lines
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

    // Animate lines
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

    // Create data points
    const dataPointsGroup = g.append('g').attr('class', 'data-points');

    parsedData.forEach((d, i) => {
      const cveY = yScale(d.cves);
      const advisoryY = yScale(d.advisories);
      const x = xScale(d.date);

      // CVE dot with halo and hit area
      const cveColor = theme.palette.primary.main;

      // Invisible larger hit area circle
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
          const tooltipContent = `
            <div style="font-family: Arial, sans-serif; font-size: 12px;">
              <div style="font-weight: bold; margin-bottom: 4px; color: ${theme.palette.gray[800]};">
                ${d.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div style="color: ${cveColor}; font-weight: 600;">
                CVEs: ${d.cves}
              </div>
            </div>
          `;
          setTooltip({
            visible: true,
            x: event.pageX + 10,
            y: event.pageY - 10,
            content: tooltipContent
          });
        })
        .on('mouseout', (event) => {
          const target = event.target as Element;
          const index = target.getAttribute('data-index');
          const type = target.getAttribute('data-type');
          if (index !== null && type === 'cve-hit') {
            d3.select(`.cve-halo[data-index="${index}"]`).style('opacity', 0);
          }
          setTooltip({ visible: false, x: 0, y: 0, content: '' });
        });

      // Halo effect circle
      dataPointsGroup.append('circle')
        .attr('class', 'cve-halo')
        .attr('data-index', i)
        .attr('cx', x)
        .attr('cy', cveY)
        .attr('r', 8)
        .attr('fill', cveColor)
        .style('opacity', 0)
        .style('pointer-events', 'none');

      // Main CVE dot
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

      // Advisory dot with halo and hit area
      const advisoryColor = theme.palette.advisories.main;

      // Invisible larger hit area circle
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
          const tooltipContent = `
            <div style="font-family: Arial, sans-serif; font-size: 12px;">
              <div style="font-weight: bold; margin-bottom: 4px; color: ${theme.palette.gray[800]};">
                ${d.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div style="color: ${advisoryColor}; font-weight: 600;">
                Advisories: ${d.advisories}
              </div>
            </div>
          `;
          setTooltip({
            visible: true,
            x: event.pageX + 10,
            y: event.pageY - 10,
            content: tooltipContent
          });
        })
        .on('mouseout', (event) => {
          const target = event.target as Element;
          const index = target.getAttribute('data-index');
          const type = target.getAttribute('data-type');
          if (index !== null && type === 'advisory-hit') {
            d3.select(`.advisory-halo[data-index="${index}"]`).style('opacity', 0);
          }
          setTooltip({ visible: false, x: 0, y: 0, content: '' });
        });

      // Halo effect circle
      dataPointsGroup.append('circle')
        .attr('class', 'advisory-halo')
        .attr('data-index', i)
        .attr('cx', x)
        .attr('cy', advisoryY)
        .attr('r', 8)
        .attr('fill', advisoryColor)
        .style('opacity', 0)
        .style('pointer-events', 'none');

      // Main advisory dot
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

  }, [dataPoints, loading, theme.palette.divider, theme.palette.primary.main, theme.palette.advisories.main, theme.palette.gray, resizeKey]);

  // Resize observer
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

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setResizeKey(prev => prev + 1);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const formatDateRange = () => {
    if (dataPoints.length === 0) return '';

    const sortedData = dataPoints
      .map(d => ({ ...d, date: new Date(d.timestamp) }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    const startDate = sortedData[0].date;
    const endDate = sortedData[sortedData.length - 1].date;

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
  };

  return (
    <Box
      ref={containerRef}
      className="chart-container"
      sx={{
        width: '100%',
        height: '500px',
        backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : 'white',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        pb: 1,
        mb: 2,
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
        {formatDateRange()}
      </Typography>

      {tooltip.visible && (
        <Box
          sx={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: theme.palette.tooltip.background,
            color: theme.palette.gray[700],
            padding: 1.5,
            borderRadius: 1,
            fontSize: '12px',
            zIndex: 1000,
            pointerEvents: 'none',
            border: `1px solid ${theme.palette.tooltip.border}`,
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </Box>
  );
};

export default D3LineChart;
