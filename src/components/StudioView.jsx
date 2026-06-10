import React, { useState, useRef } from 'react';
import Header from './Header';
import CameraView from './CameraView';
import CountdownTimer from './CountdownTimer';
import { captureVideoFrame } from '../engine/capture';
import { renderTemplate } from '../engine/compositor';
import { simpleTemplate } from '../templates/simple';

export default function StudioView({ onNext, onBack }) {
  const [photos, setPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filter, setFilter] = useState('none');

  const videoRef = useRef(null);
  const maxSlots = simpleTemplate.slots.length;
  const isDone = photos.length === maxSlots;

  const startSession = () => {
    if (isCapturing || isDone) return;
    setIsCapturing(true);
    setPhotos([]);
    setCountdown(3);
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const dataUrl = captureVideoFrame(videoRef.current);
      if (dataUrl) {
        setPhotos(prev => {
          const newPhotos = [...prev, dataUrl];
          if (newPhotos.length < maxSlots) {
            setCountdown(3);
          } else {
            setIsCapturing(false);
            setCountdown(null);
          }
          return newPhotos;
        });
      }
    }
  };

  const handleRetake = () => {
    setPhotos([]);
    setIsCapturing(false);
    setCountdown(null);
  };

  const handleProcess = async () => {
    if (photos.length !== maxSlots) return;
    setIsProcessing(true);
    try {
      const finalImage = await renderTemplate(simpleTemplate, photos, filter);
      onNext(finalImage);
    } catch (error) {
      console.error('Failed to process template:', error);
      setIsProcessing(false);
    }
  };

  const filters = [
    { id: 'none', label: 'Normal' },
    { id: 'grayscale(100%)', label: 'Grayscale' },
    { id: 'sepia(100%)', label: 'Sepia' },
  ];

  return (
    <div className="bg-bg text-ink font-body h-screen flex flex-col overflow-hidden">
      <Header stepText="Langkah 2 dari 3" onBack={!isCapturing ? onBack : undefined} />

      <main className="flex-grow flex flex-col md:flex-row min-h-0 overflow-hidden">

        {/* ── Left: Camera & Controls ── */}
        <section className="flex-grow flex flex-col items-center justify-start min-h-0 bg-surface-container-lowest overflow-y-auto md:overflow-hidden px-4 md:px-0">

          {/* Camera Viewport — direct strip-shaped preview */}
          <div className="relative w-full max-w-[92vw] sm:max-w-[520px] md:max-w-[420px] lg:max-w-[520px] aspect-[4/5] md:aspect-[1/3] max-h-[86vh] m-2 md:m-6 rounded-lg overflow-hidden border border-line/30 mx-auto bg-surface">
            <CameraView
              ref={videoRef}
              className="absolute inset-0"
              style={{ filter: filter !== 'none' ? filter : undefined }}
            />

            {/* Countdown Overlay */}
            {countdown !== null && (
              <CountdownTimer key={photos.length} seconds={countdown} onComplete={handleCapture} />
            )}
          </div>

          {/* Controls Bar */}
          <div className="shrink-0 px-4 md:px-8 pb-4 md:pb-6 pt-2 flex flex-col items-center gap-3 w-full max-w-[92vw] sm:max-w-[520px] md:max-w-[420px] lg:max-w-[520px] mx-auto">

            {/* Shot Counter + Filters + ISO */}
            <div className="flex flex-col md:flex-row w-full justify-between items-center gap-3 md:gap-0">
              <div className="w-full md:w-auto text-center md:text-left">
                <span className="font-display text-headline-md text-ink leading-none">
                  Shot {Math.min(photos.length + 1, maxSlots)} / {maxSlots}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-center md:gap-6">
                {filters.map(f => (
                  <button
                    key={f.id}
                    onClick={() => !isCapturing && setFilter(f.id)}
                    disabled={isCapturing}
                    className={`font-body text-label-caps uppercase tracking-eyebrow pb-0.5 transition-colors duration-300 disabled:opacity-40 ${
                      filter === f.id
                        ? 'text-ink border-b border-ink'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-28 flex justify-center md:justify-end">
                <span className="font-body text-label-caps text-muted uppercase tracking-eyebrow">ISO 400</span>
              </div>
            </div>

            {/* Shutter or Process Button */}
            {!isCapturing && !isDone && (
              <div className="flex justify-center items-center py-2">
                <button onClick={startSession} className="relative group outline-none focus:outline-none">
                  <div className="absolute inset-[-10px] rounded-full border border-accent/30 transition-transform duration-300 group-hover:scale-110 group-active:scale-95" />
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-accent rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 group-active:scale-90 animate-shutter-pulse">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-transparent border-[3px] border-surface-bright rounded-full opacity-90" />
                  </div>
                </button>
              </div>
            )}

            {isDone && (
              <div className="flex justify-center items-center py-2">
                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="bg-accent text-white font-body text-label-caps uppercase tracking-eyebrow px-10 py-3.5 rounded btn-hover-smooth hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2 active:scale-95"
                >
                  {isProcessing ? 'Memproses...' : 'Lanjutkan'}
                  {!isProcessing && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                </button>
              </div>
            )}

            {/* Thumbnail Row + Mobile Strip Preview */}
            <div className="flex flex-col gap-6 items-center w-full">
              {/* Desktop Thumbnails */}
              <div className="flex gap-3 items-start">
                {Array.from({ length: maxSlots }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className={`w-14 h-[70px] md:w-16 md:h-20 overflow-hidden rounded-sm flex items-center justify-center transition-all duration-300 ${
                      photos[i]
                        ? 'bg-surface border border-line/50 shadow-sm'
                        : 'bg-surface-container border border-dashed border-line'
                    }`}>
                      {photos[i] ? (
                        <img
                          src={photos[i]}
                          alt={`Shot ${i + 1}`}
                          className="w-full h-full object-cover"
                          style={{ filter: filter !== 'none' ? filter : undefined }}
                        />
                      ) : (
                        <span className="font-body text-label-caps text-muted/60">{i + 1}</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Retake button beside thumbnails when done */}
                {isDone && (
                  <button
                    onClick={handleRetake}
                    className="self-center ml-2 font-body text-[10px] text-muted hover:text-ink flex items-center gap-1 transition-colors duration-300 whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-[14px]">refresh</span>
                    Retake
                  </button>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
