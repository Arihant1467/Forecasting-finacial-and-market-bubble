package main

import (
	_ "gopkg.in/mgo.v2/bson"
)

// User : structure of the user
type User struct {
	UserName string `json:"username" bson:"username"`
	password string `json:"password" bson:"password"`
}
