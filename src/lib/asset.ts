// Resolves a path in public/ against the site's base URL, so images still
// load when the site is served from a sub-path such as /<repo>/.
export function asset(path: string) {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
