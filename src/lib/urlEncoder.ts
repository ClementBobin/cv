/**
 * Encode a URL to a base64 string for obfuscation
 * Handles Unicode characters properly
 */
export function encodeUrl(url: string): string {
  try {
    // Use encodeURIComponent to handle Unicode, then btoa for base64 encoding
    return btoa(encodeURIComponent(url))
  } catch (error) {
    console.error('Failed to encode URL:', error)
    return ''
  }
}

/**
 * Decode a base64 string back to URL
 * Handles Unicode characters properly
 */
export function decodeUrl(encoded: string): string {
  try {
    // Use atob for base64 decoding, then decodeURIComponent to handle Unicode
    return decodeURIComponent(atob(encoded))
  } catch (error) {
    console.error('Failed to decode URL:', error)
    return ''
  }
}
