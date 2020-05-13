import csv
import os


def getDates():
    dates = dict()

    # for 2018
    dates["2018"]=dict()
    # dates["2018"]["Q1"]=["2018-01-31","2018-02-28","2018-03-31"]
    # dates["2018"]["Q2"]=["2018-04-30","2018-05-31","2018-06-30"]
    dates["2018"]["Q3"]=["2018-07-31","2018-08-31","2018-09-30"]
    dates["2018"]["Q4"]=["2018-10-31","2018-11-30","2018-12-31"]

    # for 2019
    dates["2019"]=dict()
    dates["2019"]["Q1"]=["2019-01-31","2019-02-28","2019-03-31"]
    dates["2019"]["Q2"]=["2019-04-30","2019-05-31","2019-06-30"]
    dates["2019"]["Q3"]=["2019-07-31","2019-08-31","2019-09-30"]
    dates["2019"]["Q4"]=["2019-10-31","2019-11-30","2019-12-31"]

    # for 2020
    dates["2020"]=dict()
    dates["2020"]["Q1"]=["2020-01-31","2020-02-29","2020-03-31"]

    return dates


csvLines=[]

filePath = "HomeDataForMissingCities.csv"

# Read from file
with open(filePath,"r") as csvFile:
    zillowCSVReader = csv.DictReader(csvFile)
    lineCount=0
    dates = getDates()
    for row in zillowCSVReader:
        if(lineCount==0):
            rowCity = row["RegionName"]
            for year in dates.keys():
                for quarter in dates[year].keys():
                    quarterMonths = dates[year][quarter]
                    rowQuarterTitle = ""+year+""+quarter
                    quarterValue = 0
                    for month in quarterMonths:
                        quarterValue  = quarterValue + float(row[month])
                    quarterPrice = float("{:.2f}".format(quarterValue/3))
                    line = {"MSA":rowCity,"Date":rowQuarterTitle,"Home Value":quarterPrice}
                    csvLines.append(line)
        

# Write into file


with open('HomeDataMissingCitiesCSVTill2020ByQuarters.csv', 'w', newline='') as csvfile:
    fieldnames = ['MSA', 'Date','Home Value']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for data in csvLines:
            writer.writerow(data)
    
    print("All data has been written")


    
