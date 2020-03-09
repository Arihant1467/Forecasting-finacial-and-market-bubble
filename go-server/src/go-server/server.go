package main

import (
	"fmt"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	allowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"})
	allowedOrigins := handlers.AllowedOrigins([]string{"*"})
	n.UseHandler(handlers.CORS(allowedHeaders, allowedMethods, allowedOrigins)(mx))
	return n
}

// API routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	//mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	s := mx.PathPrefix("/api/v1/").Subrouter()
	s.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
}

func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		fmt.Println("The server is alive")
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"Forecasting maarket bubble Go API v1 is alive"})
	}
}
