package main

import (
	_ "gopkg.in/mgo.v2/bson"
)

// User : structure of the user
type User struct {
	UserName string `json:"username" bson:"username"`
	password string `json:"password" bson:"password"`
}

type Landdata struct {
	//Id        string `json:"id"`
	MSA string `json:"MSA" bson:"MSA"`
	Date   string `json:"Date" bson:"Date"`
	HomeValue    string `json:"HomeValue" bson:"Home Value"`
	StructureCost    string `json:"StructureCost" bson:"Structure Cost"`
	LandValue     int    `json:"LandValue" bson:"Land Value"`
    LandShare     string `json:"LandShare" bson:"Land Share (Pct)"`
	HomePriceIndex      int `json:"HomePriceIndex" bson:"Home Price Index"`
	LandPriceIndex  int `json:"LandPriceIndex" bson:"Land Price Index"`
}

type EventResponse struct {
	Count        int        `json:"count"`
	AllLanddata []Landdata `json:"alllanddata"`
}