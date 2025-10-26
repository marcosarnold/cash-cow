from uagents import Agent, Context, Model
from pydantic import Field
from urllib.parse import urlparse 

# --- 1. Define Message Models for Communication ---

class ExtractRequest(Model):
    """Extract please"""
    url: str = Field(description="The full URL from which to extract the domain.")

class DomainResponse(Model):
    """All done!"""
    domain: str = Field(description="The extracted network location/domain.")

# --- 2. Define the Agent and Protocol ---

# Create the agent instance
domain_agent = Agent(name="domain_extractor", seed="domain_extractor_seed")

# --- 3. Integrate the Python Function Logic ---

# function logic
def extract_domain(url: str, ctx: Context) -> str:
    """
    Extracts the network location (domain) from a given URL.
    """
    try:
        # urlparse breaks the URL into components. .netloc contains the domain and port (if any).
        domain = urlparse(url).netloc
        
        # If the domain starts with 'www.', you can strip it for cleaner presentation
        if domain.startswith('www.'):
            domain = domain[4:]
            
        return domain
    except Exception as e:
        # In a real agent, you'd use ctx.logger.error, not print
        ctx.logger.error(f"Error extracting domain: {e}")
        return "N/A"

# --- 4. Register the Message Handler ---

@domain_agent.on_message(model=ExtractRequest, replies=DomainResponse)
async def handle_url_request(ctx: Context, sender: str, msg: ExtractRequest):
    """
    Handles incoming ExtractRequest messages, runs the domain extraction function,
    and sends back a DomainResponse.
    """
    ctx.logger.info(f"Received request from {sender} to process URL: {msg.url}")
    
    # IMPLEMENTATION
    extracted_domain = extract_domain(msg.url)
    
    ctx.logger.info(f"Extracted domain: {extracted_domain}")

    # Send response back to the sender
    await ctx.send(
        sender,
        DomainResponse(domain=extracted_domain)
    )

# Run ittt

if __name__ == "__main__":
    domain_agent.run()