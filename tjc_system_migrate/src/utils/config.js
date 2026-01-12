const fallbackApi = 'http://localhost:5000/api'
const fallbackAsset = 'http://localhost:5000'

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || fallbackApi).replace(/\/$/, '')
export const ASSET_BASE_URL =
  (import.meta.env.VITE_ASSET_BASE_URL || API_BASE_URL.replace(/\/api$/, '') || fallbackAsset).replace(/\/$/, '')

export const resolveAssetUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${ASSET_BASE_URL}${normalizedPath}`
}
