package auth

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/peterzernia/project/utils"
)

func handleRegistration(c *gin.Context) {
	var auth Auth
	c.ShouldBindJSON(&auth)
	db := utils.GetDB()

	if auth.Password1 != auth.Password2 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Passwords do not match",
		})
		return
	}

	err := utils.ValidatePassword(auth.Password1)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	password := utils.HashAndSalt([]byte(auth.Password1))
	token, _ := utils.GenerateRandomString(32)

	user := User{
		Email:    auth.Email,
		Username: auth.Username,
		Password: password,
		Token:    token,
	}

	if err := db.Create(&user).Error; err != nil {
		var message string

		if strings.HasSuffix(err.Error(), "username_key\"") {
			message = "A user with that username already exists"
		} else if strings.HasSuffix(err.Error(), "email_key\"") {
			message = "A user registered with that email already exists"
		} else {
			message = "Oops! Something went wrong"
		}

		c.JSON(http.StatusBadRequest, gin.H{
			"message": message,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":         user.ID,
		"created_at": user.CreatedAt,
		"updated_at": user.UpdatedAt,
		"email":      user.Email,
		"token":      user.Token,
		"username":   user.Username,
	})
}

func handleLogin(c *gin.Context) {
	var auth Auth
	var user User
	c.ShouldBindJSON(&auth)
	db := utils.GetDB()

	db.Where("username = ?", auth.Username).First(&user)

	err := utils.ComparePasswords(user.Password, auth.Password)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid credentials",
		})
		return
	}

	if user.Token == "" {
		token, _ := utils.GenerateRandomString(32)
		user.Token = token
		db.Save(&user)
	}

	c.JSON(http.StatusOK, gin.H{
		"id":         user.ID,
		"created_at": user.CreatedAt,
		"updated_at": user.UpdatedAt,
		"email":      user.Email,
		"token":      user.Token,
		"username":   user.Username,
	})
}

func handleLogout(c *gin.Context) {
	var user User
	db := utils.GetDB()

	token := c.GetHeader("Authorization")
	db.Where("token = ?", token).First(&user)

	if user.Username == "" {
		c.Status(http.StatusBadRequest)
		return
	}

	user.Token = ""
	db.Save(&user)
	c.Status(http.StatusOK)
	return
}

func handlePasswordChange(c *gin.Context) {
	var auth Auth
	var user User
	c.ShouldBindJSON(&auth)
	db := utils.GetDB()
	token := c.GetHeader("Authorization")
	fmt.Println(auth)

	db.Where("token = ?", token).First(&user)
	err := utils.ComparePasswords(user.Password, auth.Password)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid credentials",
		})
		return
	}

	if auth.Password1 != auth.Password2 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Passwords do not match",
		})
		return
	}

	err = utils.ValidatePassword(auth.Password1)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	password := utils.HashAndSalt([]byte(auth.Password1))
	user.Password = password
	db.Save(&user)

	c.Status(http.StatusOK)
}
