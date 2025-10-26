# Start Fetch.AI Agent Server
Write-Host "🤖 Starting Fetch.AI Agent..." -ForegroundColor Green
Write-Host ""
Write-Host "🧠 Powered by Fetch.AI + Anthropic Claude" -ForegroundColor Cyan
Write-Host "📡 Server: http://localhost:8080" -ForegroundColor Cyan
Write-Host "🔗 Chrome extension will auto-connect" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

python fetchai_agent.py

