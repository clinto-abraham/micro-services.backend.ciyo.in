package config

import "os"

func GetServiceSecret() string {
    s := os.Getenv("SERVICE_JWT_SECRET")
    if s == "" {
        s = "service_secret_example"
    }
    return s
}
