import { useState, useEffect, useRef, useCallback } from 'react';
import { startCamera, stopCamera } from '../engine/camera';

export function useCamera() {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const streamRef = useRef(null);

  const initializeCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newStream = await startCamera();
      setStream(newStream);
      streamRef.current = newStream;
    } catch (err) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Izin kamera ditolak. Mohon izinkan akses kamera di pengaturan browser Anda.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('Kamera tidak ditemukan. Pastikan perangkat Anda terhubung dengan kamera.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('Kamera sedang digunakan oleh aplikasi lain atau terjadi masalah hardware.');
      } else if (err.message === 'NotSupportedError') {
        setError('Browser Anda tidak mendukung akses kamera.');
      } else {
        setError('Terjadi kesalahan saat mengakses kamera.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeCamera();

    return () => {
      if (streamRef.current) {
        stopCamera(streamRef.current);
        streamRef.current = null;
      }
    };
  }, [initializeCamera]);

  return { stream, error, isLoading, retry: initializeCamera };
}
