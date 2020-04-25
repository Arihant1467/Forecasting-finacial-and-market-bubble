import csv
import re

def generateCSV(filePath):
   
    csvLines = []
    with open(filePath,mode="r") as csvFile:
        zillowCSVReader = csv.DictReader(csvFile)
        lineCount=0
        for row in zillowCSVReader:
            print(lineCount)
            if lineCount!=0:
                rowCity = re.sub(re.compile(r'\s+') , '', row["City"].upper())
                row["City"] = rowCity
                csvLines.append(row)
            lineCount=lineCount+1
    
    return csvLines

def writeToCSV(csvData,fields):
    
    with open('ForecastPCTChangeCitiesCap.csv', 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fields)
        writer.writeheader()
        for data in csvData:
            writer.writerow(data)
    
    print("All data has been written")


if __name__=="__main__":
    pathToFile = "convertcsv.csv"
    csvLines = generateCSV(pathToFile)
    fieldnames = ['City', 'StateName','PctChange']
    writeToCSV(csvLines,fieldnames)
    