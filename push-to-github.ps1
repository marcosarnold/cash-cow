# PowerShell script to push Harmony extension to GitHub

Write-Host "Setting up Harmony extension for GitHub push..." -ForegroundColor Green

# Check if git is available
try {
    $gitVersion = git --version 2>$null
    if ($gitVersion) {
        Write-Host "Git found: $gitVersion" -ForegroundColor Green
    } else {
        throw "Git not found"
    }
} catch {
    Write-Host "Git not found. Opening GitHub Desktop..." -ForegroundColor Yellow
    github open .
    Write-Host "Please use GitHub Desktop to push your changes." -ForegroundColor Yellow
    Read-Host "Press Enter to continue"
    exit
}

Write-Host "Setting up repository..." -ForegroundColor Blue

# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial Harmony Chrome extension implementation

- Chrome MV3 extension for credit card optimization
- React + TypeScript + Vite + Tailwind
- Content script overlay with merchant detection
- Mock reward engine with fictionalized cards
- Popup and options pages
- Minimal permissions (activeTab, scripting, storage)
- Works on Amazon, Uber Eats, and other demo sites"

Write-Host "`nRepository initialized and committed!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Add your GitHub repository as remote:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/harmony.git" -ForegroundColor Cyan
Write-Host "`n2. Push to GitHub:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host "`nOr use GitHub Desktop to push the changes." -ForegroundColor Yellow

Read-Host "`nPress Enter to continue"

