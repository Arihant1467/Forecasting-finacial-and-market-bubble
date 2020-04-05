package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/unrolled/render"
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
		fmt.Println("Inside login Function")

		var user Signup
		err := json.NewDecoder(req.Body).Decode(&user)
		if err != nil {
			fmt.Println("In err of login handler")
			fmt.Println(err)
			resp := Test{"Not a proper request"}
			formatter.JSON(w, http.StatusNoContent, resp)
			return
		}
		fmt.Printf("%+v\n", user)
		resp := Test{"Signup function executed correctly"}
		formatter.JSON(w, http.StatusOK, resp)
	}

}
