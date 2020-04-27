
install.packages("MASS")
install.packages("ISLR")
library(MASS)
library(ISLR)

Land_data<-read.csv("LANDDATA.csv")
Land_data
summary(Land_data)

attach(Land_data)

lm.fit1=lm(Home.Value~Date1+ï..MSA,data = Land_data)
lm.fit1
summary(lm.fit1)

plot(lm.fit1)

detach(Land_data)





