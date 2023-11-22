const { JWT_SECRET: ENV_JWI_SECRET } = process.env;
if (!ENV_JWI_SECRET)
  throw new Error("JWT_SECRET environment variable is no configured");

export const JWT_SECRET = ENV_JWI_SECRET;

export const adminID = "24d17988-c92c-447f-aa2b-48969187dae2";
