package main

import (
    "os"
    "github.com/gofiber/fiber/v2"
    jwt "github.com/golang-jwt/jwt/v5"
    "log"
)

func main() {
    app := fiber.New()
    port := os.Getenv("PORT")
    if port == "" {
        port = "9000"
    }

    app.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"ok": true, "service": "go-service"})
    })

    app.Get("/go/hello", func(c *fiber.Ctx) error {
        token := c.Get("X-Internal-Token")
        if token == "" {
            return c.Status(401).JSON(fiber.Map{"error": "missing token"})
        }
        _, err := jwt.ParseString(token, func(t *jwt.Token) (interface{}, error) {
            return []byte(os.Getenv("SERVICE_JWT_SECRET")), nil
        })
        if err != nil {
            return c.Status(403).JSON(fiber.Map{"error": "invalid token"})
        }
        return c.JSON(fiber.Map{"message": "Hello from Go"})
    })

    log.Fatal(app.Listen(":" + port))
}
