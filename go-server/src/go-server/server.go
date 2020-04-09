package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

const mongodb_server = "mongodb://cmpe295:cmpe295@ds041571.mlab.com:41571/team295"
const mongodb_database = "team295"
const mongodb_collection = "landdata"
const mongodb_login = "login"

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
	s := mx.PathPrefix("/api/v1/").Subrouter()
	s.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	s.HandleFunc("/landdata/{city}", getLanddataByCity(formatter)).Methods("GET")
	s.HandleFunc("/login", login(formatter)).Methods("POST")
	s.HandleFunc("/signup", signup(formatter)).Methods("POST")
}

func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		fmt.Println("The server is alive")
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"Forecasting maarket bubble Go API v1 is alive"})
	}
}
func optionsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		fmt.Println("options handler PREFLIGHT Request")
		return
	}
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func getLanddataByCity(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		fmt.Println("inside getLanddataByCity")

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)

		var results []Landdata
		params := mux.Vars(req)
		var city string = params["city"]
		fmt.Printf("city: %s", city)
		err = c.Find(bson.M{"MSA": strings.ToUpper(city)}).All(&results)
		if err != nil {
			fmt.Println("Error while getting landdata: ", err)
			log.Fatal(err)
			formatter.JSON(w, http.StatusInternalServerError,
				struct{ Response error }{err})
		}
		fmt.Println(results)
		response := EventResponse{
			Count:       len(results),
			AllLanddata: results}

		if len(results) > 0 {
			formatter.JSON(w, http.StatusOK, response)
		} else {
			formatter.JSON(w, http.StatusNoContent,
				struct{ Response string }{"No landdata found"})
		}
	}
}

/*
func connectMongoDB(dbURL string, dbName string, dbColl string) (mgo.Collection, error) {

	session, err := mgo.Dial(dbURL)
	if err != nil {
		fmt.Printf(err.Error())
		return nil, errors.New("Could not establish connection")
		panic(err)
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(dbName).C(dbColl)
	session.DB(dbName).C(dbColl)
	return c, nil

}
*/
