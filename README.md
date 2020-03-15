# Forecasting-finacial-and-market-bubble
Predicting the next recession


### MLAB login credentials
```
u: cmpe295
p: cmpe295

```

### To connect to the database
```
mongo ds034348.mlab.com:34348/forecast_market_bubble -u cmpe295 -p cmpe295
mongodb://cmpe295:cmpe295@ds034348.mlab.com:34348/forecast_market_bubble

mongoimport -h ds041571.mlab.com:41571 -d team295 -c landdata -u cmpe295 -p cmpe295 --file /Users/arihantsaiparuchuru/Downloads/LandData.csv --type csv --headerline
```

### Setting up Go Path
```
export GOPATH=/Users/arihantsaiparuchuru/Downloads/Forecasting-finacial-and-market-bubble/go-server
export GOBIN=$GOPATH/bin
export PATH=$PATH:$GOPATH:$GOBIN
```

### Running Go Server
```
cd /Users/arihantsaiparuchuru/Downloads/Forecasting-finacial-and-market-bubble/go-server/src/go-server
go build
go run go-server 
```

### Ping Path
```
curl http://localhost:4000/api/v1/ping
{
  "Test": "Forecasting maarket bubble Go API v1 is alive"
}
```
 
