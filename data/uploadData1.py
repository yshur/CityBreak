import json
from pymongo import MongoClient


file = open('data1.json', 'r', encoding="utf8")

data = json.load(file)
client = MongoClient('mongodb://db_usr:db_pass1@ds217970.mlab.com:17970/city_break')
db = client['city_break']
collection = db.items
collection.insert_many(data)
