import Header from './Header';

export default function LandingView({ onNext }) {
  return (
    <div className="bg-bg text-ink font-body min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Header — landing variant (large wordmark, full border) */}
      <Header variant="landing" />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-container mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center w-full py-12 md:py-0">

          {/* Left Column — Typography & CTA */}
          <div className="md:col-span-5 md:col-start-1 flex flex-col items-start gap-6 order-2 md:order-1 mt-8 md:mt-0">
            {/* Eyebrow */}
            <p className="font-body text-label-caps text-muted uppercase tracking-eyebrow">
              Online Photobooth
            </p>

            {/* Headline */}
            <h1 className="font-display text-headline-lg-mobile md:text-headline-lg text-ink max-w-md leading-tight">
              Say cheese, the{' '}
              <span className="italic text-accent">Selphie</span>{' '}
              way
            </h1>

            {/* Subtext */}
            <p className="font-body text-body-lg text-muted max-w-sm leading-relaxed">
              Experience the nostalgia of analog film aesthetics combined with modern digital convenience. Create editorial-quality portraits right from your device.
            </p>

            {/* CTA Button */}
            <button
              onClick={onNext}
              className="mt-4 bg-accent text-white px-8 py-4 rounded font-body text-label-caps uppercase tracking-eyebrow btn-hover-smooth hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg inline-flex items-center gap-2 active:scale-95"
            >
              <span>Mulai Sesi Foto</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Right Column — Editorial Visual */}
          <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 relative">
            {/* Asymmetric depth block */}
            <div className="absolute -top-6 -right-6 w-full h-full bg-surface border border-line z-0 hidden md:block" />

            {/* Editorial Frame */}
            <div className="editorial-frame z-10 shadow-sm relative">
              <img
                className="w-full h-auto object-cover aspect-[4/5] md:aspect-auto"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw5qTXt7jGYI88G9Y6kzP73ASAnIbCue7WtTrrgmfBlNvZr34dfPsZDK4_U5UIjrsv2QeeQz2P-vgyS2l-tXWP5lgFRgIQvXJISbvS_K5FiW74qE0GDNC9bFz9tl3HtHvsD_igIKZFYfBG44Htf-2A3tUNnBxLBYPaercGLAJ2e7Zm8tRCuSonGXkXsuEoOhknsqdVpCiKpszA4mCiBPrFIdw0HKx8fphF0tDk2kPowD_r-3P20cueZo9VlUpbq4aTt_pmRkQeWzkA"
                alt="Minimalist studio setup with analog camera and botanical elements"
              />
              {/* Contact sheet label */}
              <div className="absolute bottom-5 right-5 bg-surface-bright/90 backdrop-blur-sm px-3 py-1.5 border border-line">
                <span className="font-body text-[10px] text-muted tracking-[0.15em] uppercase">Frame 01 / 36</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom breathing space */}
      <div className="h-16 md:h-24 shrink-0" />
    </div>
  );
}
