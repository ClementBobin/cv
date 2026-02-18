import { useState } from 'react'
import { encodeUrl } from '@/lib/urlEncoder'
import { exampleResumeConfig, exampleTechRegistry } from '@/data/exampleConfigs'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import type { ResumeConfig } from '@/data/types'

interface TechRegistry {
  [key: string]: { color: string }
}

export function GenerateForm() {
  const { resolve } = useTranslation()
  const labels = resumeConfig.labels.generateLink!
  
  // Mode: 'url' or 'form'
  const [mode, setMode] = useState<'url' | 'form'>('url')
  
  // Form data state
  const [formData, setFormData] = useState<ResumeConfig>(exampleResumeConfig as ResumeConfig)
  const [techRegistry, setTechRegistry] = useState<TechRegistry>(exampleTechRegistry)
  
  // URL mode state
  const [configUrl, setConfigUrl] = useState('')
  const [techRegistryUrl, setTechRegistryUrl] = useState('')
  
  // Load from URL state
  const [loadDataUrl, setLoadDataUrl] = useState('')
  const [loadTechUrl, setLoadTechUrl] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Output state
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)

  // Load data from URLs to pre-fill form
  const handleLoadFromUrls = async () => {
    if (!loadDataUrl.trim()) {
      alert('Please provide at least a configuration URL to load')
      return
    }

    setLoading(true)
    try {
      // Load config data
      const configResponse = await fetch(loadDataUrl)
      if (!configResponse.ok) {
        throw new Error('Failed to fetch configuration')
      }
      const configData = await configResponse.json() as ResumeConfig
      setFormData(configData)

      // Load tech registry if provided
      if (loadTechUrl.trim()) {
        const techResponse = await fetch(loadTechUrl)
        if (!techResponse.ok) {
          throw new Error('Failed to fetch tech registry')
        }
        const techData = await techResponse.json() as TechRegistry
        setTechRegistry(techData)
      }

      alert('Data loaded successfully! You can now edit the fields below.')
    } catch (error) {
      console.error('Error loading data:', error)
      alert('Failed to load data from URLs. Please check the URLs and try again.')
    } finally {
      setLoading(false)
    }
  }

  // Reset to default template
  const handleUseTemplate = () => {
    setFormData(exampleResumeConfig as ResumeConfig)
    setTechRegistry(exampleTechRegistry)
    alert('Default template loaded! You can now edit the fields below.')
  }

  // Generate link from URL mode
  const handleGenerateFromUrl = () => {
    if (!configUrl.trim()) {
      alert(resolve(labels.alertConfigRequired))
      return
    }

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
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/generate\/?$/, '')
    
    let link = `${baseUrl}/?config=${encodedConfig}`
    
    if (techRegistryUrl.trim()) {
      const encodedTechRegistry = encodeUrl(techRegistryUrl)
      link += `&tech-registry=${encodedTechRegistry}`
    }
    
    setGeneratedLink(link)
    setCopied(false)
  }

  // Generate link from form data
  const handleGenerateFromForm = () => {
    try {
      // Convert form data to JSON and upload to a temporary storage
      // For now, we'll encode the JSON data directly in the URL
      const configJson = JSON.stringify(formData)
      const techJson = JSON.stringify(techRegistry)
      
      // Create data URLs
      const configBlob = new Blob([configJson], { type: 'application/json' })
      const techBlob = new Blob([techJson], { type: 'application/json' })
      
      const configDataUrl = URL.createObjectURL(configBlob)
      const techDataUrl = URL.createObjectURL(techBlob)
      
      // Note: data URLs won't work across sessions. We need to encode the actual data.
      // Let's use base64 encoding of the JSON data
      const encodedConfig = btoa(encodeURIComponent(configJson))
      const encodedTech = btoa(encodeURIComponent(techJson))
      
      const baseUrl = window.location.origin + window.location.pathname.replace(/\/generate\/?$/, '')
      const link = `${baseUrl}/?configData=${encodedConfig}&techData=${encodedTech}`
      
      setGeneratedLink(link)
      setCopied(false)
      
      // Clean up blob URLs
      URL.revokeObjectURL(configDataUrl)
      URL.revokeObjectURL(techDataUrl)
    } catch (error) {
      console.error('Error generating link:', error)
      alert('Failed to generate link. Please check your form data.')
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Mode Selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            {resolve(labels.title)}
          </h1>
          
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setMode('url')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                mode === 'url'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              URL Mode
              {mode === 'url' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
            <button
              onClick={() => setMode('form')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                mode === 'form'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Form Mode
              {mode === 'form' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          </div>

          {/* URL Mode Content */}
          {mode === 'url' && (
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {resolve(labels.description)}
              </p>

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
                onClick={handleGenerateFromUrl}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                         transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {resolve(labels.generateButton)}
              </button>
            </div>
          )}

          {/* Form Mode Content */}
          {mode === 'form' && (
            <div className="space-y-6">
              <p className="text-slate-600 dark:text-slate-400">
                Fill in the form fields to create a temporary token. You can load data from URLs to pre-fill the form, or start with a default template.
              </p>

              {/* Load or Use Template Section */}
              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Initialize Form Data
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Load Config URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={loadDataUrl}
                      onChange={(e) => setLoadDataUrl(e.target.value)}
                      placeholder="https://example.com/cv-config.json"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded
                               bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Load Tech Registry URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={loadTechUrl}
                      onChange={(e) => setLoadTechUrl(e.target.value)}
                      placeholder="https://example.com/tech-registry.json"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded
                               bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleLoadFromUrls}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 text-white font-medium rounded
                             transition-colors duration-200"
                  >
                    {loading ? 'Loading...' : 'Load from URLs'}
                  </button>
                  <button
                    onClick={handleUseTemplate}
                    className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded
                             transition-colors duration-200"
                  >
                    Use Default Template
                  </button>
                </div>
              </div>

              {/* Form Fields - Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.personal.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        personal: { ...formData.personal, name: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded
                               bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.personal.location || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        personal: { ...formData.personal, location: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded
                               bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={typeof formData.personal.title === 'string' ? formData.personal.title : formData.personal.title.en}
                    onChange={(e) => {
                      const currentTitle = formData.personal.title
                      const newTitle = typeof currentTitle === 'string'
                        ? { en: e.target.value }
                        : { ...currentTitle, en: e.target.value }
                      setFormData({
                        ...formData,
                        personal: {
                          ...formData.personal,
                          title: newTitle
                        }
                      })
                    }}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded
                             bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Simplified message for complex data */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Important Notes:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1">
                  <li>For detailed editing of all fields (skills, experiences, projects, etc.), edit the JSON directly below</li>
                  <li>Photos and PDFs must be URLs to internet resources (e.g., https://example.com/photo.jpg)</li>
                  <li>Do not embed binary data - use publicly accessible URLs instead</li>
                </ul>
              </div>

              {/* JSON Editor */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Configuration JSON
                </h3>
                <textarea
                  value={JSON.stringify(formData, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value)
                      setFormData(parsed)
                    } catch {
                      // Invalid JSON, don't update
                    }
                  }}
                  rows={10}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded
                           bg-slate-900 text-slate-100 font-mono text-xs
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Tech Registry JSON
                </h3>
                <textarea
                  value={JSON.stringify(techRegistry, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value)
                      setTechRegistry(parsed)
                    } catch {
                      // Invalid JSON, don't update
                    }
                  }}
                  rows={8}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded
                           bg-slate-900 text-slate-100 font-mono text-xs
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleGenerateFromForm}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                         transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate Link from Form Data
              </button>
            </div>
          )}

          {/* Generated Link Output */}
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
              {mode === 'form' && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Note: This link contains your form data encoded in the URL. It may be very long.
                </p>
              )}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              {resolve(labels.backToResume)}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
