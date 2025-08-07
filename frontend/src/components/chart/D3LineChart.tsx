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

  // Combined chart setup and data update effect
  useEffect(() => {
    if (!svgRef.current || !dimensions.width || loading) return;

    const svg = d3.select(svgRef.current);
    
    // Clear existing content
    svg.selectAll('*').remove();

    // Responsive margins based on screen size
    const isMobile = dimensions.width < 768;
    const margin = { 
      top: 40, 
      right: isMobile ? 40 : 40, 
      bottom: 40, 
      left: isMobile ? 40 : 40 
    };
    
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    // Create main group
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Only proceed with data rendering if we have data
    if (!dataPoints.length) return;

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

    // Add uniform grid lines with dashed pattern
    const gridSpacing = Math.min(chartWidth, chartHeight) / 4; // Fewer cells - 4x4 grid
    const xGridLines = Math.floor(chartWidth / gridSpacing);
    const yGridLines = Math.floor(chartHeight / gridSpacing);
    
    // Add vertical grid lines
    for (let i = 0; i <= xGridLines; i++) {
      const x = i * gridSpacing;
      g.append('line')
        .attr('class', 'grid-line-vertical')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .style('stroke', '#E2E8F0') // Match sidebar border color
        .style('stroke-width', 1)
        .style('stroke-dasharray', '3,3')
        .style('opacity', 1);
    }

    // Add horizontal grid lines
    for (let i = 0; i <= yGridLines; i++) {
      const y = i * gridSpacing;
      g.append('line')
        .attr('class', 'grid-line-horizontal')
        .attr('x1', 0)
        .attr('x2', chartWidth)
        .attr('y1', y)
        .attr('y2', y)
        .style('stroke', '#E2E8F0') // Match sidebar border color
        .style('stroke-width', 1)
        .style('stroke-dasharray', '3,3')
        .style('opacity', 1);
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
      .attr('stroke', '#6B46C1')
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
      .attr('stroke', '#C084FC') // Slightly darker purple for advisories
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
