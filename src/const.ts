const { JWT_SECRET: ENV_JWI_SECRET } = process.env;
if (!ENV_JWI_SECRET)
  throw new Error("JWT_SECRET environment variable is no configured");

export const JWT_SECRET = ENV_JWI_SECRET;

export const adminID = "0ed1958c-59cb-49ec-9de9-2b8e404ee258";
