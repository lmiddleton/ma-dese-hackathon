# A script for converting CSV to JSON
# taken from http://stackoverflow.com/questions/7520165/python-convert-csv-file-to-json
# with modifications from http://stackoverflow.com/questions/12309269/write-json-data-to-file-in-python

import json

f = open('IDCrosswalkMasterList_ncesdata_C22D9CAE_fixed.tsv', 'r')

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

with open('IDCrosswalkMasterList_ncesdata_C22D9CAE.txt', 'w') as outfile:
	json.dump(arr, outfile, ensure_ascii=False)

#jsonText = json.dumps(arr)

#print jsonText