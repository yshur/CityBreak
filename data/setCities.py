from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import numpy as np
import os
import json
import re
import time
# import datetime

browser 		= webdriver.Firefox()
pageList = [".htm", "-step-1.htm", "-step-2.htm", "-step-3.htm"]
url = "http://www.tageo.com/index-e-is-cities-IL";
cities 			= []

for page in pageList:
	browser.get(url+page)
	element = browser.find_elements_by_class_name('V2')

	trs = element[0].find_elements_by_tag_name('tr')
	
	for tr in trs[1:]:
		tds = tr.find_elements_by_tag_name('td')
		if ( (len(tds[3].text) == 0) or  (len(tds[4].text) == 0) ):
			continue;
		try:
			city = {}
			city["id"] = tds[0].text
			city["name"] = tds[1].text
			city["population"] = tds[2].text
			city["lat"] = tds[3].text
			city["lng"] = tds[4].text
			cities.append(city)
			print(city)
		except AttributeError:
			pass

filename = "cities.json"
with open(filename, mode='w', encoding='utf-8') as f:
	json.dump(cities, f, ensure_ascii=False)	


# print('End table \n')
# browser.quit()

