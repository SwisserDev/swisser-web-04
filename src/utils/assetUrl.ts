export const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/'
  if (path.startsWith('/')) {
    return `${base}${path.slice(1)}`
  }
  return path
}