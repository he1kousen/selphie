import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useCamera } from '../hooks/useCamera';

const CameraView = forwardRef(({ className, style }, ref) => {
  const { stream, error, isLoading, retry } = useCamera();
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => videoRef.current);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-surface border border-line p-8 text-center ${className || ''}`}>
        <span className="material-symbols-outlined text-4xl text-muted mb-4">videocam_off</span>
        <h3 className="font-display text-ink text-headline-md mb-2">Akses Kamera Bermasalah</h3>
        <p className="font-body text-body-md text-muted mb-6 max-w-sm">{error}</p>
        <button
          onClick={retry}
          className="border border-line text-ink font-body text-label-caps uppercase tracking-eyebrow px-6 py-2 rounded btn-hover-smooth hover:bg-line/30"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-ink/95 ${className || ''}`}>
        <div className="w-8 h-8 rounded-full border-2 border-line border-t-accent animate-spin" />
        <p className="font-body text-label-caps text-line/80 mt-4 uppercase tracking-eyebrow">Memulai Kamera...</p>
      </div>
    );
  }

  return (
    <div className={`relative bg-ink/95 overflow-hidden ${className || ''}`}>
      {/* Viewfinder Grid Guides (rule of thirds) */}
      <div className="absolute inset-4 md:inset-6 border border-white/10 pointer-events-none z-10">
        <div className="absolute top-1/3 left-0 w-full h-px bg-white/[0.07]" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-white/[0.07]" />
        <div className="absolute top-0 left-1/3 h-full w-px bg-white/[0.07]" />
        <div className="absolute top-0 left-2/3 h-full w-px bg-white/[0.07]" />
      </div>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={style}
        className="w-full h-full object-cover transform -scale-x-100"
      />
    </div>
  );
});

export default CameraView;
