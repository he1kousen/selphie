import React from 'react';
import Header from './Header';
import { downloadDataUrl } from '../engine/exporter';

export default function ResultView({ finalImage, onRestart }) {
  const handleDownload = () => {
    if (finalImage) {
      downloadDataUrl(finalImage, 'photo-strip.png');
    }
  };

  // Generate date stamp
  const now = new Date();
  const dateStamp = `S-01 • ${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getFullYear()).slice(-2)}`;

  return (
    <div className="bg-bg text-ink min-h-screen flex flex-col font-body overflow-x-hidden">
      <Header stepText="Langkah 3 dari 3" onBack={onRestart} />

      <main className="flex-grow flex flex-col items-center px-margin-mobile md:px-margin-desktop">
        {/* Wordmark (reference shows it between header and heading) */}
        <div className="pt-10 md:pt-16 pb-4 md:pb-6">
          <span className="font-display text-headline-lg-mobile text-ink italic tracking-tight select-none">
            Studio
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-headline-md md:text-headline-lg text-ink mb-10 md:mb-14 text-center">
          Sesi Selesai
        </h1>

        {/* Content: Strip + Actions — asymmetric grid */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-start mb-16">

          {/* Left — Photo Strip */}
          <div className="md:col-span-5 md:col-start-1 flex flex-col items-center">
            <div className="editorial-frame shadow-sm w-full max-w-[280px]">
              {finalImage ? (
                <img
                  src={finalImage}
                  alt="Final Photo Strip"
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="aspect-[1/3] w-full bg-surface-container flex items-center justify-center border border-dashed border-line">
                  <span className="text-muted font-body text-body-md">Image not found</span>
                </div>
              )}
            </div>
            {/* Contact sheet date stamp */}
            <p className="mt-4 font-body text-[11px] text-muted tracking-[0.12em]">
              {dateStamp}
            </p>
          </div>

          {/* Right — Actions & Info */}
          <div className="md:col-span-5 md:col-start-7 flex flex-col gap-3 mt-10 md:mt-0 md:pt-[30%]">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full py-4 px-8 bg-accent text-white rounded font-body text-label-caps uppercase tracking-eyebrow btn-hover-smooth hover:opacity-90 active:scale-[0.98] inline-flex justify-center items-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Download
            </button>

            {/* New Session Button */}
            <button
              onClick={onRestart}
              className="w-full py-4 px-8 border border-line text-ink rounded font-body text-label-caps uppercase tracking-eyebrow btn-hover-smooth hover:bg-line/20 active:scale-[0.98] inline-flex justify-center items-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">photo_camera</span>
              Mulai Sesi Baru
            </button>

            {/* Privacy Note */}
            <p className="mt-6 font-body text-[13px] text-muted leading-relaxed">
              Privasi terjamin. Semua proses berjalan di browser Anda. Tidak ada foto yang diunggah atau disimpan di server.
            </p>
          </div>
        </div>
      </main>

      {/* Bottom divider */}
      <div className="border-t border-line mx-margin-mobile md:mx-margin-desktop mt-auto" />
      <div className="h-6" />
    </div>
  );
}
