import os
import requests

SERPAPI_KEY = os.getenv("SERPAPI_API_KEY")

def search_feature(feature_name: str):
    
    query = f"{feature_name} analytics business benefits use cases"
    print(f"Searching for: {query}")

    params = {
        "engine": "google_ai_mode",
        "q": query,
        "api_key": SERPAPI_KEY,
        "num": 5
    }

    print(params)

    response = requests.get("https://www.searchapi.io/api/v1/search", params=params, timeout=15)
    print(f"Response Status Code: {response.text}")
    data = response.json()

    results = []

    for item in data.get("reference_links", []):
        results.append({
            "title": item.get("title"),
            "snippet": item.get("snippet"),
            "link": item.get("link"),
            "source": item.get("source"),
        })

    return results
