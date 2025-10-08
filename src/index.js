const inquirer = require('inquirer');
const simpleGit = require('simple-git');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

async function createAntaApp(options = {}) {
  console.log(chalk.blue.bold('\n🚀 Welcome to create-anta-app!\n'));
  
  try {
    // Get project name
    const projectName = await getProjectName(options.projectName);
    
    // Clone repository
    await cloneRepository(projectName, options.repoUrl);
    
    // Get project details
    const projectDetails = await getProjectDetails();
    
    // Update config.js
    await updateConfigFile(projectName, projectDetails);
    
    // Install dependencies
    if (!options.skipInstall) {
      await installDependencies(projectName);
    }
    
    // Start development server
    if (!options.skipDev) {
      await startDevServer(projectName);
    }
    
    console.log(chalk.green.bold('\n✅ Anta app created successfully!\n'));
    console.log(chalk.yellow(`📁 Project directory: ${path.resolve(projectName)}`));
    console.log(chalk.yellow(`🌐 Development server: http://localhost:3000`));
    console.log(chalk.gray('\nHappy coding! 🎉\n'));
    
  } catch (error) {
    console.error(chalk.red.bold('\n❌ Error creating Anta app:'), error.message);
    throw error;
  }
}

async function getProjectName(providedName) {
  if (providedName) {
    return providedName;
  }
  
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: 'my-anta-app',
      validate: (input) => {
        if (!input.trim()) {
          return 'Project name cannot be empty';
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(input.trim())) {
          return 'Project name can only contain letters, numbers, hyphens, and underscores';
        }
        return true;
      }
    }
  ]);
  
  return projectName.trim();
}

async function cloneRepository(projectName, repoUrl) {
  const spinner = ora('Cloning repository...').start();
  
  try {
    const git = simpleGit();
    await git.clone(repoUrl, projectName);
    spinner.succeed('Repository cloned successfully');
  } catch (error) {
    spinner.fail('Failed to clone repository');
    throw new Error(`Failed to clone repository: ${error.message}`);
  }
}

async function getProjectDetails() {
  console.log(chalk.blue('\n📝 Let\'s customize your project:\n'));
  
  const questions = [
    {
      type: 'input',
      name: 'projectTitle',
      message: 'What is your project title?',
      default: 'My Anta App',
      validate: (input) => input.trim().length > 0 || 'Project title cannot be empty'
    },
    {
      type: 'input',
      name: 'tagline',
      message: 'What is your project tagline?',
      default: 'Built with Anta',
      validate: (input) => input.trim().length > 0 || 'Tagline cannot be empty'
    },
    {
      type: 'input',
      name: 'primaryColor',
      message: 'What is your primary brand color? (hex code)',
      default: '#3B82F6',
      validate: (input) => {
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexPattern.test(input.trim()) || 'Please enter a valid hex color code (e.g., #3B82F6)';
      }
    },
    {
      type: 'input',
      name: 'secondaryColor',
      message: 'What is your secondary brand color? (hex code)',
      default: '#1E40AF',
      validate: (input) => {
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexPattern.test(input.trim()) || 'Please enter a valid hex color code (e.g., #1E40AF)';
      }
    }
  ];
  
  return await inquirer.prompt(questions);
}

async function updateConfigFile(projectName, projectDetails) {
  const spinner = ora('Updating configuration...').start();
  
  try {
    const configPath = path.join(projectName, 'config.js');
    
    // Check if config.js exists
    try {
      await fs.access(configPath);
    } catch (error) {
      // If config.js doesn't exist, create it
      const defaultConfig = `module.exports = {
  // Site Information
  siteName: '${projectDetails.projectTitle}',
  siteDescription: '${projectDetails.tagline}',
  siteUrl: 'https://example.com',
  
  // Brand Colors
  primaryColor: '${projectDetails.primaryColor}',
  secondaryColor: '${projectDetails.secondaryColor}',
  
  // Social Media
  social: {
    twitter: '@example',
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/in/example'
  },
  
  // SEO
  seo: {
    title: '${projectDetails.projectTitle}',
    description: '${projectDetails.tagline}',
    keywords: ['nextjs', 'react', 'tailwindcss']
  }
};`;
      
      await fs.writeFile(configPath, defaultConfig);
      spinner.succeed('Configuration file created');
      return;
    }
    
    // Read existing config file
    let configContent = await fs.readFile(configPath, 'utf8');
    
    // Replace placeholders in config.js
    configContent = configContent
      .replace(/siteName:\s*['"][^'"]*['"]/, `siteName: '${projectDetails.projectTitle}'`)
      .replace(/siteDescription:\s*['"][^'"]*['"]/, `siteDescription: '${projectDetails.tagline}'`)
      .replace(/primaryColor:\s*['"][^'"]*['"]/, `primaryColor: '${projectDetails.primaryColor}'`)
      .replace(/secondaryColor:\s*['"][^'"]*['"]/, `secondaryColor: '${projectDetails.secondaryColor}'`);
    
    await fs.writeFile(configPath, configContent);
    spinner.succeed('Configuration updated successfully');
    
  } catch (error) {
    spinner.fail('Failed to update configuration');
    throw new Error(`Failed to update config file: ${error.message}`);
  }
}

async function installDependencies(projectName) {
  const spinner = ora('Installing dependencies...').start();
  
  try {
    process.chdir(projectName);
    execSync('npm install', { stdio: 'pipe' });
    process.chdir('..');
    spinner.succeed('Dependencies installed successfully');
  } catch (error) {
    process.chdir('..');
    spinner.fail('Failed to install dependencies');
    console.log(chalk.yellow('You can install dependencies manually by running: npm install'));
  }
}

async function startDevServer(projectName) {
  const spinner = ora('Starting development server...').start();
  
  try {
    process.chdir(projectName);
    spinner.succeed('Development server starting...');
    console.log(chalk.blue('\n🌐 Starting development server...'));
    console.log(chalk.gray('Press Ctrl+C to stop the server\n'));
    
    // Start the dev server in the background
    execSync('npm run dev', { stdio: 'inherit' });
  } catch (error) {
    process.chdir('..');
    if (error.message.includes('npm run dev')) {
      console.log(chalk.yellow('\n⚠️  Could not start development server automatically.'));
      console.log(chalk.gray('You can start it manually by running: npm run dev'));
    } else {
      console.log(chalk.yellow('\n⚠️  Could not start development server.'));
      console.log(chalk.gray('You can start it manually by running: npm run dev'));
    }
  }
}

module.exports = createAntaApp;
