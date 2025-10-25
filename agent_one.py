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

# Your function logic, modified slightly to handle the input/output within the handler
def extract_domain(url: str) -> str:
    """
    Extracts the network location (domain) from a given URL.
    """
    try:
        # urlparse breaks the URL into components. .netloc contains the domain and port (if any).
        domain = urlparse(url).netloc
        
        # NOTE: The original logic for 'https://' check is not needed with urlparse().
        # urlparse().netloc does not include the scheme (http/https).
        
        # If the domain starts with 'www.', you can strip it for cleaner presentation
        if domain.startswith('www.'):
            domain = domain[4:]
            
        return domain
    except Exception as e:
        # In a real agent, you'd use ctx.logger.error, not print
        print(f"Error extracting domain: {e}")
        return "N/A"

# --- 4. Register the Message Handler ---

@domain_agent.on_message(model=ExtractRequest, replies=DomainResponse)
async def handle_url_request(ctx: Context, sender: str, msg: ExtractRequest):
    """
    Handles incoming ExtractRequest messages, runs the domain extraction function,
    and sends back a DomainResponse.
    """
    ctx.logger.info(f"Received request from {sender} to process URL: {msg.url}")
    
    # 🎯 IMPLEMENTATION: Call your function logic with the message input
    extracted_domain = extract_domain(msg.url)
    
    ctx.logger.info(f"Extracted domain: {extracted_domain}")

    # Send the response back to the sender
    await ctx.send(
        sender,
        DomainResponse(domain=extracted_domain)
    )

# --- 5. Run the Agent ---

if __name__ == "__main__":
    domain_agent.run()