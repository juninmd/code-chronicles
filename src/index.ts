#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const program = new Command();

program
  .name('code-chronicles')
  .description('A CLI to generate a unified summary of your git commits across multiple local repositories.')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate a report of your recent commits')
  .option('-d, --dir <directory>', 'Root directory containing your git repositories', process.cwd())
  .option('-p, --period <days>', 'Number of days to look back', '7')
  .action((options) => {
    const rootDir = path.resolve(options.dir);
    const days = parseInt(options.period, 10);
    
    if (!fs.existsSync(rootDir)) {
      console.error(`Directory not found: ${rootDir}`);
      process.exit(1);
    }

    console.log(`Scanning ${rootDir} for git repositories...`);
    
    const items = fs.readdirSync(rootDir, { withFileTypes: true });
    const repos: string[] = [];

    for (const item of items) {
      if (item.isDirectory()) {
        const repoPath = path.join(rootDir, item.name);
        const gitDir = path.join(repoPath, '.git');
        if (fs.existsSync(gitDir)) {
          repos.push(repoPath);
        }
      }
    }

    console.log(`Found ${repos.length} repositories. Extracting commits from the last ${days} days...`);

    const dateSince = new Date();
    dateSince.setDate(dateSince.getDate() - days);
    const dateStr = dateSince.toISOString().split('T')[0];

    let report = `# Code Chronicles\n\n**Generated on:** ${new Date().toLocaleDateString()}\n**Period:** Last ${days} days\n\n`;

    for (const repo of repos) {
      const repoName = path.basename(repo);
      try {
        const logCommand = `git log --since="${dateStr}" --pretty=format:"- %s (%h) - %ad" --date=short`;
        const output = execSync(logCommand, { cwd: repo, encoding: 'utf-8', stdio: 'pipe' });
        
        if (output.trim()) {
          report += `## 📁 ${repoName}\n\n${output}\n\n`;
        }
      } catch (err) {
        // Ignored errors (e.g., no commits yet)
      }
    }

    const reportPath = path.join(process.cwd(), 'CODE_CHRONICLES_REPORT.md');
    fs.writeFileSync(reportPath, report);
    console.log(`\n✅ Report generated successfully at: ${reportPath}`);
  });

program.parse();
