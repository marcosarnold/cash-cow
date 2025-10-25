# PowerShell script to push Harmony extension to GitHub
# Repository: https://github.com/abdirahmanbm01/harmony

Write-Host "🚀 Pushing Harmony Extension to GitHub..." -ForegroundColor Green
Write-Host "Repository: https://github.com/abdirahmanbm01/harmony" -ForegroundColor Cyan

# Check if git is available
try {
    $gitVersion = git --version 2>$null
    if ($gitVersion) {
        Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
    } else {
        throw "Git not found"
    }
} catch {
    Write-Host "❌ Git not found in PATH" -ForegroundColor Red
    Write-Host "🔧 Trying alternative methods..." -ForegroundColor Yellow
    
    # Try to find git in common locations
    $gitPaths = @(
        "C:\Program Files\Git\bin\git.exe",
        "C:\Program Files (x86)\Git\bin\git.exe",
        "C:\Users\$env:USERNAME\AppData\Local\Programs\Git\bin\git.exe"
    )
    
    $gitFound = $false
    foreach ($path in $gitPaths) {
        if (Test-Path $path) {
            Write-Host "✅ Found Git at: $path" -ForegroundColor Green
            $env:PATH += ";$(Split-Path $path)"
            $gitFound = $true
            break
        }
    }
    
    if (-not $gitFound) {
        Write-Host "❌ Git not found. Please install Git or use GitHub Desktop." -ForegroundColor Red
        Write-Host "📱 Opening GitHub Desktop..." -ForegroundColor Yellow
        github open .
        Write-Host "Please use GitHub Desktop to push your changes." -ForegroundColor Yellow
        Read-Host "Press Enter to continue"
        exit
    }
}

Write-Host "🔧 Setting up repository..." -ForegroundColor Blue

# Initialize git repository
git init

# Add remote origin
git remote add origin https://github.com/abdirahmanbm01/harmony.git

# Add all files
git add .

# Commit changes
git commit -m "Initial Harmony Chrome extension implementation

✨ Features:
- Chrome MV3 extension for credit card optimization
- React + TypeScript + Vite + Tailwind CSS
- Content script overlay with merchant detection
- Mock reward engine with fictionalized cards
- Popup and options pages
- Minimal permissions (activeTab, scripting, storage)
- Works on Amazon, Uber Eats, and other demo sites

🔧 Technical Details:
- Pure reward calculation engine
- Scoped CSS with harmony- prefix
- Error handling for extension context invalidation
- Smooth fade-in animations
- User dismissal tracking
- Comprehensive README and documentation"

Write-Host "✅ Repository initialized and committed!" -ForegroundColor Green

# Try to push
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Blue
try {
    git push -u origin main
    Write-Host "🎉 Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🔗 Repository: https://github.com/abdirahmanbm01/harmony" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️  Push failed. This might be because:" -ForegroundColor Yellow
    Write-Host "   1. The repository already has content" -ForegroundColor White
    Write-Host "   2. Authentication is required" -ForegroundColor White
    Write-Host "   3. Network issues" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Alternative solutions:" -ForegroundColor Cyan
    Write-Host "   1. Use GitHub Desktop (github open .)" -ForegroundColor White
    Write-Host "   2. Use GitHub web interface to upload files" -ForegroundColor White
    Write-Host "   3. Set up Git authentication" -ForegroundColor White
}

Write-Host "`n📋 Files included in this push:" -ForegroundColor Yellow
Write-Host "   ✅ Complete src/ directory with React components" -ForegroundColor Green
Write-Host "   ✅ manifest.json (Chrome MV3)" -ForegroundColor Green
Write-Host "   ✅ package.json with all dependencies" -ForegroundColor Green
Write-Host "   ✅ README.md with comprehensive documentation" -ForegroundColor Green
Write-Host "   ✅ All configuration files" -ForegroundColor Green
Write-Host "   ✅ .gitignore (excludes node_modules/ and dist/)" -ForegroundColor Green

Read-Host "`nPress Enter to continue"

