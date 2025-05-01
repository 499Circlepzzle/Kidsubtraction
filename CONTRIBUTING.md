# Contributing to Subtraction Practice

Thank you for considering contributing to the Subtraction Practice app! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We strive to maintain a welcoming and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

Before submitting a bug report, please check existing issues to avoid duplicates. When reporting a bug, include:

- A clear, descriptive title
- Detailed steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Device/browser information

### Suggesting Enhancements

For feature requests or enhancements:

- Use a clear, descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why it would be useful
- Include examples of how it would work if possible

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes with clear, descriptive commit messages
4. Add or update tests as needed
5. Update documentation to reflect any changes
6. Submit a pull request referencing the issue it addresses

## Development Process

### Setting Up the Development Environment

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/subtraction-practice.git
   cd subtraction-practice
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

### Code Style

- Follow existing code style patterns
- Use TypeScript for type safety
- Format your code using the provided Prettier configuration
- Ensure ESLint passes without warnings

### Testing

- Write tests for new features or bug fixes
- Ensure all existing tests pass before submitting a pull request
- Test on multiple browsers/devices when possible

## Project Structure

```
├── android/              # Android app files (Capacitor)
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── main.tsx      # Application entry point
├── server/               # Express server
├── shared/               # Shared types and schemas
└── public/               # Static assets
```

## Getting Help

If you need help or have questions:

- Open an issue with a "question" label
- Be specific and provide context
- Include code examples if relevant

Thank you for contributing to make learning subtraction more engaging for children!