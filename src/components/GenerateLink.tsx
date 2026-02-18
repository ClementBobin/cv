import { useState } from 'react'
import { encodeUrl } from '@/lib/urlEncoder'

export function GenerateLink() {
  const [inputUrl, setInputUrl] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!inputUrl.trim()) {
      alert('Please enter a valid URL')
      return
    }

    // Validate URL format
    try {
      new URL(inputUrl)
    } catch {
      alert('Please enter a valid URL format (e.g., https://example.com/cv-config.json)')
      return
    }

    const encoded = encodeUrl(inputUrl)
    // Get the base URL without /generate path
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/generate\/?$/, '')
    const link = `${baseUrl}/?config=${encoded}`
    setGeneratedLink(link)
    setCopied(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
      alert('Failed to copy to clipboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Generate Resume Link
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Enter the URL to your resume configuration JSON file to generate a shareable link.
          The URL will be encoded for privacy.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="url-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Configuration URL
            </label>
            <input
              id="url-input"
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://clementbobin.github.io/public/cv-config.json"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg 
                       bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                       placeholder-slate-400 dark:placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                     transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Generated Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded
                           bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded
                           transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            ← Back to Resume
          </a>
        </div>
      </div>
    </div>
  )
}
