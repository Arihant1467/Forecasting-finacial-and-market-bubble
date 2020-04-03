package main

import (
	_ "gopkg.in/mgo.v2/bson"
)

// User : structure of the user
type User struct {
	UserName string `json:"username" bson:"username"`
	password string `json:"password" bson:"password"`
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
