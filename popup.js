document.addEventListener("DOMContentLoaded", () => {
    const adCountElem = document.getElementById("adCount");
    const errorCountElem = document.getElementById("errorCount");
    const resetButton = document.getElementById("reset");

    const updateStats = () => {
        chrome.runtime.sendMessage({ action: "getStats" }, (data) => {
            if (chrome.runtime.lastError) {
                console.error("Error retrieving stats:", chrome.runtime.lastError);
                return;
            }
            adCountElem.textContent = data.adBlockCount || 0;
            errorCountElem.textContent = data.errorCount || 0;
        });
    };

    resetButton.addEventListener("click", () => {
        chrome.storage.local.set({ adBlockCount: 0, errorCount: 0 }, updateStats);
    });

    updateStats();
});
