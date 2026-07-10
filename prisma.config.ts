// Prisma 7 configuration.
// A config file replaces the (now unsupported) `prisma` key in package.json.
// It also disables Prisma's automatic .env loading, so we load it ourselves.
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'libs/shared/database/prisma/schema.prisma',
  // In Prisma 7 the connection URL lives here (for migrate/introspection),
  // not in the schema. The app itself connects via a driver adapter.
  // Use process.env (not Prisma's env() helper) so that `prisma generate`,
  // which doesn't need a DB connection, doesn't throw in CI where
  // DATABASE_URL is unset.
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
