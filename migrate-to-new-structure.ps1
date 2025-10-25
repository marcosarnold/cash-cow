# Harmony Extension Migration Script
# This script helps migrate from the old structure to the new structure

Write-Host "🔄 Migrating Harmony Extension to New Structure..." -ForegroundColor Green

# Create backup of old files
Write-Host "📦 Creating backup of old structure..." -ForegroundColor Yellow
if (Test-Path "harmony-old") {
    Remove-Item "harmony-old" -Recurse -Force
}
New-Item -ItemType Directory -Name "harmony-old"
Copy-Item "src" "harmony-old/src" -Recurse
Copy-Item "manifest.json" "harmony-old/manifest.json"
Copy-Item "package.json" "harmony-old/package.json"
Copy-Item "tsconfig.json" "harmony-old/tsconfig.json"

Write-Host "✅ Backup created in harmony-old/" -ForegroundColor Green

# Replace old files with new ones
Write-Host "🔄 Replacing files with new structure..." -ForegroundColor Yellow

# Replace manifest.json
if (Test-Path "manifest-new.json") {
    Copy-Item "manifest-new.json" "manifest.json" -Force
    Remove-Item "manifest-new.json"
    Write-Host "✅ Updated manifest.json" -ForegroundColor Green
}

# Replace package.json
if (Test-Path "package-new.json") {
    Copy-Item "package-new.json" "package.json" -Force
    Remove-Item "package-new.json"
    Write-Host "✅ Updated package.json" -ForegroundColor Green
}

# Replace tsconfig.json
if (Test-Path "tsconfig-new.json") {
    Copy-Item "tsconfig-new.json" "tsconfig.json" -Force
    Remove-Item "tsconfig-new.json"
    Write-Host "✅ Updated tsconfig.json" -ForegroundColor Green
}

Write-Host "`n📁 New Structure Created:" -ForegroundColor Cyan
Write-Host "├── popup.html (400x600 popup)" -ForegroundColor White
Write-Host "├── src/" -ForegroundColor White
Write-Host "│   ├── popup.tsx (new popup entry point)" -ForegroundColor White
Write-Host "│   ├── App.tsx (main popup component)" -ForegroundColor White
Write-Host "│   ├── components/ (component directory)" -ForegroundColor White
Write-Host "│   ├── styles/globals.css (global styles)" -ForegroundColor White
Write-Host "│   ├── content/ (content script)" -ForegroundColor White
Write-Host "│   ├── background/ (service worker)" -ForegroundColor White
Write-Host "│   ├── options/ (options page)" -ForegroundColor White
Write-Host "│   └── lib/ (existing lib files)" -ForegroundColor White
Write-Host "├── public/ (icons)" -ForegroundColor White
Write-Host "├── vite.config.ts (new Vite config)" -ForegroundColor White
Write-Host "└── tsconfig.node.json (Node config)" -ForegroundColor White

Write-Host "`n🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Install new dependencies:" -ForegroundColor White
Write-Host "   npm install" -ForegroundColor Cyan
Write-Host "`n2. Build the extension:" -ForegroundColor White
Write-Host "   npm run build" -ForegroundColor Cyan
Write-Host "`n3. Load in Chrome:" -ForegroundColor White
Write-Host "   - Go to chrome://extensions/" -ForegroundColor White
Write-Host "   - Enable Developer mode" -ForegroundColor White
Write-Host "   - Click 'Load unpacked'" -ForegroundColor White
Write-Host "   - Select the 'dist' folder" -ForegroundColor White

Write-Host "`n✨ Migration Complete!" -ForegroundColor Green
Write-Host "The extension now has a modern structure with:" -ForegroundColor White
Write-Host "• 400x600 popup with gradient design" -ForegroundColor White
Write-Host "• Modern React components" -ForegroundColor White
Write-Host "• Improved styling with Tailwind CSS" -ForegroundColor White
Write-Host "• Better organization" -ForegroundColor White
Write-Host "• All existing functionality preserved" -ForegroundColor White

Read-Host "Press Enter to continue"
