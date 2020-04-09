package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func login(formatter *render.Render) http.HandlerFunc {

	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)
		fmt.Println("Inside login Function")

		var user Login
		err := json.NewDecoder(req.Body).Decode(&user)
		if err != nil {
			fmt.Println("In err of login handler")
			fmt.Println(err)
			resp := Test{"Not a proper request"}
			formatter.JSON(w, http.StatusNoContent, resp)
			return
		}
		fmt.Printf("%+v\n", user)
		resp := Test{"Login function executed correctly"}
		formatter.JSON(w, http.StatusOK, resp)
	}

}

func signup(formatter *render.Render) http.HandlerFunc {

	return func(w http.ResponseWriter, req *http.Request) {
		setupResponse(&w, req)

		// setting up mongo connection
		coll, mongoErr := connectMongoDB(mongodb_server, mongodb_database, mongodb_login)

		if mongoErr != nil {
			fmt.Println("mongo connection err")
			resp := Test{"Could not make connection with DB"}
			formatter.JSON(w, http.StatusNoContent, resp)
			return
		}

		// do we have all fields required to have a successful request
		var user Signup
		err := json.NewDecoder(req.Body).Decode(&user)
		if err != nil {
			fmt.Println("In err of login handler")
			fmt.Println(err.Error())
			resp := Test{"Not a proper request"}
			formatter.JSON(w, http.StatusNoContent, resp)
			return
		}

		fmt.Printf("%+v\n", user)
		// checking if user exists
		count, _ := coll.Find(bson.M{"email": user.Email}).Count()

		if count > 0 {
			fmt.Println("checking user exists")
			fmt.Println(err.Error())
			resp := Test{"Email already exists"}
			formatter.JSON(w, http.StatusNoContent, resp)
			return
		}

		err = coll.Insert(&user)

		if err != nil {
			fmt.Println(err.Error())
			resp := Test{"Error in insertion"}
			formatter.JSON(w, http.StatusNoContent, resp)
			return
		}

		resp := Test{"You have successfully signed up."}
		formatter.JSON(w, http.StatusOK, resp)
	}

}

func connectMongoDB(dbURL string, dbName string, dbColl string) (*mgo.Collection, error) {

	session, err := mgo.Dial(dbURL)
	if err != nil {
		fmt.Printf(err.Error())
		panic(err)
		return nil, errors.New("Could not establish connection")
	}
	// defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(dbName).C(dbColl)
	session.DB(dbName).C(dbColl)
	return c, nil

}
