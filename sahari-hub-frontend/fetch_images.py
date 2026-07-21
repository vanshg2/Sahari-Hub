import urllib.request
import re
import json

def get_unsplash(query):
    url = 'https://unsplash.com/s/photos/' + query.replace(' ', '-')
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'\"https://images\.unsplash\.com/photo-([a-zA-Z0-9\-]+)\?ixlib', html)
        if match:
            return 'https://images.unsplash.com/photo-' + match.group(1) + '?auto=format&fit=crop&q=80&w=400'
    except Exception as e:
        print('Error:', e)
    return None

print('Bags:', get_unsplash('handbag'))
print('Dresses:', get_unsplash('corset-dress'))
print('Suits:', get_unsplash('indian-suit'))
