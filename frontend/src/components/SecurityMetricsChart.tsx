'use client';

import React, { useEffect, useRef, useState } from 'react';
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

interface SecurityMetricsChartProps {
  width?: number;
  height?: number;
}

const SecurityMetricsChart: React.FC<SecurityMetricsChartProps> = ({
  width = 800,
  height = 400,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('THIRTY_DAYS');
  const [selectedCriticalities, setSelectedCriticalities] = useState<CriticalityLevel[]>([
    'NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
  ]);

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

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 80, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

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

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%m/%d') as (date: Date | d3.NumberValue) => string));

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(yScale));

    // Add axis labels
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (chartHeight / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#666')
      .text('Count');

    g.append('text')
      .attr('transform', `translate(${chartWidth / 2}, ${chartHeight + margin.bottom})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#666')
      .text('Date');

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

    // Add CVE line
    g.append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', '#1976d2')
      .attr('stroke-width', 2)
      .attr('d', cveLineGenerator);

    // Add Advisory line
    g.append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', '#dc004e')
      .attr('stroke-width', 2)
      .attr('d', advisoryLineGenerator);

    // Add CVE dots
    g.selectAll('.cve-dot')
      .data(parsedData)
      .enter()
      .append('circle')
      .attr('class', 'cve-dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.cves))
      .attr('r', 4)
      .attr('fill', '#1976d2')
      .on('mouseover', function(event, d) {
        // Add tooltip
        const tooltip = d3.select('body')
          .append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('padding', '8px')
          .style('background', 'rgba(0, 0, 0, 0.8)')
          .style('color', 'white')
          .style('border-radius', '4px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', 1000);

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
      .attr('r', 4)
      .attr('fill', '#dc004e')
      .on('mouseover', function(event, d) {
        const tooltip = d3.select('body')
          .append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('padding', '8px')
          .style('background', 'rgba(0, 0, 0, 0.8)')
          .style('color', 'white')
          .style('border-radius', '4px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', 1000);

        tooltip.html(`Advisories: ${d.advisories}<br/>Date: ${d.date.toLocaleDateString()}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.selectAll('.tooltip').remove();
      });

    // Add legend
    const legend = g.append('g')
      .attr('transform', `translate(${chartWidth - 80}, 20)`);

    legend.append('line')
      .attr('x1', 0)
      .attr('x2', 15)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', '#1976d2')
      .attr('stroke-width', 2);

    legend.append('text')
      .attr('x', 20)
      .attr('y', 0)
      .attr('dy', '0.32em')
      .style('font-size', '12px')
      .style('fill', '#666')
      .text('CVEs');

    legend.append('line')
      .attr('x1', 0)
      .attr('x2', 15)
      .attr('y1', 20)
      .attr('y2', 20)
      .attr('stroke', '#dc004e')
      .attr('stroke-width', 2);

    legend.append('text')
      .attr('x', 20)
      .attr('y', 20)
      .attr('dy', '0.32em')
      .style('font-size', '12px')
      .style('fill', '#666')
      .text('Advisories');

  }, [data, width, height]);

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
        <svg ref={svgRef} width={width} height={height} />
      </Paper>
    </Box>
  );
};

export default SecurityMetricsChart;
