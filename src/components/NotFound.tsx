import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <h1 className="text-7xl lg:text-9xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg 
                       shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Go to Home
            </Link>
            
            <Link
              to="/cv"
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-lg 
                       shadow-lg hover:shadow-xl border-2 border-slate-200 dark:border-slate-700
                       transform hover:scale-105 transition-all duration-200"
            >
              View Resume Demo
            </Link>
          </div>

          <div className="pt-8">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/generate"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Generate Link
              </Link>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <a
                href="https://github.com"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <a
                href="/docs"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>

        {/* Fun fact or tip */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Pro Tip:</strong> You can create your own custom resume by hosting a JSON config file 
            and generating a shareable link in the Generate page!
          </p>
        </div>
      </div>
    </div>
  )
}
