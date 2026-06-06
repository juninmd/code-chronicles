#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const program = new commander_1.Command();
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
    const repos = [];
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
            const output = (0, child_process_1.execSync)(logCommand, { cwd: repo, encoding: 'utf-8', stdio: 'pipe' });
            if (output.trim()) {
                report += `## 📁 ${repoName}\n\n${output}\n\n`;
            }
        }
        catch (err) {
            // Ignored errors (e.g., no commits yet)
        }
    }
    const reportPath = path.join(process.cwd(), 'CODE_CHRONICLES_REPORT.md');
    fs.writeFileSync(reportPath, report);
    console.log(`\n✅ Report generated successfully at: ${reportPath}`);
});
program.parse();
//# sourceMappingURL=index.js.map