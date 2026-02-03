"""
Cash Cow Agent - Merchant Classification Service
Uses Claude AI for intelligent merchant classification
"""
import os
from dotenv import load_dotenv
from urllib.parse import urlparse
from anthropic import Anthropic
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

load_dotenv()

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ClassifyRequest(BaseModel):
    url: str

class ClassifyResponse(BaseModel):
    domain: str
    category: str
    merchant_name: str

def extract_domain(url: str) -> str:
    """Extract domain from URL"""
    try:
        domain = urlparse(url).netloc
        if domain.startswith('www.'):
            domain = domain[4:]
        return domain.lower()
    except:
        return "unknown"

def get_merchant_name(domain: str) -> str:
    """Get canonical merchant name"""
    merchant_map = {
        'amazon.com': 'Amazon',
        'ubereats.com': 'Uber Eats',
        'doordash.com': 'DoorDash',
        'grubhub.com': 'Grubhub',
        'costco.com': 'Costco',
        'walmart.com': 'Walmart',
        'shell.com': 'Shell',
        'chevron.com': 'Chevron',
        'exxon.com': 'Exxon',
    }
    return merchant_map.get(domain, domain.split('.')[0].title())

def classify_with_claude(domain: str, merchant_name: str) -> str:
    """Classify merchant using Claude AI"""
    try:
        api_key = os.getenv('ANTHROPIC_API_KEY')
        if not api_key:
            print("  ANTHROPIC_API_KEY not set")
            return "OTHER"

        client = Anthropic(api_key=api_key)

        prompt = f"""Classify the merchant '{merchant_name}' (domain: {domain}) into ONE category:
- TRAVEL (airlines, hotels, booking)
- DINING (restaurants, food delivery: Uber Eats, DoorDash, Grubhub)
- E-COMMERCE (Amazon, eBay, online shopping)
- GROCERIES (Costco, Walmart grocery)
- GAS (Shell, Chevron, Exxon)
- ONLINE (online purchases, digital)
- FINANCE (banks, payments)
- ENTERTAINMENT (streaming, music)
- OTHER

Respond with ONLY the category name."""

        response = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=50,
            messages=[{"role": "user", "content": prompt}]
        )

        category = response.content[0].text.strip().upper()
        valid = ["TRAVEL", "ENTERTAINMENT", "E-COMMERCE", "DINING", "GROCERIES", "GAS", "ONLINE", "FINANCE", "UTILITIES", "OTHER"]

        if category not in valid:
            category = "OTHER"

        return category

    except Exception as e:
        print(f"Claude error: {e}")
        return "OTHER"

@app.post("/classify")
async def classify_merchant(request: ClassifyRequest) -> ClassifyResponse:
    """Cash Cow Agent classification endpoint"""
    print(f"Cash Cow Agent received: {request.url}")

    # Extract domain
    domain = extract_domain(request.url)
    merchant_name = get_merchant_name(domain)

    # Classify with Claude AI
    category = classify_with_claude(domain, merchant_name)

    print(f"Domain: {domain}")
    print(f"Merchant: {merchant_name}")
    print(f"Category: {category}")

    return ClassifyResponse(
        domain=domain,
        category=category,
        merchant_name=merchant_name
    )

@app.get("/")
def root():
    return {
        "status": "Cash Cow Agent running with Claude AI",
        "version": "2.0",
        "endpoint": "/classify",
        "provider": "Anthropic Claude"
    }

if __name__ == "__main__":
    print("\nStarting Cash Cow Agent Server...")
    print("Powered by: Anthropic Claude")
    print("Endpoint: http://localhost:8080")
    print("Chrome extension will connect here\n")

    uvicorn.run(app, host="0.0.0.0", port=8080)
