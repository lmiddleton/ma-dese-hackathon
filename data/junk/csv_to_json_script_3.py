# A script for converting CSV to JSON
# taken from http://stackoverflow.com/questions/7520165/python-convert-csv-file-to-json
# with modifications from http://stackoverflow.com/questions/12309269/write-json-data-to-file-in-python

import json

f = open('CrosswalkV2Lauren-google.csv', 'r')

arr = []
headers = []

for header in f.readline().split(','):
	print header
	headers.append(header)

for line in f.readlines():
	l = line
	l = l.replace("\n","")
	lineItems = {}
	for i,item in enumerate(l.split(',')):
		lineItems[headers[i]] = item
	arr.append(lineItems)

f.close()

with open('CrosswalkV2Lauren-google.txt', 'w') as outfile:
	json.dump(arr, outfile, ensure_ascii=False)

#jsonText = json.dumps(arr)

#print jsonText