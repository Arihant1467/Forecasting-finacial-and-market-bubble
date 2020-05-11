package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"net/url"

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
const latestdata_collection = "latesthomedata"
const forecast_collection = "forecastpctchange"
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
	s.HandleFunc("/recentdata/{city}", getRecentDataByCity(formatter)).Methods("GET")
	s.HandleFunc("/pctchangedata/{city}", getPctChangeDataByCity(formatter)).Methods("GET")

	// Tingo Based
	s.HandleFunc("/stock/search/{searchText}", searchTingo(formatter)).Methods("GET")
	s.HandleFunc("/stock/latest/{tinker}", latestStockPrice(formatter)).Methods("GET")
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

// fetching data from latesthomedata collection from mLab
func getRecentDataByCity(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		fmt.Println("inside getRecentDataByCity")

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(latestdata_collection)

		var results []Landdata
		params := mux.Vars(req)
		var city string = params["city"]
		fmt.Printf("city: %s", city)
		err = c.Find(bson.M{"MSA": strings.ToUpper(city)}).All(&results)
		if err != nil {
			fmt.Println("Error while getting latestdata: ", err)
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
				struct{ Response string }{"No recentdata found"})
		}
	}
}

// API for fetching data from forecastpctchange collection in mLab
func getPctChangeDataByCity(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		fmt.Println("inside getPctChangeDataByCity")

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(forecast_collection)

		var results []Forecastdata
		params := mux.Vars(req)
		var city string = params["city"]
		fmt.Printf("city: %s", city)
		err = c.Find(bson.M{"City": strings.ToUpper(city)}).All(&results)
		if err != nil {
			fmt.Println("Error while getting forecastdata: ", err)
			log.Fatal(err)
			formatter.JSON(w, http.StatusInternalServerError,
				struct{ Response error }{err})
		}
		fmt.Println(results)

		response := ForecastResponse{
			Count:           len(results),
			Allforecastdata: results}

		if len(results) > 0 {
			formatter.JSON(w, http.StatusOK, response)
		} else {
			formatter.JSON(w, http.StatusNoContent,
				struct{ Response string }{"No forecastdata found"})
		}
	}
}
func searchTingo(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		fmt.Println("inside searchTingo")
		params := mux.Vars(req)
		var searchText string = params["searchText"]
		fmt.Println(searchText);
		t := &url.URL{Path: searchText}
		mySecondEncodedString := t.String()
		url := "https://api.tiingo.com/tiingo/utilities/search?query=" + mySecondEncodedString
		fmt.Println(url);
		method := "GET"
		client := &http.Client{}

		req, err := http.NewRequest(method, url, nil)

		if err != nil {
			fmt.Println(err)
		}
		req.Header.Add("Content-Type", "application/json")
		req.Header.Add("Authorization", "Token a7cece7d8a0fa6692e5d9ff35ef510ef1058166a")

		res, err := client.Do(req)
		defer res.Body.Close()
		body, err := ioutil.ReadAll(res.Body)

		w.Header().Set("Content-Type", "application/json")
		w.Write(body)

	}
}

func latestStockPrice(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		fmt.Println("inside latestStockPrice")
		params := mux.Vars(req)
		var tinker string = params["tinker"]

		url := "https://api.tiingo.com/tiingo/daily/" + tinker + "/prices"
		method := "GET"
		client := &http.Client{}

		req, err := http.NewRequest(method, url, nil)

		if err != nil {
			fmt.Println(err)
		}
		req.Header.Add("Content-Type", "application/json")
		req.Header.Add("Authorization", "Token a7cece7d8a0fa6692e5d9ff35ef510ef1058166a")

		res, err := client.Do(req)
		defer res.Body.Close()
		body, err := ioutil.ReadAll(res.Body)

		fmt.Println(string(body))

		w.Header().Set("Content-Type", "application/json")
		w.Write(body)

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
