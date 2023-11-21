const { JWT_SECRET: ENV_JWI_SECRET } = process.env;
if (!ENV_JWI_SECRET)
  throw new Error("JWT_SECRET environment variable is no configured");

export const JWT_SECRET = ENV_JWI_SECRET;

export const adminUser = "Aster123";
export const adminPassword = "123456";
