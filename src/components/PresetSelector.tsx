import { presets } from '@/data/presets'
import type { PresetName } from '@/data/types'
import { useTheme } from '@/lib/theme'
import { useState, useRef, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

export function ThemeVarsInjector({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme()

  return (
    <>
      <style>{`
        :root {
          --resume-bg: ${colors.bg};
          --resume-bg-card: ${colors.bgCard};
          --resume-text: ${colors.text};
          --resume-text-secondary: ${colors.textSecondary};
          --resume-primary: ${colors.primary};
          --resume-primary-light: ${colors.primaryLight};
          --resume-sidebar-from: ${colors.sidebarLight};
          --resume-sidebar-to: ${colors.sidebarLightEnd};
        }
        .dark {
          --resume-bg: ${colors.bgDark};
          --resume-bg-card: ${colors.bgCardDark};
          --resume-text: ${colors.textDark};
          --resume-text-secondary: ${colors.textSecondaryDark};
          --resume-primary: ${colors.primaryDark};
          --resume-primary-light: ${colors.primaryLightDark};
          --resume-sidebar-from: ${colors.sidebarDark};
          --resume-sidebar-to: ${colors.sidebarDarkEnd};
        }
      `}</style>
      {children}
    </>
  )
}

export function PresetSelector() {
  const { preset, setPreset } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const presetNames = Object.keys(presets) as PresetName[]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getPresetColors = (presetName: PresetName) => {
    const presetColors = presets[presetName]
    return {
      primary: presetColors.primary,
      sidebar: presetColors.text,
      bg: presetColors.bg
    }
  }

  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 sm:w-auto w-[90%]"
      ref={dropdownRef}
    >
      {/* Bouton principal */}
      <m.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full sm:w-auto gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-1.5">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: getPresetColors(preset).primary }}
          />
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: getPresetColors(preset).sidebar }}
          />
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: getPresetColors(preset).bg }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mx-2">
          {preset}
        </span>
        <m.svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-500 dark:text-gray-400"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </m.svg>
      </m.button>
    
      {/* Menu déroulant */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="preset-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 sm:w-64 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            <div className="p-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 uppercase tracking-wider">
                Choisir un thème
              </p>
              {presetNames.map((name) => {
                const colors = getPresetColors(name)
                return (
                  <m.button
                    key={name}
                    onClick={() => {
                      setPreset(name)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      preset === name
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-1">
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                        style={{ backgroundColor: colors.sidebar }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                        style={{ backgroundColor: colors.bg }}
                      />
                    </div>
                    <span
                      className={`flex-1 text-left text-sm capitalize ${
                        preset === name
                          ? 'font-medium text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {name}
                    </span>
                    {preset === name && (
                      <m.svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-green-500"
                      >
                        <path
                          d="M15 4.5L6.75 12.75L3 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </m.svg>
                    )}
                  </m.button>
                )
              })}
            </div>
    
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <span>🎨</span>
                {presetNames.length} thèmes disponibles
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
