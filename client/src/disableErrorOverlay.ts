// This file disables the runtime error overlay and handles unhandled errors
if (typeof window !== 'undefined') {
  // Disable the error overlay
  window.addEventListener('error', (e) => {
    if (e && e.target && (e.target as HTMLElement).id === 'vite-error-overlay') {
      const overlay = document.getElementById('vite-error-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    console.warn('Unhandled promise rejection:', event.reason);
  });
}