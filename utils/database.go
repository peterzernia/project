package utils

import (
	"fmt"

	"github.com/jinzhu/gorm"

	//
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// DB ...
var DB *gorm.DB

// InitDB ...
func InitDB() *gorm.DB {
	connection := fmt.Sprintf("host=db sslmode=disable user=postgres password=postgres")

	db, err := gorm.Open("postgres", connection)
	if err != nil {
		fmt.Println(err)
	}
	DB = db
	return DB
}

// GetDB ...
func GetDB() *gorm.DB {
	return DB
}
