# Fetch.AI Agent Setup Guide

## Overview
This guide shows you how to integrate the Fetch.AI agent for smart merchant classification into your Harmony extension.

## Step 1: Install Dependencies

```bash
pip install -r requirements-agent.txt
```

**Required packages:**
- `fastapi` - HTTP server
- `uvicorn` - ASGI server
- `openai` - LLM API (you'll need an API key)
- `pydantic` - Data validation

## Step 2: Set Up OpenAI API Key

Create a `.env` file or set the environment variable:

```bash
export OPENAI_API_KEY="your-api-key-here"
```

Or Windows:
```powershell
$env:OPENAI_API_KEY = "your-api-key-here"
```

## Step 3: Run the Agent (Local)

Start the Fetch.AI agent server:

```bash
python agent_smart.py
```

The agent will:
- Listen on `http://localhost:8080`
- Classify domains using OpenAI GPT-4o-mini
- Return categories: TRAVEL, ENTERTAINMENT, E-COMMERCE, FINANCE, UTILITIES, OTHER
- CORS enabled for Chrome extension access

Now build the extension with the new code:

```bash
npm run build:all
```

Then load it in Chrome (`chrome://extensions/`)

## Step 5: Enable in Extension

The agent is already integrated! Just enable the feature flag:

1. Load your extension in Chrome (`chrome://extensions/`)
2. Go to the **Options** page
3. Toggle **ENABLE_FETCH_AGENT** to **ON**
4. Save settings

The extension will now use the Fetch.AI agent for smarter merchant classification.

## Step 6: Test It

1. Visit a merchant website (Amazon, Uber Eats, etc.)
2. The agent will classify the domain automatically
3. Check the console for agent classification logs

## How It Works

### Current Flow (Mock):
```
Extension → Static mapping → Category
```

### With Fetch.AI (Real):
```
Extension → Fetch.AI Agent → LLM Classification → Category
```

The agent uses LLM to intelligently classify domains instead of relying on static mappings.

## Troubleshooting

### Agent not connecting?
- Make sure the agent is running: `python agent_smart.py`
- Check that port 8080 is available

### Want to disable?
Just toggle the feature flag back to OFF in the Options page.

## Next Steps

For production, you can:
1. Deploy the agent to a server
2. Update the agent URL in the code
3. Add authentication/API keys

