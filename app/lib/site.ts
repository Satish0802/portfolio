const basePath = process.env.NODE_ENV === "production" ? "/portfolio" : "";

export function publicAssetPath(path: string) {
  return `${basePath}${path}`;
}