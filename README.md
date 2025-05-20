# UI Visualization Exercise

## Welcome! 👋

Welcome to the Mondoo UI Visualization exercise! This exercise is meant to help us understand your knowledge base in React with visualization tools like d3.js, focusing on security metrics and time series data, which is something we regularly use. You'll be working with a pre-built GraphQL server that provides endpoints for querying security-related data. It will be your responsibility to turn these into a chart that is easily consumable by someone who might use Mondoo.

## Getting Started 🚀

### 1. Fork the Repository

First, fork this repository to your GitHub account:

1. Click the "Fork" button in the top-right corner of this repository
2. Select your GitHub account as the destination

### 2. Clone Your Fork

Clone your forked repository to your local machine:

```bash
git clone https://github.com/YOUR-USERNAME/ui-interview-codetest.git
cd ui-interview-codetest
```

### 3. Set Up the Development Environment

#### Required Software 🛠️

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.14.0 or higher)
- [Yarn](https://yarnpkg.com/) (v1.22 or higher)
- A code editor (like [VS Code](https://code.visualstudio.com/))
- [Git](https://git-scm.com/) for version control
- A GraphQL client for testing (we recommend using [Apollo Studio](https://studio.apollographql.com/sandbox/explorer) in your browser)

#### Install Dependencies

```bash
yarn install
```

#### Start the Development Server

```bash
yarn dev
```

The server will start on `http://localhost:3000`. You can access the GraphQL playground at `http://localhost:3000/graphql`

## The Assignment 📝

### Overview

Create a modern, interactive dashboard that visualizes security metrics over time using the provided GraphQL API. The focus is on creating an intuitive and responsive visualization that helps users quickly understand security trends and patterns.

### Technical Requirements

- React for the frontend framework
- Material-UI for the component library
- Apollo Client for GraphQL integration
- D3.js (or similar visualization library) for the chart implementation

### Core Features

1. **Interactive Line Chart**

   - Display security metrics over time
   - Support for multiple data series
   - Smooth animations for data updates
   - Responsive design that adapts to different screen sizes

2. **Filtering System**

   - Filter data by criticality levels (e.g., Critical, High, Medium, Low)
   - Real-time updates when filters change
   - Clear visual indication of active filters

3. **Enhanced User Experience**

   - Interactive tooltips showing detailed information on hover
   - Smooth transitions and animations for data changes
   - Clear data visualization with appropriate color coding
   - Responsive layout that works across different screen sizes

4. **Modern Design Elements**
   - Clean, professional interface
   - Consistent spacing and typography
   - Appropriate use of color to convey information
   - Clear visual hierarchy

### Evaluation Criteria

Your solution will be evaluated on:

1. **Technical Implementation**

   - Code organization and structure
   - Proper use of React patterns and hooks
   - Efficient data fetching and state management
   - Performance optimization

2. **Visualization Quality**

   - Clarity of data presentation
   - Effectiveness of interactive elements
   - Responsiveness and adaptability
   - Smooth animations and transitions

3. **User Experience**

   - Intuitive filtering system
   - Helpful tooltips and information display
   - Overall usability and accessibility
   - Error handling and loading states

4. **Code Quality**
   - Clean, maintainable code
   - Proper TypeScript usage
   - Appropriate error handling
   - Documentation and comments

### Bonus Points

- Additional chart types or views
- Advanced filtering options
- Export functionality
- Custom theme implementation
- Unit tests
- Performance optimizations

### Time Estimate

We expect this assignment to take approximately 4-6 hours to complete. Focus on delivering a solid core implementation rather than trying to implement all bonus features.

### Getting Started

1. Review the GraphQL schema and available queries
2. Plan your component structure
3. Set up your development environment
4. Implement the core features
5. Add enhancements and polish

Remember to commit your changes regularly and document your approach in the pull request description.

## How to Submit 📤

1. Create a new repository for your frontend implementation:

   ```bash
   # Create a new directory for your frontend project
   mkdir frontend
   cd frontend

   # Initialize your project (using your preferred package manager)
   npm init
   # or
   yarn init
   ```

2. In your frontend repository's README, include:
   - Any environment variables or configuration needed
   - How to run your frontend application
   - A brief explanation of your approach
   - Any challenges you faced and how you overcame them
   - Any additional features or improvements you made

## Need Help? 🤝

If you run into any issues or have questions, please reach out to jamie@mondoo.com and
we will assist you as soon as we receive your message. Please keep in mind many of us work
in different areas of the globe, so our timezones may not always match up.

Good luck! 🎉
