function required(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}

function optional(key: string): string | undefined {
  return process.env[key];
}

export const env = {
  get DATABASE_URL() {
    return required("DATABASE_URL");
  },
  get ADMIN_TOKEN() {
    return required("ADMIN_TOKEN");
  },
  get BLOB_READ_WRITE_TOKEN() {
    return optional("BLOB_READ_WRITE_TOKEN") ?? "";
  },
};
