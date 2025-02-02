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
    '#player-ads', // Container iklan di player
    '.ytd-display-ad-renderer', // Iklan display
    '.ytd-in-feed-ad-layout-renderer', // Iklan di feed
  ];

  selectors.forEach(selector => {
    const ads = document.querySelectorAll(selector);
    ads.forEach(ad => {
      console.log("Menghapus elemen iklan:", ad); // Log elemen yang dihapus
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

// Fungsi untuk memastikan video utama tetap diputar
function ensureMainVideoPlays() {
  const videoPlayer = document.querySelector('video');
  if (videoPlayer && !videoPlayer.classList.contains('ad-showing')) {
    if (videoPlayer.paused) {
      videoPlayer.play(); // Pastikan video utama diputar
    }
  }
}

// Gunakan MutationObserver untuk memantau perubahan DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      blockAds(); // Panggil fungsi blockAds saat ada perubahan DOM
      ensureMainVideoPlays(); // Pastikan video utama tetap diputar
    }
  });
});

// Mulai mengamati perubahan di seluruh dokumen
observer.observe(document.body, { childList: true, subtree: true });

// Jalankan blockAds secara berkala untuk memastikan tidak ada iklan yang terlewat
setInterval(blockAds, 1000);