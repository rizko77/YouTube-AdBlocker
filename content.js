const removeAds = () => {
  // Menghapus elemen iklan overlay, banner, dan module iklan
  const adModules = document.querySelectorAll(".ytp-ad-module, .ytp-ad-player-overlay, .ytp-ad-overlay-container, .ytp-ad-preview-container");
  adModules.forEach(ad => {
      ad.style.display = "none";
  });

  // Menghapus iframe iklan dari sumber seperti doubleclick dan googlesyndication
  const adFrames = document.querySelectorAll("iframe[src*='doubleclick.net'], iframe[src*='googlesyndication.com']");
  adFrames.forEach(ad => {
      ad.remove();
  });

  // Pastikan video utama tetap terlihat dan tidak hilang
  const video = document.querySelector("video.html5-main-video");
  if (video) {
      video.style.visibility = "visible";
      video.style.opacity = "1";
  }

  // Otomatis klik tombol skip iklan jika ada
  const skipButton = document.querySelector(".ytp-ad-skip-button");
  if (skipButton) {
      skipButton.click();
  }
};

// Menggunakan MutationObserver untuk memantau perubahan di halaman YouTube
const observer = new MutationObserver(removeAds);
observer.observe(document.body, { childList: true, subtree: true });

// Jalankan fungsi removeAds setiap 1 detik untuk memeriksa iklan baru
setInterval(removeAds, 1000);
