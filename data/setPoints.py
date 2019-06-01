import json
# import re
	
itemsFile = open("data2.json", mode='r', encoding='utf-8')
itemsList = json.load(itemsFile)
pointsList = []
# arabic = re.compile('[\u0627-\u064a]')

for item in itemsList:
	# print(type(item))
	isRoute = item["isRoute"] if 'isRoute' in item else False
	isArea = item["isArea"] if 'isArea' in item else False
	if isRoute == True or isArea == True:  # if route
		continue;
	try:
		point = {}
		point["category"]     = item["category"] if 'category' in item else ""
		point["description"]  = item["description"] if 'description' in item else ""
		point["imageUrl"]     = item["imagesUrls"][0] if 'imagesUrls' in item and len(item["imagesUrls"]) > 0 else ""
		point["referenceUrl"] = item["references"][0]["url"] if 'references' in item and len(item["references"]) > 0 and 'url' in item["references"][0] else "" 
		point["rating"] 	  = 0
		point["raters"] 	  = 0
		point["name"] 		  = item["title"] if 'title' in item else ""
		point["source"] 	  = item["source"] if 'source' in item else ""
		point["id"] 		  = item["id"] if 'id' in item else ""
		point["location"] 	  = item["location"] if 'location' in item else ""
		
		# if len(point["name"]) > 0 and arabic.search(point["name"]) == False:
		if len(point["name"]) > 0:
			pointsList.append(point)

	except AttributeError:
		pass
	print(point)
	# break;
filename = "points.json"
with open(filename, mode='w', encoding='utf-8') as f:
	json.dump(pointsList, f, ensure_ascii=False)
