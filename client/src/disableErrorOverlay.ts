// This file disables the runtime error overlay
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    if (e && e.target && (e.target as HTMLElement).id === 'vite-error-overlay') {
      const overlay = document.getElementById('vite-error-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    }
  });
}
