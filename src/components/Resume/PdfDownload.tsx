import { DownloadIcon } from '@/components/icons'
import { useTranslation } from '@/lib/i18n'
import { resumeConfig } from '@/data/resume-config'
import type { ResumeConfig } from '@/data/types'

interface PdfDownloadProps {
  config?: ResumeConfig
  onGeneratePdf: () => void
}

export function PdfDownload({ config = resumeConfig, onGeneratePdf }: PdfDownloadProps) {
  const { resolve } = useTranslation()

  const downloadLabel = config.pdf?.label
    ? resolve(config.pdf.label)
    : config.labels.actions.downloadPdf
      ? resolve(config.labels.actions.downloadPdf)
      : 'Download PDF'

  return (
    <button
      onClick={onGeneratePdf}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-resume-primary/10 text-resume-primary hover:bg-resume-primary/20 transition-colors text-sm font-medium"
    >
      <DownloadIcon className="w-4 h-4" />
      {downloadLabel}
    </button>
  )
}
