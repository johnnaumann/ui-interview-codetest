# UI Interview Code Test

## Development Setup

This project uses `concurrently` to run both the GraphQL server and Next.js frontend simultaneously during development. The entire build system uses **Yarn** exclusively for consistent package management with a **single package.json** file for simplified dependency management.

### Prerequisites

- **Node.js**: Version 18.18.0 or higher (required for Next.js)
- **Yarn**: Version 1.22.22 or higher

### Quick Start

```bash
# Install all dependencies
yarn install

# Start both servers concurrently
yarn dev
```

This will start:
- **GraphQL Server**: http://localhost:3000
- **Next.js Frontend**: http://localhost:3001

### Available Scripts

```bash
# Development
yarn dev                    # Start both servers concurrently
yarn dev:server            # Start GraphQL server only
yarn dev:frontend          # Start Next.js frontend only

# Dependencies
yarn install               # Install all dependencies (single package.json)

# Frontend (runs from frontend directory)
yarn build                 # Build the Next.js application
yarn start                 # Start the production frontend
yarn test                  # Run frontend tests
yarn test:watch            # Run frontend tests in watch mode
yarn test:coverage         # Run frontend tests with coverage
yarn lint                  # Run frontend linting
```

### Features

- **Concurrent Execution**: Both servers start simultaneously using `concurrently`
- **Yarn-Only**: Consistent package management with yarn throughout the project
- **Single Package.json**: All dependencies managed in one place for simplicity
- **Process Management**: If one process fails, the other is automatically terminated
- **Colored Output**: Each process has distinct colored output for easy identification
- **Auto-restart**: Failed processes will attempt to restart up to 3 times
- **Timestamps**: All output includes timestamps for debugging

### Project Structure

```
ui-interview-codetest/
├── api/                   # GraphQL server
├── frontend/              # Next.js application
├── package.json           # All dependencies and scripts (single file)
├── yarn.lock             # Dependency lock file
├── .yarnrc.yml           # Yarn configuration
└── concurrently.config.js # Concurrent execution configuration
```

### Troubleshooting

**Port Conflicts:**
```bash
# Stop all running processes
pkill -f "nodemon\|next"

# Restart with
yarn dev
```

**Node.js Version Issues:**
```bash
# Check your Node.js version
node --version

# Should be 18.18.0 or higher
```

**Dependency Issues:**
```bash
# Clean install all dependencies
rm -rf node_modules
yarn install
```

The GraphQL server will automatically try the next available port if 3000 is in use.
