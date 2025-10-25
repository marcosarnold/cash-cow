@echo off
echo Setting up Harmony extension for GitHub push...

REM Check if git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git not found. Please install Git or use GitHub Desktop.
    echo Opening GitHub Desktop...
    github open .
    pause
    exit /b 1
)

echo Git found! Setting up repository...

REM Initialize git repository
git init

REM Add all files
git add .

REM Commit changes
git commit -m "Initial Harmony Chrome extension implementation

- Chrome MV3 extension for credit card optimization
- React + TypeScript + Vite + Tailwind
- Content script overlay with merchant detection
- Mock reward engine with fictionalized cards
- Popup and options pages
- Minimal permissions (activeTab, scripting, storage)
- Works on Amazon, Uber Eats, and other demo sites"

echo.
echo Repository initialized and committed!
echo.
echo Next steps:
echo 1. Add your GitHub repository as remote:
echo    git remote add origin https://github.com/YOUR_USERNAME/harmony.git
echo.
echo 2. Push to GitHub:
echo    git push -u origin main
echo.
echo Or use GitHub Desktop to push the changes.
echo.
pause
