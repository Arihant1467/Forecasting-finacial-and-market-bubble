all: clean

clean: 
	find . -name 'go-server' -type f -exec rm -f {} \; 
	go clean
go-get:
	rm -rf src/github.com
	go get -v github.com/codegangsta/negroni
	go get -v github.com/streadway/amqp
	go get -v github.com/gorilla/mux
	go get -v github.com/unrolled/render
	go get -v github.com/satori/go.uuid
	go get -v gopkg.in/mgo.v2
	go get -v gopkg.in/mgo.v2/bson
	go get -v github.com/gorilla/handlers

go-format:
	go fmt go-server

go-install:
	go install go-server

go-build:
	go build go-server

go-run: go-build
	./go-server
