function drawImageCover(ctx, img, x, y, w, h) {
  // Calculate aspect ratios
  const imgRatio = img.width / img.height;
  const slotRatio = w / h;

  let renderWidth, renderHeight, renderX, renderY;

  if (imgRatio > slotRatio) {
    // Image is wider than slot (crop sides)
    renderHeight = img.height;
    renderWidth = img.height * slotRatio;
    renderX = (img.width - renderWidth) / 2;
    renderY = 0;
  } else {
    // Image is taller than slot (crop top/bottom)
    renderWidth = img.width;
    renderHeight = img.width / slotRatio;
    renderX = 0;
    renderY = (img.height - renderHeight) / 2;
  }

  ctx.drawImage(img, renderX, renderY, renderWidth, renderHeight, x, y, w, h);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function renderTemplate(template, photoDataUrls, filter = 'none') {
  const canvas = document.createElement('canvas');
  canvas.width = template.width;
  canvas.height = template.height;
  const ctx = canvas.getContext('2d');

  // 1. Background
  if (typeof template.background === 'string' && template.background.startsWith('#')) {
    ctx.fillStyle = template.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (template.background) {
    const bgImg = await loadImage(template.background);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  }

  // 2. Border (optional for simple templates)
  if (template.borderWidth && template.borderColor) {
    ctx.strokeStyle = template.borderColor;
    ctx.lineWidth = template.borderWidth;
    ctx.strokeRect(
      template.borderWidth / 2, 
      template.borderWidth / 2, 
      canvas.width - template.borderWidth, 
      canvas.height - template.borderWidth
    );
  }

  // Apply filter for photos
  ctx.filter = filter;

  // 3. Draw photos into slots using object-fit: cover logic
  for (let i = 0; i < template.slots.length; i++) {
    const slot = template.slots[i];
    if (i < photoDataUrls.length && photoDataUrls[i]) {
      const photoImg = await loadImage(photoDataUrls[i]);
      drawImageCover(ctx, photoImg, slot.x, slot.y, slot.width, slot.height);
    }
  }

  // Reset filter for overlay
  ctx.filter = 'none';

  // 4. Overlay / Frame
  if (template.overlay) {
    const overlayImg = await loadImage(template.overlay);
    ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
  }

  // Convert final composition to data URL
  return canvas.toDataURL('image/png', 1.0);
}
