import requests
import json

s = requests.Session()
citiesFile = open("cities.json", mode='r', encoding='utf-8')
cities = json.load(citiesFile)
for city in cities:
	name = city['name'].replace(" ", "_")
	name = name.replace("?", "")
	r = s.get('http://localhost:3000/createAreaPoints/'+city['lat']+'/'+city['lng']+'/'+name)
	x = r.text
	print(x)
	# break;




	
