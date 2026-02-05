import requests

url = "https://easyway.com.np/"
try:
    response = requests.get(url, verify=False) # Skip SSL verification if needed
    with open("raw_homepage.html", "w", encoding="utf-8") as f:
        f.write(response.text)
    print("Successfully downloaded raw_homepage.html")
except Exception as e:
    print(f"Error: {e}")
