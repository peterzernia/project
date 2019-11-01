package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/peterzernia/project/auth"
	"github.com/peterzernia/project/models"
	"github.com/peterzernia/project/utils"
)

func main() {
	db := utils.InitDB()
	db.AutoMigrate(&models.User{})
	defer db.Close()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:8001"},
		AllowMethods:     []string{"GET", "POST", "PUT", "OPTIONS"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	api := "/api/v1"
	auth.InitializeRoutes(router.Group(api + "/auth"))

	// Catch all routes for React-Router
	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))
	router.NoRoute(func(c *gin.Context) {
		c.File("./client/build/index.html")
	})

	port := ":" + os.Getenv("PORT")
	router.Run(port)
}
