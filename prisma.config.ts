// Prisma 7 configuration.
// A config file replaces the (now unsupported) `prisma` key in package.json.
// It also disables Prisma's automatic .env loading, so we load it ourselves.
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'libs/shared/database/prisma/schema.prisma',
  // In Prisma 7 the connection URL lives here (for migrate/introspection),
  // not in the schema. The app itself connects via a driver adapter.
  datasource: {
    url: env('DATABASE_URL'),
  },
});
