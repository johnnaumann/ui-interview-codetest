// Helper function to generate a date string for a specific day offset
const getDateString = (dayOffset) => {
  const date = new Date();
  date.setDate(date.getDate() - dayOffset);
  return date.toISOString().split("T")[0] + "T01:00:00Z";
};

// Static data for 30 days
const staticData = {
  THREE_DAYS: Array.from({ length: 3 }, (_, i) => ({
    timestamp: getDateString(i),
    value: [10, 110, 47][i],
  })),
  SEVEN_DAYS: Array.from({ length: 7 }, (_, i) => ({
    timestamp: getDateString(i),
    value: [10, 110, 47, 47, 85, 120, 95][i],
  })),
  FOURTEEN_DAYS: Array.from({ length: 14 }, (_, i) => ({
    timestamp: getDateString(i),
    value: [10, 110, 47, 47, 85, 120, 95, 65, 42, 88, 130, 75, 55, 90][i],
  })),
  THIRTY_DAYS: Array.from({ length: 30 }, (_, i) => ({
    timestamp: getDateString(i),
    value: [
      10, 110, 47, 47, 85, 120, 95, 65, 42, 88, 130, 75, 55, 90, 105, 60, 80,
      115, 70, 50, 95, 125, 85, 45, 100, 140, 90, 65, 75, 110,
    ][i],
  })),
};

// Generate time series data using static data
const generateTimeSeriesData = (timeRange, criticality) => {
  const dataPoints = staticData[timeRange];

  return {
    dataPoints,
    summary: {
      totalCount: dataPoints.length,
      averageValue:
        dataPoints.reduce((sum, point) => sum + point.value, 0) /
        dataPoints.length,
      timeRange,
      criticality,
    },
  };
};

export { generateTimeSeriesData };
