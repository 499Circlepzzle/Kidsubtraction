# Transferring to GitHub

This guide provides step-by-step instructions to transfer your Subtraction Practice app to GitHub.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Basic familiarity with Git commands
4. Your project files (already prepared)

## Option 1: Using the Setup Script (Recommended)

We've created a setup script to automate the GitHub setup process.

1. Make the script executable (if not already):
   ```bash
   chmod +x setup-github.sh
   ```

2. Run the script:
   ```bash
   ./setup-github.sh
   ```

3. Follow the interactive prompts to:
   - Initialize the Git repository
   - Create the initial commit
   - Add a GitHub remote
   - Push your code to GitHub

## Option 2: Manual Setup

If you prefer to set up GitHub manually, follow these steps:

### Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com/) and sign in
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "subtraction-practice")
4. Add a description (optional)
5. Choose public or private visibility
6. Do NOT initialize with a README, .gitignore, or license (we already have these)
7. Click "Create repository"

### Step 2: Initialize Local Git Repository

1. Open a terminal and navigate to your project directory
2. Initialize a Git repository:
   ```bash
   git init
   ```

3. Add all your files to Git:
   ```bash
   git add .
   ```

4. Create the initial commit:
   ```bash
   git commit -m "Initial commit: Subtraction Practice app"
   ```

### Step 3: Link to GitHub and Push

1. Add the GitHub repository as a remote:
   ```bash
   git remote add origin https://github.com/yourusername/subtraction-practice.git
   ```
   (Replace "yourusername" and "subtraction-practice" with your GitHub username and repository name)

2. Push your code to GitHub:
   ```bash
   git push -u origin main
   ```
   (Use `git push -u origin master` if your default branch is named "master")

## What's Included in the GitHub Setup

The following files have been prepared for GitHub:

- ✅ **README.md**: Project description, features, and setup instructions
- ✅ **LICENSE**: MIT License file
- ✅ **CONTRIBUTING.md**: Guidelines for contributors
- ✅ **.gitignore**: Properly configured to exclude build files, dependencies, etc.
- ✅ **BUILD.md**: Instructions for building the Android app

## Next Steps After GitHub Setup

1. Set up GitHub Pages (optional):
   - Go to your repository settings
   - Scroll to the "GitHub Pages" section
   - Select the branch to deploy (usually "main")
   - Choose the "/docs" folder or "root" for deployment

2. Add collaborators (optional):
   - Go to repository settings
   - Select "Manage access"
   - Click "Invite a collaborator"
   - Enter GitHub usernames or email addresses

3. Set up GitHub Actions (optional):
   - Create a `.github/workflows` directory
   - Add workflow YAML files for CI/CD

## GitHub Best Practices

- Use descriptive commit messages
- Create branches for new features or bug fixes
- Use pull requests for code reviews
- Add tags for releases
- Keep the README updated
- Include screenshots in the README

Remember to replace placeholder information with your actual GitHub username and repository name.