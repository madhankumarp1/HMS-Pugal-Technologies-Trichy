@echo off
echo HMS Pugal Technologies - GitHub Deployment
echo ===========================================
echo.
echo Make sure you have installed Git (https://git-scm.com/)
echo.

echo Initializing Git repository...
git init

echo Adding files...
git add .

echo Committing files...
git commit -m "Initial website"

echo Renaming branch to main...
git branch -M main

echo Adding remote repository...
git remote add origin https://github.com/madhankumarp1/HMS-Pugal-Technologies-Trichy.git

echo Pushing to GitHub...
git push -u origin main

echo.
echo ===========================================
echo Deployment commands finished.
echo If you saw errors above, make sure:
echo 1. Git is installed.
echo 2. The repository URL is correct.
echo 3. You have permission (GitHub login might popup).
echo ===========================================
pause
