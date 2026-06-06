# Code Chronicles

A CLI tool that traverses your local directory containing multiple git repositories, extracts the commit history from the past N days, and generates a unified Markdown report. Perfect for developers managing multiple microservices or side projects who want to see a combined view of their recent work.

## Setup

1. \`npm install\`
2. \`npm run build\`
3. \`npm link\` (optional, to use the CLI globally)

## Usage

\`\`\`bash
code-chronicles generate -d D:\Solutions\pessoal -p 7
\`\`\`

## Options
- \`-d, --dir <directory>\`: The root directory containing your git repos. Defaults to the current directory.
- \`-p, --period <days>\`: Number of days to look back. Defaults to 7.
