import Header from './Header';
import PhotoCarousel from './PhotoCarousel';

export default function LandingView({ onNext }) {
  return (
    <div className="bg-bg text-ink font-body min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Header — landing variant (large wordmark, full border) */}
      <Header variant="landing" />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-container mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex items-center justify-center">
        <div className="relative w-full max-w-3xl py-16 md:py-24">
          <div className="relative bg-bg/95 border border-line shadow-sm rounded-[28px] p-8 md:p-12 backdrop-blur-sm">
            <h1 className="font-display text-headline-lg-mobile md:text-headline-lg text-ink leading-tight max-w-2xl mx-auto text-center">
              Say cheese, the <span className="italic text-accent">editorial</span> way
            </h1>

            {/* Carousel */}
            <div className="my-8 md:my-10">
              <PhotoCarousel />
            </div>

            <p className="mt-6 font-body text-body-lg text-muted max-w-xl mx-auto leading-relaxed text-center">
              Experience the nostalgia of analog film aesthetics combined with modern digital convenience. Create editorial-quality portraits right from your device.
            </p>

            <div className="mt-10 flex justify-center">
              <button
                onClick={onNext}
                className="bg-accent text-white px-8 py-4 rounded font-body text-label-caps uppercase tracking-eyebrow btn-hover-smooth hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg inline-flex items-center gap-2 active:scale-95"
              >
                <span>Mulai Sesi Foto</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom breathing space */}
      <div className="h-16 md:h-24 shrink-0" />
    </div>
  );
}
