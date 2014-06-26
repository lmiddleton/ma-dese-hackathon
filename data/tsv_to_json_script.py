# A script for converting TSV to JSON
# taken from http://stackoverflow.com/questions/7520165/python-convert-csv-file-to-json
# with modifications from http://stackoverflow.com/questions/12309269/write-json-data-to-file-in-python

import json

f = open('CrosswalkMasterListV2Lauren-google-clean.tsv', 'r')

arr = []
headers = []

for header in f.readline().split('\t'):
	print header
	headers.append(header)

for line in f.readlines():
	lineItems = {}
	for i,item in enumerate(line.split('\t')):
		lineItems[headers[i]] = item
	arr.append(lineItems)

f.close()

with open('CrosswalkMasterListV2Lauren-google-clean.txt', 'w') as outfile:
	json.dump(arr, outfile, ensure_ascii=False)

#jsonText = json.dumps(arr)

#print jsonText