import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.string().transform(Number),
  MYSQL_HOST: z.string(),
  MYSQL_USERNAME: z.string(),
  MYSQL_PASSWORD: z.string(),
  MYSQL_DATABASE: z.string(),
  JWT_KEY: z.string(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsed.error.format(), null, 4)
  );
  process.exit(1);
}

export const env = parsed.data;
