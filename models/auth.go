package models

// Auth ..
type Auth struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	Password1 string `json:"password1"`
	Password2 string `json:"password2"`
	Username  string `json:"username"`
}
