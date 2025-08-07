'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_TIME_SERIES_DATA, TimeSeriesResponse, TimeRange, CriticalityLevel, DataPoint } from '../lib/graphql-queries';

const SecurityMetricsChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('THIRTY_DAYS');
  const [selectedCriticalities, setSelectedCriticalities] = useState<CriticalityLevel[]>([
    'NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
  ]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  const { data, loading, error } = useQuery<TimeSeriesResponse>(GET_TIME_SERIES_DATA, {
    variables: {
      timeRange,
      criticalities: selectedCriticalities,
    },
  });

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as TimeRange);
  };

  const handleCriticalityChange = (event: SelectChangeEvent<typeof selectedCriticalities>) => {
    const value = event.target.value;
    setSelectedCriticalities(typeof value === 'string' ? value.split(',') as CriticalityLevel[] : value);
  };

  // Function to update dimensions based on container size
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = Math.max(400, Math.min(600, containerWidth * 0.6)); // Responsive height
      
      setDimensions({
        width: containerWidth,
        height: containerHeight,
      });
    }
  }, []);

  // ResizeObserver to watch container size changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initial dimension calculation
    updateDimensions();

    return () => {
      resizeObserver.disconnect();
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
    if (!data || !svgRef.current || !dimensions.width) return;

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

    const dataPoints = data.timeSeriesData.dataPoints;
    
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

    // Add CVE line - responsive stroke width
    g.append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', '#0052CC') // Mondoo primary blue
      .attr('stroke-width', isMobile ? 2 : 3)
      .attr('d', cveLineGenerator);

    // Add Advisory line - responsive stroke width
    g.append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', '#E53E3E') // Mondoo error red
      .attr('stroke-width', isMobile ? 2 : 3)
      .attr('d', advisoryLineGenerator);

    // Add CVE dots
    g.selectAll('.cve-dot')
      .data(parsedData)
      .enter()
      .append('circle')
      .attr('class', 'cve-dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.cves))
      .attr('r', isMobile ? 3 : 5)
      .attr('fill', '#0052CC')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', isMobile ? 1 : 2)
      .on('mouseover', function(event, d) {
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
          .style('border', '1px solid #E2E8F0');

        tooltip.html(`CVEs: ${d.cves}<br/>Date: ${d.date.toLocaleDateString()}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.selectAll('.tooltip').remove();
      });

    // Add Advisory dots
    g.selectAll('.advisory-dot')
      .data(parsedData)
      .enter()
      .append('circle')
      .attr('class', 'advisory-dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.advisories))
      .attr('r', isMobile ? 3 : 5)
      .attr('fill', '#E53E3E')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', isMobile ? 1 : 2)
      .on('mouseover', function(event, d) {
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
          .style('border', '1px solid #E2E8F0');

        tooltip.html(`Advisories: ${d.advisories}<br/>Date: ${d.date.toLocaleDateString()}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.selectAll('.tooltip').remove();
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
      .attr('stroke', '#0052CC')
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
      .attr('stroke', '#E53E3E')
      .attr('stroke-width', isMobile ? 2 : 3);

    legend.append('text')
      .attr('x', (isMobile ? legendSpacing : 0) + legendLineLength + 5)
      .attr('y', isMobile ? 0 : legendSpacing)
      .attr('dy', '0.32em')
      .style('font-size', legendFontSize)
      .style('fill', '#1A202C')
      .style('font-weight', '600')
      .text('Advisories');

  }, [data, dimensions]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading security metrics: {error.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Security Metrics Over Time
      </Typography>

      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={handleTimeRangeChange}
            >
              <MenuItem value="THREE_DAYS">Last 3 Days</MenuItem>
              <MenuItem value="SEVEN_DAYS">Last 7 Days</MenuItem>
              <MenuItem value="FOURTEEN_DAYS">Last 14 Days</MenuItem>
              <MenuItem value="THIRTY_DAYS">Last 30 Days</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel>Criticality Levels</InputLabel>
            <Select
              multiple
              value={selectedCriticalities}
              onChange={handleCriticalityChange}
              input={<OutlinedInput label="Criticality Levels" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="NONE">None</MenuItem>
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
              <MenuItem value="CRITICAL">Critical</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Summary Cards */}
      {data && (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">
                  CVEs
                </Typography>
                <Typography variant="h4">
                  {data.timeSeriesData.summary.cves.averageValue.toFixed(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average ({data.timeSeriesData.summary.cves.delta.toFixed(1)}% change)
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="secondary">
                  Advisories
                </Typography>
                <Typography variant="h4">
                  {data.timeSeriesData.summary.advisories.averageValue.toFixed(1)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average ({data.timeSeriesData.summary.advisories.delta.toFixed(1)}% change)
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}

      {/* Chart */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Box ref={containerRef} sx={{ width: '100%', minHeight: 400 }}>
          <svg 
            ref={svgRef} 
            width={dimensions.width} 
            height={dimensions.height}
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              display: 'block'
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default SecurityMetricsChart;
