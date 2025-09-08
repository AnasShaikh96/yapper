// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config()

export default defineConfig({
    dialect: "postgresql",
    schema: "./apps/api/src/schema/user.ts",
    dbCredentials: {
        url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${Number(process.env.DB_PORT)}/${process.env.DB_DATABASE}`,
        // user: process.env.DB_USER,
        // host: process.env.DB_HOST,
        // database: process.env.DB_DATABASE,
        // password: process.env.DB_PASSWORD,
        // port: Number(process.env.DB_PORT),
    },
});
