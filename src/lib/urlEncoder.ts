/**
 * Encode a URL to a base64 string for obfuscation
 */
export function encodeUrl(url: string): string {
  try {
    // Use btoa for base64 encoding (browser-native)
    return btoa(url)
  } catch (error) {
    console.error('Failed to encode URL:', error)
    return ''
  }
}

/**
 * Decode a base64 string back to URL
 */
export function decodeUrl(encoded: string): string {
  try {
    // Use atob for base64 decoding (browser-native)
    return atob(encoded)
  } catch (error) {
    console.error('Failed to decode URL:', error)
    return ''
  }
}
