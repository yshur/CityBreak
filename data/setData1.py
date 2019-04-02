import requests
import json

def getFullItem():
	r = s.get('https://israelhiking.osm.org.il/api/poi/?northEast=33.344877,35.987796&southWest=29.177840,33.429455&categories=Hiking,Bicycle,4x4,Water,Historic,Viewpoint,Camping,Natural,Other,Wikipedia,iNature&language=he')
	x = r.text
	data = json.loads(x)
	return data

s = requests.Session()
s.proxies = {"http": "http://61.233.25.166:80"}
	
items = getFullItem()

filename = "data1.json"
with open(filename, mode='w', encoding='utf-8') as f:
	json.dump(items, f, ensure_ascii=False)
