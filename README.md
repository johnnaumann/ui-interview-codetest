# UI Interview Code Test

## Development Setup

This project uses `concurrently` to run both the GraphQL server and Next.js frontend simultaneously during development.

### Quick Start

```bash
# Install dependencies
yarn install
cd frontend && yarn install && cd ..

# Start both servers concurrently
yarn dev
```

This will start:
- **GraphQL Server**: http://localhost:3000
- **Next.js Frontend**: http://localhost:3001

### Individual Commands

If you need to run servers individually:

```bash
# GraphQL server only
yarn dev:server

# Frontend only  
yarn dev:frontend
```

### Features

- **Concurrent Execution**: Both servers start simultaneously using `concurrently`
- **Process Management**: If one process fails, the other is automatically terminated
- **Colored Output**: Each process has distinct colored output for easy identification
- **Auto-restart**: Failed processes will attempt to restart up to 3 times
- **Timestamps**: All output includes timestamps for debugging

### Troubleshooting

If you encounter port conflicts:
1. Stop all running processes: `pkill -f "nodemon\|next"`
2. Restart with: `yarn dev`

The GraphQL server will automatically try the next available port if 3000 is in use.
