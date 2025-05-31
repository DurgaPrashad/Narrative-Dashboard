# Contributing to Narrative Dashboard

Thank you for your interest in contributing to Narrative Dashboard! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the [Issues](https://github.com/your-username/narrative-dashboard/issues)
- If not, create a new issue with a descriptive title and clear description
- Include steps to reproduce, expected behavior, and actual behavior
- Add screenshots if applicable
- Specify your environment (browser, OS, etc.)

### Suggesting Enhancements

- Check if the enhancement has already been suggested in the [Issues](https://github.com/your-username/narrative-dashboard/issues)
- If not, create a new issue with a descriptive title and clear description
- Explain why this enhancement would be useful
- Provide examples of how it would work

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`
3. Make your changes
4. Run tests and ensure they pass
   \`\`\`bash
   npm run test
   \`\`\`
5. Commit your changes with a descriptive message
   \`\`\`bash
   git commit -m "Add feature: your feature description"
   \`\`\`
6. Push to your branch
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`
7. Create a Pull Request against the `main` branch

## Development Setup

1. Clone your forked repository
   \`\`\`bash
   git clone https://github.com/your-username/narrative-dashboard.git
   cd narrative-dashboard
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Edit `.env.local` with your API keys

4. Start the development server
   \`\`\`bash
   npm run dev
   \`\`\`

## Coding Guidelines

### JavaScript/TypeScript

- Follow the ESLint configuration
- Use TypeScript for type safety
- Write meaningful variable and function names
- Add comments for complex logic

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow the component structure in the project

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design works on all screen sizes

## Testing

- Write tests for new features
- Ensure all tests pass before submitting a PR
- Test on different browsers and devices if possible

## Documentation

- Update README.md if necessary
- Document new features or changes
- Add JSDoc comments to functions and components

## Commit Messages

- Use clear and descriptive commit messages
- Start with a verb in the present tense (e.g., "Add", "Fix", "Update")
- Reference issue numbers when applicable

## Review Process

- All PRs require at least one review before merging
- Address review comments promptly
- Be open to feedback and suggestions

Thank you for contributing to Narrative Dashboard!
