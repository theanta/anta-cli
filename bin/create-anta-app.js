#!/usr/bin/env node

const { Command } = require('commander');
const createAntaApp = require('../src/index.js');

const program = new Command();

program
  .name('create-anta-app')
  .description('Create a new Anta app from the Next.js starter repository')
  .version('1.0.0')
  .argument('[project-name]', 'Name of the project directory')
  .option('-r, --repo <url>', 'GitHub repository URL', 'https://github.com/yourusername/your-nextjs-starter.git')
  .option('--skip-install', 'Skip dependency installation')
  .option('--skip-dev', 'Skip starting development server')
  .action(async (projectName, options) => {
    try {
      await createAntaApp({
        projectName,
        repoUrl: options.repo,
        skipInstall: options.skipInstall,
        skipDev: options.skipDev
      });
    } catch (error) {
      console.error('Error creating Anta app:', error.message);
      process.exit(1);
    }
  });

program.parse();
