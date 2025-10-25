from urllib.parse import urlparse

def extract_domain(url):
    """
    Extracts the network location (domain) from a given URL.
    
    Example: 'https://www.example.com/page' -> 'www.example.com'
    """
    try:
        # urlparse breaks the URL into components. .netloc contains the domain and port (if any).
        domain = urlparse(url).netloc
        # If the domain starts with 'www.', remove it for cleaner presentation
        if domain.startswith('https://'):
            return domain[8:]
        ## print("this is the ", domain)
        return domain
    except Exception as e:
        print(f"Error extracting domain: {e}")
        return "N/A"
    
def main():
    print("Hello World!")
    ## change url to be input later
    url = "https://www.nike.com/t/air-jordan-3-retro-medium-olive-mens-shoes-bPRc5V/DN3707-202"
    real_domain = extract_domain(url)

if __name__ == "__main__":
    main()