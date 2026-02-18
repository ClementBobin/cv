import { Link } from 'react-router-dom'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'

export function Hero() {
  const { resolve } = useTranslation()
  const labels = resumeConfig.labels.hero!

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CV</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Resume Builder</span>
          </div>
          <Link
            to="/view"
            className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {resolve(labels.viewDemo)}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{resolve(labels.badge)}</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                {resolve(labels.title)}
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {resolve(labels.subtitle)}
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {resolve(labels.description)}
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                { icon: '🎨', text: resolve(labels.features.themes) },
                { icon: '🌐', text: resolve(labels.features.multilang) },
                { icon: '🔒', text: resolve(labels.features.privacy) },
                { icon: '⚡', text: resolve(labels.features.fast) },
                { icon: '🛠️', text: resolve(labels.features.customTech) },
                { icon: '📱', text: resolve(labels.features.mobile) },
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-slate-700 dark:text-slate-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/generate"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg 
                         shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {resolve(labels.getStarted)}
              </Link>
              <Link
                to="/view"
                className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-lg 
                         shadow-lg hover:shadow-xl border-2 border-slate-200 dark:border-slate-700
                         transform hover:scale-105 transition-all duration-200"
              >
                {resolve(labels.viewDemo)}
              </Link>
            </div>
          </div>

          {/* Right Column - Visual/Screenshot */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl transform rotate-3 opacity-20"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              {/* Mock Resume Preview */}
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'Python'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {resolve(labels.whyChoose)}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {resolve(labels.whyDescription)}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: resolve(labels.featureCards.customizable.title),
              description: resolve(labels.featureCards.customizable.description),
              icon: '⚙️',
            },
            {
              title: resolve(labels.featureCards.privacy.title),
              description: resolve(labels.featureCards.privacy.description),
              icon: '🔐',
            },
            {
              title: resolve(labels.featureCards.devFriendly.title),
              description: resolve(labels.featureCards.devFriendly.description),
              icon: '💻',
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {resolve(labels.ctaTitle)}
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            {resolve(labels.ctaDescription)}
          </p>
          <Link
            to="/generate"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg 
                     shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {resolve(labels.ctaButton)}
          </Link>
        </div>
      </div>
    </div>
  )
}
