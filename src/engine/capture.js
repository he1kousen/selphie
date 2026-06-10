export function captureVideoFrame(videoElement) {
  if (!videoElement) return null;

  const canvas = document.createElement('canvas');
  // Use natural video dimensions for highest quality from stream
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  if (canvas.width === 0 || canvas.height === 0) {
    return null; // Video not ready
  }

  const ctx = canvas.getContext('2d');
  
  // Important: flip horizontally because the video preview is mirrored
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Return the image as a data URL
  return canvas.toDataURL('image/jpeg', 0.92);
}
