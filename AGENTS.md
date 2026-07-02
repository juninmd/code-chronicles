# AGENTS.md

## Tech Stack
- **Language:** TypeScript 6.0
- **Runtime:** Node.js
- **CLI Framework:** Commander 15
- **Build:** tsc (TypeScript compiler)
- **Module:** CommonJS

## Project Structure
```
code-chronicles/
  src/
    index.ts       # CLI entry point & logic
  dist/            # Compiled JS output
  package.json
  tsconfig.json
```

## Commands
- `npm run build` - Compile TypeScript
- `npm start` - Run CLI (generate)
- `npm link` - Link globally for CLI access

## Conventions
- TypeScript with strict mode
- CommonJS module output
- Commander for CLI argument parsing
- Single source file pattern
