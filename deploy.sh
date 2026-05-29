#!/bin/bash
set -e
cd /root/.openclaw/workspace/vetclub-next

# Initialize git if needed
if [ ! -d .git ]; then
    git init
fi

# Create clean repo for Next.js version
git checkout -b nextjs 2>/dev/null || git checkout nextjs

# Remove old files and add new ones
git add -A
git commit -m "Next.js migration — 118 articles, static generation, Tailwind"

echo "Ready for Vercel. Push to GitHub and connect:"
echo "  git remote add origin https://github.com/veterinar/vetclub-next.git"
echo "  git push -u origin nextjs"
echo ""
echo "Or install Vercel CLI and run: vercel"
