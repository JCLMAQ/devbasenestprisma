import "@dotenvx/dotenvx/config";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

// dotenvx gère automatiquement l'expansion des variables

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma/migrations", "migrations"),
    // seed: "tsx prisma/seed.ts",
  },
  views: {
    path: path.join("prisma/views", "views"),
  },
  typedSql: {
    path: path.join("prisma/queries", "queries"),
  },
  datasource: {
    url: env("DATABASE_URL"),
  }
});
