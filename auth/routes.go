package auth

import (
	"github.com/gin-gonic/gin"
)

// InitializeRoutes initializes routes for the App
func InitializeRoutes(r *gin.RouterGroup) {
	r.POST("/register", handleRegistration)
	r.POST("/login", handleLogin)
	r.POST("/logout", handleLogout)
	r.POST("/password/change", handlePasswordChange)
}
