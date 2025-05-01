#!/bin/bash

# Script to help set up the GitHub repository

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print section headers
print_section() {
  echo -e "\n${YELLOW}=== $1 ===${NC}\n"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
  echo -e "${RED}Error: git is not installed. Please install git first.${NC}"
  exit 1
fi

# Initialize git repository if not already initialized
print_section "Initializing Git Repository"
if [ -d .git ]; then
  echo -e "${GREEN}Git repository already initialized.${NC}"
else
  git init
  echo -e "${GREEN}Git repository initialized.${NC}"
fi

# Add all files
print_section "Adding Files to Git"
git add .
echo -e "${GREEN}Files added to staging area.${NC}"

# Create initial commit
print_section "Creating Initial Commit"
git commit -m "Initial commit: Subtraction Practice app"
echo -e "${GREEN}Initial commit created.${NC}"

# Instructions for GitHub
print_section "Next Steps for GitHub"
echo -e "Now you can create a repository on GitHub and push your code:"
echo -e "\n1. Create a new repository on GitHub (https://github.com/new)"
echo -e "2. Link your local repository to GitHub:"
echo -e "   ${GREEN}git remote add origin https://github.com/yourusername/your-repo-name.git${NC}"
echo -e "3. Push your code to GitHub:"
echo -e "   ${GREEN}git push -u origin main${NC} (or ${GREEN}git push -u origin master${NC} for older repositories)"

print_section "GitHub Repository Setup"
read -p "Would you like to add a GitHub remote now? (y/n): " add_remote
if [[ $add_remote == "y" || $add_remote == "Y" ]]; then
  read -p "Enter your GitHub username: " github_username
  read -p "Enter the repository name: " repo_name
  
  git remote add origin "https://github.com/${github_username}/${repo_name}.git"
  echo -e "${GREEN}Remote 'origin' added.${NC}"
  
  read -p "Would you like to push to GitHub now? (y/n): " push_now
  if [[ $push_now == "y" || $push_now == "Y" ]]; then
    # Determine the branch name
    branch_name=$(git symbolic-ref --short HEAD)
    git push -u origin "$branch_name"
    echo -e "${GREEN}Code pushed to GitHub successfully!${NC}"
  else
    echo -e "You can push your code later with: ${GREEN}git push -u origin $(git symbolic-ref --short HEAD)${NC}"
  fi
else
  echo -e "You can add a remote later with: ${GREEN}git remote add origin https://github.com/yourusername/your-repo-name.git${NC}"
fi

print_section "Completed"
echo -e "${GREEN}GitHub setup script completed successfully.${NC}"