export default function Header({ stepText, onBack, variant = 'default' }) {
  // variant: 'default' = standard compact bar, 'landing' = larger wordmark
  const isLanding = variant === 'landing';

  return (
    <header
      className={`w-full flex items-center justify-between px-margin-mobile md:px-margin-desktop relative z-40 transition-all duration-300 ${
        isLanding
          ? 'py-2 md:py-4 bg-bg border-b border-line'
          : 'py-3 md:py-4 bg-surface/80 backdrop-blur-sm border-b border-line/50'
      }`}
    >
      {/* Left — Back Button */}
      <div className="flex-1 flex items-center min-w-0">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-muted hover:text-ink transition-colors duration-300 flex items-center gap-1 group"
          >
            <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform duration-300">arrow_back</span>
            <span className="hidden md:inline font-body text-[11px] text-muted uppercase tracking-eyebrow group-hover:text-ink transition-colors">Kembali</span>
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Center — Logo */}
      <div className="flex-1 flex justify-center">
        <img
          src="/selphie.svg"
          alt="Studio icon"
          className={`select-none ${
            isLanding
              ? 'h-16 md:h-20'
              : 'h-8'
          }`}
        />
      </div>

      {/* Right — Step Indicator + GitHub */}
      <div className="flex-1 flex justify-end items-center gap-3 min-w-0">
        {stepText && (
          <span className="font-body text-[11px] text-muted uppercase tracking-eyebrow whitespace-nowrap">
            {stepText}
          </span>
        )}
        <a
          href="https://github.com/he1kousen/selphie"
          target="_blank"
          rel="noreferrer noopener"
          className="font-body text-[11px] uppercase tracking-eyebrow text-ink border border-line/60 px-3 py-2 rounded transition-colors duration-300 hover:bg-line hover:text-ink"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
