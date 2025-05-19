# GraphQL Server Exercise

## Welcome! 👋

Welcome to the Mondoo UI Visualization exercise! This exercise is meant to help us understand your knowledge base with visualization tools like d3.js, focusing on security metrics and time series data. You'll be working with a pre-built GraphQL server that provides endpoints for querying security-related data. It will be your responsibility to turn these into a chart that is easily consumable by someone that would use a platform like Mondoo.

## Getting Started 🚀

### 1. Fork the Repository

First, fork this repository to your GitHub account:

1. Click the "Fork" button in the top-right corner of this repository
2. Select your GitHub account as the destination

### 2. Clone Your Fork

Clone your forked repository to your local machine:

```bash
git clone https://github.com/YOUR-USERNAME/gql-server.git
cd gql-server
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

[Assignment details will be added here]

## How to Submit 📤

1. Make sure your changes are committed to your fork:

   ```bash
   git add .
   git commit -m "Complete exercise solution"
   git push origin main
   ```

2. Create a Pull Request:

   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Click "compare across forks"
   - Select your fork as the "head repository"
   - Select the main branch of your fork
   - Click "Create Pull Request"

3. In your Pull Request description, include:
   - A brief explanation of your approach
   - Any challenges you faced and how you overcame them
   - Any additional features or improvements you made

Your solution will be reviewed, and feedback will be provided through the Pull Request comments.

## Need Help? 🤝

If you run into any issues or have questions:

- Check the [GraphQL documentation](https://graphql.org/learn/)
- Review the server's schema in `api/schemas/schema.graphql`
- Open an issue in this repository

Good luck! 🎉
