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
    
    // Check if this is the initial render
    const isInitial = svg.select('g.main-chart-group').empty();
    
    // Clear everything except the main group on data changes
    if (!isInitial) {
      svg.selectAll('g.main-chart-group > *').remove();
    }

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

    // Get or create main group
    let g = svg.select('g.main-chart-group');
    if (g.empty()) {
      g = svg
        .append('g')
        .attr('class', 'main-chart-group');
    }
    
    // Always set/update the transform
    g.attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X axis with responsive ticks
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat(isMobile ? '%m/%d' : '%m/%d') as (date: Date | d3.NumberValue) => string)
      .ticks(isMobile ? 4 : 8);
    
    const xAxisGroup = g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis);
      
    xAxisGroup.selectAll('text')
      .style('font-size', isMobile ? '12px' : '14px')
      .style('fill', '#4A5568');

    // Add Y axis with responsive ticks
    const yAxis = d3.axisLeft(yScale)
      .ticks(isMobile ? 5 : 8);
    
    const yAxisGroup = g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
      
    yAxisGroup.selectAll('text')
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
      .attr('stroke', '#6B46C1') // Mondoo brand purple
      .attr('stroke-width', isMobile ? 2 : 3)
      .attr('d', cveLineGenerator(parsedData));
    
    // Animate line drawing on initial load
    if (isInitial) {
      const totalLength = cveLine.node()?.getTotalLength() || 0;
      cveLine
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    }

    // Add Advisory line with smooth transitions
    const advisoryLine = g.append('path')
      .attr('class', 'advisory-line')
      .attr('fill', 'none')
      .attr('stroke', '#1E40AF') // Mondoo brand blue
      .attr('stroke-width', isMobile ? 2 : 3)
      .attr('d', advisoryLineGenerator(parsedData));
    
    // Animate line drawing on initial load
    if (isInitial) {
      const totalLength = advisoryLine.node()?.getTotalLength() || 0;
      advisoryLine
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .delay(200) // Slight delay for staggered effect
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    }

    // Add CVE dots with smooth transitions
    const cveDots = g.selectAll('.cve-dot')
      .data(parsedData)
      .enter()
      .append('circle')
      .attr('class', 'cve-dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.cves))
      .attr('r', isInitial ? 0 : isMobile ? 3 : 5)
      .attr('fill', '#6B46C1')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', isMobile ? 1 : 2)
      .style('opacity', isInitial ? 0 : 1);
    
    // Animate dots on initial load
    if (isInitial) {
      cveDots
        .transition()
        .duration(800)
        .delay(400)
        .ease(d3.easeBackOut.overshoot(1.2))
        .attr('r', isMobile ? 3 : 5)
        .style('opacity', 1);
    }
    
    // Add event listeners
    cveDots
      .on('mouseover', function(event, d) {
        // Scale up on hover
        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', (isMobile ? 3 : 5) * 1.3);
        
        // Add tooltip
        const tooltip = d3.select('body')
          .append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('padding', '12px 16px')
          .style('background', '#FFFFFF')
          .style('color', '#1A202C')
          .style('border-radius', '8px')
          .style('font-size', '14px')
          .style('font-weight', '500')
          .style('pointer-events', 'none')
          .style('z-index', 1000)
          .style('box-shadow', '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.1)')
          .style('border', '1px solid #E2E8F0')
          .style('opacity', 0);

        tooltip.html(`CVEs: ${d.cves}<br/>Date: ${d.date.toLocaleDateString()}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .transition()
          .duration(150)
          .style('opacity', 1);
      })
      .on('mouseout', function() {
        // Scale back down
        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', isMobile ? 3 : 5);
        
        // Remove tooltip with fade
        d3.selectAll('.tooltip')
          .transition()
          .duration(150)
          .style('opacity', 0)
          .remove();
      });

    // Add Advisory dots with smooth transitions
    const advisoryDots = g.selectAll('.advisory-dot')
      .data(parsedData)
      .enter()
      .append('circle')
      .attr('class', 'advisory-dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.advisories))
      .attr('r', isInitial ? 0 : isMobile ? 3 : 5)
      .attr('fill', '#1E40AF')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', isMobile ? 1 : 2)
      .style('opacity', isInitial ? 0 : 1);
    
    // Animate dots on initial load
    if (isInitial) {
      advisoryDots
        .transition()
        .duration(800)
        .delay(600) // Slight delay for staggered effect
        .ease(d3.easeBackOut.overshoot(1.2))
        .attr('r', isMobile ? 3 : 5)
        .style('opacity', 1);
    }
    
    // Add event listeners
    advisoryDots
      .on('mouseover', function(event, d) {
        // Scale up on hover
        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', (isMobile ? 3 : 5) * 1.3);
        
        // Add tooltip
        const tooltip = d3.select('body')
          .append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('padding', '12px 16px')
          .style('background', '#FFFFFF')
          .style('color', '#1A202C')
          .style('border-radius', '8px')
          .style('font-size', '14px')
          .style('font-weight', '500')
          .style('pointer-events', 'none')
          .style('z-index', 1000)
          .style('box-shadow', '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.1)')
          .style('border', '1px solid #E2E8F0')
          .style('opacity', 0);

        tooltip.html(`Advisories: ${d.advisories}<br/>Date: ${d.date.toLocaleDateString()}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .transition()
          .duration(150)
          .style('opacity', 1);
      })
      .on('mouseout', function() {
        // Scale back down
        d3.select(this)
          .transition()
          .duration(150)
          .attr('r', isMobile ? 3 : 5);
        
        // Remove tooltip with fade
        d3.selectAll('.tooltip')
          .transition()
          .duration(150)
          .style('opacity', 0)
          .remove();
      });

    // Add legend - responsive positioning
    const legendX = isMobile ? 20 : chartWidth - 80;
    const legendY = isMobile ? chartHeight + 30 : 20;
    const legend = g.append('g')
      .attr('transform', `translate(${legendX}, ${legendY})`);

    // Legend lines and text - responsive layout
    const legendSpacing = isMobile ? 80 : 25;
    const legendLineLength = isMobile ? 12 : 15;
    const legendFontSize = isMobile ? '12px' : '14px';

    legend.append('line')
      .attr('x1', 0)
      .attr('x2', legendLineLength)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#6B46C1')
      .attr('stroke-width', isMobile ? 2 : 3);

    legend.append('text')
      .attr('x', legendLineLength + 5)
      .attr('y', 0)
      .attr('dy', '0.32em')
      .style('font-size', legendFontSize)
      .style('fill', '#1A202C')
      .style('font-weight', '600')
      .text('CVEs');

    legend.append('line')
      .attr('x1', isMobile ? legendSpacing : 0)
      .attr('x2', (isMobile ? legendSpacing : 0) + legendLineLength)
      .attr('y1', isMobile ? 0 : legendSpacing)
      .attr('y2', isMobile ? 0 : legendSpacing)
      .attr('stroke', '#1E40AF')
      .attr('stroke-width', isMobile ? 2 : 3);

    legend.append('text')
      .attr('x', (isMobile ? legendSpacing : 0) + legendLineLength + 5)
      .attr('y', isMobile ? 0 : legendSpacing)
      .attr('dy', '0.32em')
      .style('font-size', legendFontSize)
      .style('fill', '#1A202C')
      .style('font-weight', '600')
      .text('Advisories');

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
