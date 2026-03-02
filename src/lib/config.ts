export function getConfigKey(key: string): string {
  return process.env[`CONFIG_${key.toUpperCase().replace(/\s/g, "_")}`] || "";
}
