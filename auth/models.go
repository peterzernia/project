package auth

import "time"

// Auth ..
type Auth struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	Password1 string `json:"password1"`
	Password2 string `json:"password2"`
	Username  string `json:"username"`
}

// User ...
type User struct {
	ID        *int64     `json:"id"`
	CreatedAt *time.Time `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at,omitempty"`
	Email     string     `json:"email" gorm:"unique;not null"`
	Password  string     `json:"-"`
	Token     string     `json:"token"`
	Username  string     `json:"username" gorm:"unique;not null"`
}
