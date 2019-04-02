import requests
import json

def getFullItem(s, itemsSource, itemsID):
	print(itemsSource+", "+itemsID)

	r = s.get('https://israelhiking.osm.org.il/api/poi/'+itemsSource+'/'+itemsID+'?language=he')
	if is_json(r.text):
		x = r.text
	else:
		x =  '{ "id":"'+itemsID+'", "source":"'+itemsSource+'"}'
	data = json.loads(x)
	# print(data)
	return data

def is_json(myjson):
    try:
        json_object = json.loads(myjson)
    except ValueError as e:
        return False
    return True

s = requests.Session()
s.proxies = {"http": "http://61.233.25.166:80"}
	
itemsFile = open("data3.json", mode='r', encoding='utf-8')
itemsList = json.load(itemsFile)
fullItemsList = []
# i = 0

for item in itemsList:
	# i = i+1
	itemsSource = item["source"]
	itemsID = item["id"]
	fullItem = getFullItem(s, itemsSource, itemsID)
	fullItemsList.append(fullItem)
	# if i > 2:
		# break;
	
filename = "data2.json"
with open(filename, mode='w', encoding='utf-8') as f:
	json.dump(fullItemsList, f, ensure_ascii=False)
