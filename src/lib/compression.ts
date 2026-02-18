import pako from 'pako'

/**
 * Compresses a string using gzip and encodes it to base64
 * This significantly reduces URL size for large JSON configs
 */
export function compressAndEncode(data: string): string {
  try {
    // Convert string to Uint8Array
    const uint8Array = new TextEncoder().encode(data)
    
    // Compress using gzip
    const compressed = pako.gzip(uint8Array)
    
    // Convert to base64 - use URL-safe base64 (handle large arrays safely)
    let base64 = ''
    const chunkSize = 8192
    for (let i = 0; i < compressed.length; i += chunkSize) {
      const chunk = compressed.slice(i, i + chunkSize)
      base64 += btoa(String.fromCharCode.apply(null, Array.from(chunk)))
    }
    
    // Make URL-safe by replacing characters
    base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    
    return base64
  } catch (error) {
    console.error('Compression error:', error)
    throw new Error('Failed to compress data')
  }
}

/**
 * Decodes base64 and decompresses gzip data back to original string
 */
export function decodeAndDecompress(encoded: string): string {
  try {
    // Restore URL-safe base64 to regular base64
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '='
    }
    
    // Decode from base64 to binary
    const binaryString = atob(base64)
    const uint8Array = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i)
    }
    
    // Decompress using gunzip
    const decompressed = pako.ungzip(uint8Array)
    
    // Convert back to string
    return new TextDecoder().decode(decompressed)
  } catch (error) {
    console.error('Decompression error:', error)
    throw new Error('Failed to decompress data')
  }
}

/**
 * Estimates the URL length that would be generated
 * Useful for warning users about potential size issues
 */
export function estimateUrlLength(baseUrl: string, configData: string, techData: string): number {
  const encodedConfig = compressAndEncode(configData)
  const encodedTech = compressAndEncode(techData)
  return baseUrl.length + encodedConfig.length + encodedTech.length + 50 // +50 for query params
}
