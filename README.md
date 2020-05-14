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
As per new changes, follow below steps :

cd /Users/arihantsaiparuchuru/Downloads/Forecasting-finacial-and-market-bubble/go-server
make go-get
make go-build
make go-run

Test on postman :

GET : http://localhost:4000/api/v1/landdata/{city}
GET : http://localhost:4000/api/v1/ping


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
 

### Launch the docker images and test locally

- Create network
```
docker network create -d bridge cmpe295
```

- Backend
```
docker pull sayalipatil/forecast:latest
docker run -d --network=cmpe295 -p 4000:4000 --name server-forecast sayalipatil/forecast:latest
```

- Frontend
```
docker pull arihant95/forecast-frontend:1.0
docker run -d --network=cmpe295 -p 3000:3000 --name forecast-frontend  arihant95/forecast-frontend:1.0
```

- Stop containers
```
docker stop forecast-frontend server-forecast
docker rm forecast-frontend server-forecast
```


#### Launch Docker Compose
```
docker-compose up -d
docker-compose down
```
