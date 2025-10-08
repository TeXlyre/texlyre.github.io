---
sidebar_position: 2
---

# Installation & Development

Get started with TeXlyre development in minutes.

## Prerequisites

- **Node.js** 18 or higher
- **Modern browser** with File System Access API support (Chrome, Edge recommended)
- **Git** for cloning the repository

## Installation

Clone the repository and install dependencies:

```bash npm2yarn
git clone https://github.com/TeXlyre/texlyre.git
cd texlyre
npm install
```

## Development Commands

### Quick Start

Run the production build locally with tests:

```bash npm2yarn
npm run start
```

This command:
1. Builds the production version
2. Runs all tests
3. Starts a local preview server (on port `:4173`)

### Development Server

Start the development server with hot reload:

```bash npm2yarn
npm run dev
```

Access the application at `http://localhost:5173`

### HTTPS Development

For testing WebRTC features that require HTTPS:

```bash npm2yarn
npm run dev:https
```

Access the application at `https://localhost:5173`

## Build Commands

### Development Build

Fast build for local testing:

```bash npm2yarn
npm run build
```

### Production Build

Full production build with all optimizations:

```bash npm2yarn
npm run build:prod
```

This includes:
- Config generation
- Service worker versioning
- Plugin index generation
- Font manifest generation
- TypeScript compilation
- Vite production build

### Preview Production Build

Preview the production build locally:

```bash npm2yarn
npm run preview
```

## Testing

### Run All Tests

```bash npm2yarn
npm run test
```

### Watch Mode

Run tests in watch mode during development:

```bash npm2yarn
npm run test:watch
```

### Coverage Report

Generate test coverage report:

```bash npm2yarn
npm run test:coverage
```

### Specific Test Suites

Run specific test categories:

```bash npm2yarn
npm run test:unit
npm run test:integration
npm run test:components
npm run test:services
```

### CI Tests

Run tests in CI mode (used by GitHub Actions):

```bash npm2yarn
npm run test:ci
```

## Code Quality

### Linting

Check code quality with ESLint:

```bash npm2yarn
npm run lint
```

### Auto-fix

Fix linting issues and format code:

```bash npm2yarn
npm run clean
```

This runs ESLint with auto-fix and Biome formatter.

## Utility Commands

### Clear Cache

Clear build and cache directories:

```bash npm2yarn
npm run clean:cache
```

### Generate Configs

Generate configuration files:

```bash npm2yarn
npm run generate-configs
```

### Generate Plugin Index

Regenerate the plugin registry:

```bash npm2yarn
npm run generate-plugins
```

### Generate Font Manifest

Regenerate the font manifest:

```bash npm2yarn
npm run generate-fonts
```

## Common Workflows

### First-Time Setup

```bash npm2yarn
git clone https://github.com/TeXlyre/texlyre.git
cd texlyre
npm install
npm run dev
```

### Before Committing

```bash npm2yarn
npm run clean
npm run test
```

### Local Production Testing

```bash npm2yarn
npm run start
```

### Debugging WebRTC Features

```bash npm2yarn
npm run dev:https
```

Then open `https://localhost:5173` in your browser.

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.).

### HTTPS Certificate Warnings

When using `npm run dev:https`, your browser will show a security warning for the self-signed certificate. This is expected for local development. Click "Advanced" and proceed to the site.

### Build Failures

If you encounter build failures:

1. Clear the cache: `npm run clean:cache`
2. Remove `node_modules`: `rm -rf node_modules`
3. Reinstall dependencies: `npm install`
4. Try building again: `npm run build:prod`

### Test Failures

If tests fail:

1. Ensure all dependencies are installed
2. Clear Jest cache: `npx jest --clearCache`
3. Run tests again: `npm run test`
