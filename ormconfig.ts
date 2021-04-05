export default {
  type: "sqlite",
  database: "./src/database/db.sqlite",
  entities: ["./src/app/models/**.ts"],
  migrations: ["./src/database/migrations/**.ts"],
  logging: true,
  cli: {
    migrationsDir: "./src/database/migrations"
  }
}