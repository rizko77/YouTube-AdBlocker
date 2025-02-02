// Fungsi untuk memblokir iklan
function blockAds() {
  const selectors = [
    '.ad-showing', // Iklan video
    '.video-ads', // Iklan video
    '.ytp-ad-module', // Iklan video
    '.ytp-ad-overlay-container', // Iklan overlay
    '.ytp-ad-text-overlay', // Iklan teks overlay
    '.ytp-ad-image', // Iklan gambar
    '.ytp-ad-progress', // Progress bar iklan
    '.ytp-ad-message-container', // Pesan iklan
    '.ytp-ad-preview-container', // Preview iklan
    '.ytp-ad-skip-button-container', // Container tombol skip
  ];

  selectors.forEach(selector => {
    const ads = document.querySelectorAll(selector);
    ads.forEach(ad => {
      ad.remove(); // Hapus elemen iklan
    });
  });

  // Skip iklan video setelah 5 detik
  const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern');
  if (skipButton) {
    skipButton.click();
  }

  // Hentikan video iklan jika masih diputar
  const videoPlayer = document.querySelector('video');
  if (videoPlayer && videoPlayer.classList.contains('ad-showing')) {
    videoPlayer.currentTime = videoPlayer.duration; // Langsung skip ke akhir iklan
  }
}

// Jalankan fungsi blockAds setiap 500ms
setInterval(blockAds, 500);