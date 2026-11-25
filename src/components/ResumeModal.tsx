import { X, Download, ExternalLink, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "../data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-6 bg-slate-950/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] flex flex-col rounded-2xl bg-[#070b14] border border-white/[0.12] shadow-2xl overflow-hidden text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="h-14 px-4 sm:px-6 flex items-center justify-between bg-white/[0.03] border-b border-white/[0.08] text-slate-300 gap-2">
          <div className="flex items-center space-x-2 min-w-0">
            <FileText className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="font-semibold text-xs sm:text-sm text-white truncate">
              Abhiram_Alla_Resume.pdf
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <a
              href={PORTFOLIO_DATA.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white transition-colors"
              title="Open PDF in New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>

            <a
              href={PORTFOLIO_DATA.resumePdf}
              download="Abhiram_Alla_Resume.pdf"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Viewport */}
        <div className="flex-1 w-full bg-slate-900 overflow-hidden relative">
          <iframe
            src={`${PORTFOLIO_DATA.resumePdf}#view=FitH`}
            title="Abhiram Alla Resume PDF"
            className="w-full h-full border-none bg-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
