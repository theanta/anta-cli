# create-anta-app

A CLI tool to quickly create Anta apps from your Next.js starter repository with customizable branding and configuration.

## Features

- 🚀 **Quick Setup**: Clone your Next.js starter repository in seconds
- 🎨 **Custom Branding**: Interactive prompts for project name, tagline, and brand colors
- ⚙️ **Auto Configuration**: Automatically updates `config.js` with your project details
- 📦 **Dependency Management**: Installs dependencies automatically
- 🌐 **Dev Server**: Starts development server immediately after setup

## Installation

### Global Installation
```bash
npm install -g create-anta-app
```

### Local Development
```bash
# Clone this repository
git clone <your-repo-url>
cd anta-cli

# Install dependencies
npm install

# Link globally for testing
npm link
```

## Usage

### Basic Usage
```bash
create-anta-app
```

### With Project Name
```bash
create-anta-app my-awesome-app
```

### With Custom Repository
```bash
create-anta-app my-app --repo https://github.com/yourusername/your-nextjs-starter.git
```

### Skip Installation
```bash
create-anta-app my-app --skip-install
```

### Skip Development Server
```bash
create-anta-app my-app --skip-dev
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `-r, --repo <url>` | GitHub repository URL | `https://github.com/yourusername/your-nextjs-starter.git` |
| `--skip-install` | Skip dependency installation | `false` |
| `--skip-dev` | Skip starting development server | `false` |
| `-h, --help` | Display help information | |
| `-V, --version` | Display version number | |

## Interactive Prompts

The CLI will ask you for the following information:

1. **Project Name** - Name of your project directory
2. **Project Title** - Display name for your application
3. **Tagline** - Short description of your project
4. **Primary Color** - Main brand color (hex code)
5. **Secondary Color** - Secondary brand color (hex code)

## Configuration

The tool automatically updates the `config.js` file in your cloned repository with the provided information. If the file doesn't exist, it creates one with the following structure:

```javascript
module.exports = {
  // Site Information
  siteName: 'Your Project Title',
  siteDescription: 'Your Project Tagline',
  siteUrl: 'https://example.com',
  
  // Brand Colors
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  
  // Social Media
  social: {
    twitter: '@example',
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/in/example'
  },
  
  // SEO
  seo: {
    title: 'Your Project Title',
    description: 'Your Project Tagline',
    keywords: ['nextjs', 'react', 'tailwindcss']
  }
};
```

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Git

## Development

### Project Structure
```
create-anta-app/
├── bin/
│   └── create-anta-app.js    # CLI entry point
├── src/
│   └── index.js              # Main application logic
├── package.json              # Package configuration
└── README.md                 # This file
```

### Dependencies

- `commander` - CLI framework
- `inquirer` - Interactive command line prompts
- `simple-git` - Git operations
- `chalk` - Terminal styling
- `ora` - Elegant terminal spinners

### Building and Testing

```bash
# Install dependencies
npm install

# Test the CLI locally
npm link
create-anta-app test-app

# Unlink when done testing
npm unlink -g create-anta-app
```

## Troubleshooting

### Common Issues

1. **Repository not found**: Make sure the repository URL is correct and accessible
2. **Permission denied**: Ensure you have write permissions in the target directory
3. **Dependencies installation failed**: Check your internet connection and npm configuration
4. **Dev server won't start**: Verify that the cloned repository has a valid `package.json` with a `dev` script

### Getting Help

If you encounter any issues:

1. Check that all prerequisites are installed
2. Verify your repository URL is correct
3. Ensure you have proper permissions in the target directory
4. Check the console output for specific error messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### Version 1.0.0
- Initial release
- Basic repository cloning functionality
- Interactive project configuration
- Automatic dependency installation
- Development server startup
