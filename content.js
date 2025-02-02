const removeAds = () => {
  // Menghapus elemen iklan overlay dan modul iklan
  const adModules = document.querySelectorAll(".ytp-ad-module, .ytp-ad-player-overlay, .ytp-ad-overlay-container, .ytp-ad-preview-container");
  adModules.forEach(ad => {
      ad.style.display = "none";
  });

  // Menghapus iframe yang berasal dari server iklan
  const adFrames = document.querySelectorAll("iframe[src*='doubleclick.net'], iframe[src*='googlesyndication.com'], iframe[src*='youtube.com/ads'], iframe[src*='ytimg.com/vi/'], iframe[src*='youtube.com/embed/']");
  adFrames.forEach(ad => {
      ad.remove();
  });

  // Menghapus elemen video iklan dari DOM
  const adVideos = document.querySelectorAll("video[src*='ads.youtube.com'], video[src*='googlevideo.com/videoplayback?ad_interstitial=true']");
  adVideos.forEach(ad => {
      ad.remove();
  });

  // Menghapus tombol iklan yang bisa di-skip
  const skipButton = document.querySelector(".ytp-ad-skip-button");
  if (skipButton) {
      skipButton.click();
  }

  // Pastikan video utama tetap terlihat dan tidak hilang
  const video = document.querySelector("video.html5-main-video");
  if (video) {
      video.style.visibility = "visible";
      video.style.opacity = "1";
  }

  // Memastikan thumbnail tetap muncul dengan benar
  const thumbnails = document.querySelectorAll("ytd-thumbnail img");
  thumbnails.forEach((thumbnail) => {
      thumbnail.style.visibility = "visible";
      thumbnail.style.opacity = "1";
  });
};

// Observasi perubahan di halaman YouTube untuk iklan baru yang dimuat
const observer = new MutationObserver(removeAds);
observer.observe(document.body, { childList: true, subtree: true });

// Jalankan fungsi removeAds setiap detik untuk menghapus iklan yang muncul
setInterval(removeAds, 1000);
