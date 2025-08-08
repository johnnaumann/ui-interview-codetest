'use client';

import React from 'react';
import Chart from '../components/Chart';

/**
 * Home Page Component
 * 
 * This is the main page component for the application, serving as the entry point
 * for the security metrics dashboard. The page is intentionally simple and focused,
 * delegating all functionality to the Chart component which contains the complete
 * dashboard implementation.
 * 
 * The component uses the 'use client' directive to enable client-side interactivity
 * and state management required by the chart dashboard.
 * 
 * Structure:
 * - Single Chart component that contains the entire dashboard
 * - No additional layout or navigation elements
 * - Clean, focused user experience
 */
export default function Home() {
  return <Chart />;
}
