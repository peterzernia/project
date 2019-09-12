package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/peterzernia/project/auth"
	"github.com/peterzernia/project/utils"
)

func main() {
	db := utils.InitDB()
	db.AutoMigrate(&auth.User{})
	defer db.Close()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:8001"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	api := router.Group("/api/v1")
	auth.InitializeRoutes(api.Group("/auth"))

	// Catch all routes for React-Router
	router.Static("/", "./client/build")
	router.NoRoute(func(c *gin.Context) {
		c.File("./client/build/index.html")
	})

	router.Run(":8001")
}
