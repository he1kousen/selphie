export default function Header({ stepText, onBack, variant = 'default' }) {
  // variant: 'default' = standard bar, 'landing' = larger wordmark, no border
  const isLanding = variant === 'landing';

  return (
    <header
      className={`w-full flex items-center justify-between px-margin-mobile md:px-margin-desktop relative z-40 transition-all duration-300 ${
        isLanding
          ? 'py-8 md:py-12 bg-bg border-b border-line'
          : 'py-stack-md bg-surface/80 backdrop-blur-sm border-b border-line/50'
      }`}
    >
      {/* Left — Back Button */}
      <div className="flex-1 flex items-center min-w-0">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-muted hover:text-ink transition-colors duration-300 flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform duration-300">arrow_back</span>
            <span className="hidden md:inline font-body text-label-caps uppercase tracking-eyebrow">Kembali</span>
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Center — Wordmark */}
      <div className="flex-1 flex justify-center">
        <span
          className={`font-display italic tracking-tight select-none ${
            isLanding
              ? 'text-[40px] md:text-[56px] text-ink leading-none'
              : 'text-headline-lg-mobile text-ink'
          }`}
        >
          Selphie
        </span>
      </div>

      {/* Right — Step Indicator */}
      <div className="flex-1 flex justify-end min-w-0">
        {stepText && (
          <span className="font-body text-label-caps text-muted uppercase tracking-eyebrow whitespace-nowrap">
            {stepText}
          </span>
        )}
      </div>
    </header>
  );
}
