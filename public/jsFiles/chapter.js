(function() {
  const scriptTag = document.currentScript;

  const chapterNumber = scriptTag.dataset.chapterNumber;
  const englishTitle = scriptTag.dataset.englishTitle;
  const hindiTitle = scriptTag.dataset.hindiTitle;

  // Function to set the chapter title based on active tab
  function setChapterTitle(lang) {
    const titleElement = document.getElementById('chapterTitle');
    if (lang === 'english') {
      titleElement.textContent = `Chapter ${chapterNumber}: ${englishTitle}`;
    } else {
      titleElement.textContent = `अध्याय ${chapterNumber}: ${hindiTitle}`;
    }
  }

  // Tab functionality
  function showChapterContent(tabId) {
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.classList.remove("active");
    });
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });

    const activeTabButton = document.querySelector(`[data-tab="${tabId}"]`);
    activeTabButton.classList.add("active");
    document.getElementById(tabId + "-content").classList.add("active");
    setChapterTitle(tabId);
  }

  // Focus mode toggle
  const focusModeToggle = document.getElementById("focusModeToggle");
  focusModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("focus-mode");
  });

  // Navigation function
  function navigateToChapter(chapterUrl) {
    window.location.href = chapterUrl;
  }

  // Initialize with English content active
  document.addEventListener('DOMContentLoaded', () => {
    showChapterContent('english');
  });
})();
