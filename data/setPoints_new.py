import json
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import numpy as np
import os
import re
from datetime import datetime


def getPoint(item):
	isRoute = item["isRoute"] if 'isRoute' in item else False
	isArea = item["isArea"] if 'isArea' in item else False
	if item["category"] != "iNature":  
		return;
		
	url = item["referenceUrl"];
	browser.get(url)
	
	# firstHeading = browser.find_element_by_class_name('firstHeading')
	# print(firstHeading)
	# name = firstHeading.find_element_by_tag_name('span').text;
	# print(name)
	name = item["name"];
	mw_parser_output = browser.find_element_by_id('mw-content-text')
	area = mw_parser_output.find_elements_by_tag_name('a');
	area = area[1].text
	area = area[-4:]
	now = datetime.now()
	headers = mw_parser_output.find_elements_by_css_selector('div.col-sm-6');
	if len(headers)>0:
		headers = headers[0];
	else: 
		headers = mw_parser_output.find_elements_by_css_selector('div.col-sm-4')[0];
	about = item["description"];
	# about = headers.find_elements_by_tag_name('big')[0].text;
	sub_area = headers.find_elements_by_tag_name('a')[0].text;
	address = headers.find_elements_by_tag_name('li')[3].text;
	image_url = [];
	image_url.append(item["imageUrl"])
	tags = [];
	description = [];
	location = item["location"]
	longitude = location["lng"];
	latitude = location["lat"]
	loc = {};
	loc["type"] = { "type": "Point"}
	loc["coordinates"] = [longitude, latitude]

	# image_url[0] = mw_parser_output.find_elements_by_tag_name('img')[0].get_attribute("src");
	label_primary = mw_parser_output.find_elements_by_class_name('label-primary');
	for l in label_primary:
		tag = l.find_element_by_tag_name('a').text;
		tags.append(tag)
	
	thumbinner = mw_parser_output.find_elements_by_class_name('thumbinner');
	for t in thumbinner:
		img = t.find_elements_by_tag_name('img')[0].get_attribute("src");
		image_url.append(img)
	
	descriptions = mw_parser_output.find_elements_by_tag_name('p');
	for d in descriptions:
		text = d.text;
		if(len(text) > 5):
			description.append(text)

	try:
		point = {}
		point["name"] = name
		point["about"] = about
		point["description"] = description
		point["image_url"] = image_url
		point["reference_url"] = url
		point["setup_time"] = now.isoformat()
		point["tags"] = tags
		point["duration"] = 30
		point["address"] = address
		point["longitude"] = longitude		
		point["latitude"] = latitude
		point["area"] = area
		point["sub_area"] = sub_area
		point["visitors"] = []
		point["score"] = 0
		point["scores"] = []
		point["feedbacks"] = []
		point["loc"] = loc
		pointsList.append(point);
		
	except AttributeError:
		pass	
		

browser 		= webdriver.Firefox()
itemsFile = open("points.json", mode='r', encoding='utf-8')
itemsList = json.load(itemsFile)
pointsList = []

for item in itemsList:
	getPoint(item);
	
filename = "points_new.json"
with open(filename, mode='w', encoding='utf-8') as f:
	json.dump(pointsList, f, ensure_ascii=False)