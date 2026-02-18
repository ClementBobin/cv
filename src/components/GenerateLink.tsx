import { useState } from 'react'
import { encodeUrl } from '@/lib/urlEncoder'
import { exampleResumeConfig, exampleTechRegistry } from '@/data/exampleConfigs'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'

export function GenerateLink() {
  const { resolve } = useTranslation()
  const labels = resumeConfig.labels.generateLink!
  
  const [configUrl, setConfigUrl] = useState('')
  const [techRegistryUrl, setTechRegistryUrl] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [showConfigExample, setShowConfigExample] = useState(false)
  const [showTechRegistryExample, setShowTechRegistryExample] = useState(false)

  const handleGenerate = () => {
    if (!configUrl.trim()) {
      alert(resolve(labels.alertConfigRequired))
      return
    }

    // Validate URL format
    try {
      new URL(configUrl)
      if (techRegistryUrl.trim()) {
        new URL(techRegistryUrl)
      }
    } catch {
      alert(resolve(labels.alertInvalidUrl))
      return
    }

    const encodedConfig = encodeUrl(configUrl)
    // Get the base URL without /generate path
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/generate\/?$/, '')
    
    let link = `${baseUrl}/?config=${encodedConfig}`
    
    // Add tech-registry parameter if provided
    if (techRegistryUrl.trim()) {
      const encodedTechRegistry = encodeUrl(techRegistryUrl)
      link += `&tech-registry=${encodedTechRegistry}`
    }
    
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
      alert(resolve(labels.alertCopyFailed))
    }
  }

  const copyJson = async (json: object, type: string) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(json, null, 2))
      alert(`${type} ${resolve(labels.alertJsonCopied)}`)
    } catch (error) {
      console.error('Failed to copy:', error)
      alert(resolve(labels.alertCopyFailed))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Generation Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {resolve(labels.title)}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {resolve(labels.description)}
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="config-url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {resolve(labels.configUrlLabel)} <span className="text-red-500">{resolve(labels.configUrlRequired)}</span>
              </label>
              <input
                id="config-url"
                type="text"
                value={configUrl}
                onChange={(e) => setConfigUrl(e.target.value)}
                placeholder="https://example.com/cv-config.json"
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg 
                         bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                         placeholder-slate-400 dark:placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="tech-registry-url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {resolve(labels.techRegistryLabel)} <span className="text-slate-500">{resolve(labels.techRegistryOptional)}</span>
              </label>
              <input
                id="tech-registry-url"
                type="text"
                value={techRegistryUrl}
                onChange={(e) => setTechRegistryUrl(e.target.value)}
                placeholder="https://example.com/tech-registry.json"
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg 
                         bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                         placeholder-slate-400 dark:placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {resolve(labels.techRegistryNote)}
              </p>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                       transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {resolve(labels.generateButton)}
            </button>

            {generatedLink && (
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {resolve(labels.generatedLinkLabel)}
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
                    {copied ? resolve(labels.copiedButton) : resolve(labels.copyButton)}
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
              {resolve(labels.backToResume)}
            </a>
          </div>
        </div>

        {/* JSON Examples Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {resolve(labels.jsonExamples)}
          </h2>
          
          {/* Resume Config Example */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
            <button
              onClick={() => setShowConfigExample(!showConfigExample)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {resolve(labels.resumeConfigExample)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {resolve(labels.resumeConfigDescription)}
                </p>
              </div>
              <svg
                className={`w-5 h-5 text-slate-500 transition-transform ${showConfigExample ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showConfigExample && (
              <div className="px-6 pb-6">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => copyJson(exampleResumeConfig, resolve(labels.resumeConfigExample))}
                    className="px-3 py-1 text-sm bg-slate-600 hover:bg-slate-700 text-white rounded
                             transition-colors duration-200"
                  >
                    {resolve(labels.copyJson)}
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                  {JSON.stringify(exampleResumeConfig, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Tech Registry Example */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
            <button
              onClick={() => setShowTechRegistryExample(!showTechRegistryExample)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {resolve(labels.techRegistryExample)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {resolve(labels.techRegistryDescription)}
                </p>
              </div>
              <svg
                className={`w-5 h-5 text-slate-500 transition-transform ${showTechRegistryExample ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showTechRegistryExample && (
              <div className="px-6 pb-6">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => copyJson(exampleTechRegistry, resolve(labels.techRegistryExample))}
                    className="px-3 py-1 text-sm bg-slate-600 hover:bg-slate-700 text-white rounded
                             transition-colors duration-200"
                  >
                    {resolve(labels.copyJson)}
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
                  {JSON.stringify(exampleTechRegistry, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
