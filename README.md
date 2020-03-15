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
```

### Setting up Go Path
```
export GOPATH=/Users/arihantsaiparuchuru/Downloads/Forecasting-finacial-and-market-bubble/go-server
export GOBIN=$GOPATH/bin
export PATH=$PATH:$GOPATH:$GOBIN
```

### Running Go Server

```
As per new changes, follow below steps :

cd /Users/arihantsaiparuchuru/Downloads/Forecasting-finacial-and-market-bubble/go-server
make go-get
make go-build
make go-run

Test on postman :

GET : localhost:4000/api/v1/landdata/atlanta
GET : localhost:4000/api/v1/ping


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

