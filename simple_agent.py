"""
Simple AI Agent Server for Harmony Extension
Uses Anthropic Claude for merchant classification
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urlparse
import uvicorn
from anthropic import Anthropic
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Allow CORS for Chrome extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DomainRequest(BaseModel):
    url: str

def extract_domain(url: str) -> str:
    """Extract domain from URL"""
    try:
        domain = urlparse(url).netloc
        if domain.startswith('www.'):
            domain = domain[4:]
        return domain
    except Exception:
        return "unknown"

@app.post("/classify")
async def classify_domain(request: DomainRequest):
    """Classify a merchant domain using Claude AI"""
    try:
        # Extract domain
        domain = extract_domain(request.url)
        
        # Get API key
        api_key = os.getenv('ANTHROPIC_API_KEY')
        if not api_key:
            return {
                "domain": domain,
                "category": "OTHER",
                "error": "ANTHROPIC_API_KEY not set"
            }
        
        # Call Claude
        client = Anthropic(api_key=api_key)
        
        prompt = f"""Classify the domain '{domain}' into ONE of these categories:
- TRAVEL (airlines, hotels, booking sites)
- ENTERTAINMENT (streaming, music, events, dining/food delivery)
- E-COMMERCE (online shopping, retail)
- FINANCE (banks, payment processors)
- UTILITIES (groceries, gas stations)
- OTHER (everything else)

Respond with ONLY the category name, nothing else."""

        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=50,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        category = response.content[0].text.strip()
        
        print(f"✓ Classified {domain} as {category}")
        
        return {
            "domain": domain,
            "category": category
        }
        
    except Exception as e:
        print(f"Error in classification: {e}")
        return {
            "domain": "unknown",
            "category": "OTHER",
            "error": str(e)
        }

@app.get("/")
def root():
    return {"status": "Harmony AI Agent running", "version": "1.0"}

if __name__ == "__main__":
    print("\n🚀 Starting Harmony AI Agent Server...")
    print("📡 Listening on http://localhost:8080")
    print("🔗 Extension can now connect to this agent!\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8080)




