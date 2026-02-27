import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { useTranslation } from '@/lib/i18n'

interface PdfPrintDialogProps {
  isOpen: boolean
  onClose: () => void
  isDark: boolean
  onGenerate: (options: { darkMode: boolean; showAll: boolean }) => void
}

const LABELS: Record<string, Record<string, string>> = {
  title: { en: 'Generate PDF', fr: 'Générer le PDF' },
  theme: { en: 'Theme', fr: 'Thème' },
  light: { en: '☀️ Light', fr: '☀️ Clair' },
  dark: { en: '🌙 Dark', fr: '🌙 Sombre' },
  content: { en: 'Content', fr: 'Contenu' },
  fullCv: { en: 'Full CV', fr: 'CV complet' },
  limited: { en: 'Limited view (with "Show more")', fr: 'Vue limitée (avec "Voir plus")' },
  cancel: { en: 'Cancel', fr: 'Annuler' },
  generate: { en: 'Generate', fr: 'Générer' },
}

export function PdfPrintDialog({ isOpen, onClose, isDark, onGenerate }: PdfPrintDialogProps) {
  const { resolve } = useTranslation()
  const [darkMode, setDarkMode] = useState(isDark)
  const [showAll, setShowAll] = useState(true)

  const t = (key: string) => resolve(LABELS[key])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('title')}>
      <div className="space-y-6">
        {/* Theme selection */}
        <div>
          <p className="text-sm font-medium text-resume-text mb-3">{t('theme')}</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pdf-theme"
                checked={!darkMode}
                onChange={() => setDarkMode(false)}
              />
              <span className="text-sm text-resume-text">{t('light')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pdf-theme"
                checked={darkMode}
                onChange={() => setDarkMode(true)}
              />
              <span className="text-sm text-resume-text">{t('dark')}</span>
            </label>
          </div>
        </div>

        {/* Content selection */}
        <div>
          <p className="text-sm font-medium text-resume-text mb-3">{t('content')}</p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pdf-content"
                checked={showAll}
                onChange={() => setShowAll(true)}
              />
              <span className="text-sm text-resume-text">{t('fullCv')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pdf-content"
                checked={!showAll}
                onChange={() => setShowAll(false)}
              />
              <span className="text-sm text-resume-text">{t('limited')}</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-resume-text-secondary hover:text-resume-text transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={() => onGenerate({ darkMode, showAll })}
            className="px-4 py-2 text-sm rounded-lg bg-resume-primary text-resume-bg hover:bg-resume-primary/80 transition-colors font-medium"
          >
            {t('generate')}
          </button>
        </div>
      </div>
    </Modal>
  )
}
