package main

import (
	_ "gopkg.in/mgo.v2/bson"
)

// Login : structure of the login
type Login struct {
	Username string `json:"username" bson:"username"`
	Password string `json:"password" bson:"password"`
}

// Signup : structure of the login
type Signup struct {
	Firstname string `json:"firstname" bson:"firstname"`
	Lastname  string `json:"lastname" bson:"lastname"`
	Username  string `json:"username" bson:"username"`
	Password  string `json:"password" bson:"password"`
}

// Landdata : structure of the landdata
type Landdata struct {
	//Id        string `json:"id"`
	MSA            string  `json:"MSA" bson:"MSA"`
	Date           string  `json:"Date" bson:"Date"`
	HomeValue      int     `json:"HomeValue" bson:"Home Value"`
	StructureCost  int     `json:"StructureCost" bson:"Structure Cost"`
	LandValue      int     `json:"LandValue" bson:"Land Value"`
	LandShare      string  `json:"LandShare" bson:"Land Share (Pct)"`
	HomePriceIndex float32 `json:"HomePriceIndex" bson:"Home Price Index"`
	LandPriceIndex float32 `json:"LandPriceIndex" bson:"Land Price Index"`
}

// EventResponse : Event response
type EventResponse struct {
	Count       int        `json:"count"`
	AllLanddata []Landdata `json:"alllanddata"`
}

// Test : to show server status
type Test struct {
	Status string `json:"status" bson:"status"`
}
