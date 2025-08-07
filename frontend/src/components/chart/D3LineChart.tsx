'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { Box, Paper, useTheme } from '@mui/material';
import { DataPoint } from '../../api/graphql-queries';

interface D3LineChartProps {
  dataPoints: DataPoint[];
  loading?: boolean;
}

const D3LineChart: React.FC<D3LineChartProps> = ({
  dataPoints,
  loading = false,
}) => {
  const theme = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({ visible: false, x: 0, y: 0, content: '' });

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = Math.max(300, rect.width || containerRef.current.offsetWidth);
      const containerHeight = Math.max(400, Math.min(600, containerWidth * 0.6));
      
      setDimensions({
        width: containerWidth,
        height: containerHeight,
      });
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        updateDimensions();
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const timer = setTimeout(updateDimensions, 100);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [updateDimensions]);

  useEffect(() => {
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateDimensions]);

  useEffect(() => {
    if (!svgRef.current || !dimensions.width || loading) return;

    const svg = d3.select(svgRef.current);
    
    svg.selectAll('*').remove();

    const isMobile = dimensions.width < 768;
        const margin = {
      top: 20,
      right: isMobile ? 20 : 20,
      bottom: 20,
      left: isMobile ? 20 : 20
    };
    
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    const g = svg
      .append('g')
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

    const xGridSpacing = chartWidth / 4;
    const yGridSpacing = chartHeight / 4;
    
    for (let i = 0; i <= 4; i++) {
      const x = i * xGridSpacing;
      g.append('line')
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
      g.append('line')
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

    const cveLine = g.append('path')
      .attr('class', 'cve-line')
      .attr('fill', 'none')
      .attr('stroke', theme.palette.primary.main)
      .attr('stroke-width', isMobile ? 1 : 1.5)
      .attr('d', cveLineGenerator(parsedData))
      .style('cursor', 'pointer');
    
    const cveTotalLength = cveLine.node()?.getTotalLength() || 0;
    cveLine
      .attr('stroke-dasharray', cveTotalLength + ' ' + cveTotalLength)
      .attr('stroke-dashoffset', cveTotalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    const advisoryLine = g.append('path')
      .attr('class', 'advisory-line')
      .attr('fill', 'none')
      .attr('stroke', theme.palette.advisories.main)
      .attr('stroke-width', isMobile ? 1 : 1.5)
      .attr('d', advisoryLineGenerator(parsedData))
      .style('cursor', 'pointer');
    
    const advisoryTotalLength = advisoryLine.node()?.getTotalLength() || 0;
    advisoryLine
      .attr('stroke-dasharray', advisoryTotalLength + ' ' + advisoryTotalLength)
      .attr('stroke-dashoffset', advisoryTotalLength)
      .transition()
      .duration(1000)
      .delay(200)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // Add data points for tooltips
    const dataPointsGroup = g.append('g').attr('class', 'data-points');

    parsedData.forEach((d, i) => {
      const cveY = yScale(d.cves);
      const advisoryY = yScale(d.advisories);
      const x = xScale(d.date);

      // CVE data point
      dataPointsGroup.append('circle')
        .attr('cx', x)
        .attr('cy', cveY)
        .attr('r', 0)
        .attr('fill', theme.palette.primary.main)
        .style('cursor', 'pointer')
        .on('mouseover', (event) => {
          const tooltipContent = `
            <div style="font-family: Arial, sans-serif; font-size: 12px;">
              <div style="font-weight: bold; margin-bottom: 4px; color: #1F2937;">
                ${d.date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div style="color: ${theme.palette.primary.main}; font-weight: 600;">
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
        .on('mouseout', () => {
          setTooltip({ visible: false, x: 0, y: 0, content: '' });
        })
        .transition()
        .delay(1000 + i * 50)
        .duration(300)
        .attr('r', 3);

      // Advisory data point
      dataPointsGroup.append('circle')
        .attr('cx', x)
        .attr('cy', advisoryY)
        .attr('r', 0)
        .attr('fill', theme.palette.advisories.main)
        .style('cursor', 'pointer')
        .on('mouseover', (event) => {
          const tooltipContent = `
            <div style="font-family: Arial, sans-serif; font-size: 12px;">
              <div style="font-weight: bold; margin-bottom: 4px; color: #1F2937;">
                ${d.date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div style="color: ${theme.palette.advisories.main}; font-weight: 600;">
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
        .on('mouseout', () => {
          setTooltip({ visible: false, x: 0, y: 0, content: '' });
        })
        .transition()
        .delay(1000 + i * 50)
        .duration(300)
        .attr('r', 3);
    });

  }, [dataPoints, dimensions, loading, theme.palette.primary.main, theme.palette.advisories.main]);

  return (
    <Paper elevation={2} className="chart-paper" sx={{ p: 2 }}>
      <Box 
        ref={containerRef} 
        className="chart-container"
        sx={{ 
          width: '100%', 
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <svg 
          ref={svgRef} 
          width={dimensions.width} 
          height={dimensions.height}
          style={{ 
            width: '100%',
            height: 'auto',
            maxWidth: '100%', 
            display: 'block'
          }}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMidYMid meet"
        />
        
        {tooltip.visible && (
          <Box
            sx={{
              position: 'fixed',
              left: tooltip.x,
              top: tooltip.y,
              backgroundColor: 'white',
              color: '#333333',
              padding: 1.5,
              borderRadius: 1,
              fontSize: '12px',
              zIndex: 1000,
              pointerEvents: 'none',

              border: '1px solid #E2E8F0',
            }}
            dangerouslySetInnerHTML={{ __html: tooltip.content }}
          />
        )}
      </Box>
    </Paper>
  );
};

export default D3LineChart;
