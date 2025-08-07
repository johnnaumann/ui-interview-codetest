'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { Box, Paper } from '@mui/material';
import { DataPoint } from '../../api/graphql-queries';

interface D3LineChartProps {
  dataPoints: DataPoint[];
  loading?: boolean;
}

const D3LineChart: React.FC<D3LineChartProps> = ({
  dataPoints,
  loading = false,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Function to update dimensions based on container size
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

  // ResizeObserver to watch container size changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // Use requestAnimationFrame to avoid ResizeObserver loop errors
      requestAnimationFrame(() => {
        updateDimensions();
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initial dimension calculation with a slight delay
    const timer = setTimeout(updateDimensions, 100);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [updateDimensions]);

  // Window resize listener as fallback
  useEffect(() => {
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateDimensions]);

  useEffect(() => {
    if (!dataPoints.length || !svgRef.current || !dimensions.width || loading) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Responsive margins based on screen size
    const isMobile = dimensions.width < 768;
    const margin = { 
      top: 20, 
      right: isMobile ? 40 : 80, 
      bottom: isMobile ? 50 : 40, 
      left: isMobile ? 40 : 60 
    };
    
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;
    
    // Parse timestamps and sort data chronologically
    const parsedData = dataPoints
      .map(d => ({
        ...d,
        date: new Date(d.timestamp),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    // Set up scales
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

    // Create main group
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X axis with responsive ticks
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat(isMobile ? '%m/%d' : '%m/%d') as (date: Date | d3.NumberValue) => string)
      .ticks(isMobile ? 4 : 8);
      
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', isMobile ? '12px' : '14px')
      .style('fill', '#4A5568');

    // Add Y axis with responsive ticks
    const yAxis = d3.axisLeft(yScale)
      .ticks(isMobile ? 5 : 8);
      
    g.append('g')
      .call(yAxis)
      .selectAll('text')
      .style('font-size', isMobile ? '12px' : '14px')
      .style('fill', '#4A5568');

    // Add axis labels - only show on larger screens
    if (!isMobile) {
      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (chartHeight / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#4A5568')
        .style('font-weight', '500')
        .text('Count');

      g.append('text')
        .attr('transform', `translate(${chartWidth / 2}, ${chartHeight + margin.bottom - 5})`)
        .style('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#4A5568')
        .style('font-weight', '500')
        .text('Date');
    }

    // Create line generators
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

    // Add CVE line with smooth transitions
    const cveLine = g.append('path')
      .attr('class', 'cve-line')
      .attr('fill', 'none')
      .attr('stroke', '#6B46C1') // Main brand purple for CVEs
      .attr('stroke-width', isMobile ? 1 : 1.5)
      .attr('d', cveLineGenerator(parsedData));
    
    // Animate line drawing
    const cveTotalLength = cveLine.node()?.getTotalLength() || 0;
    cveLine
      .attr('stroke-dasharray', cveTotalLength + ' ' + cveTotalLength)
      .attr('stroke-dashoffset', cveTotalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // Add Advisory line with smooth transitions
    const advisoryLine = g.append('path')
      .attr('class', 'advisory-line')
      .attr('fill', 'none')
      .attr('stroke', '#E9D5FF') // Very light purple for advisories
      .attr('stroke-width', isMobile ? 1 : 1.5)
      .attr('d', advisoryLineGenerator(parsedData));
    
    // Animate line drawing
    const advisoryTotalLength = advisoryLine.node()?.getTotalLength() || 0;
    advisoryLine
      .attr('stroke-dasharray', advisoryTotalLength + ' ' + advisoryTotalLength)
      .attr('stroke-dashoffset', advisoryTotalLength)
      .transition()
      .duration(1000)
      .delay(200) // Slight delay for staggered effect
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);



  }, [dataPoints, dimensions, loading]);

  return (
    <Paper elevation={2} className="chart-paper" sx={{ p: 2 }}>
      <Box 
        ref={containerRef} 
        className="chart-container"
        sx={{ 
          width: '100%', 
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden'
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
      </Box>
    </Paper>
  );
};

export default D3LineChart;
