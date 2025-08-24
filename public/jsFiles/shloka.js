
    // Tab functionality
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.addEventListener("click", () => {
          document.querySelectorAll(".tab-button").forEach((btn) => {
            btn.classList.remove("active");
          });
          document.querySelectorAll(".tab-content").forEach((content) => {
            content.classList.remove("active");
          });

          button.classList.add("active");
          const tabId = button.getAttribute("data-tab");
          document.getElementById(tabId + "-content").classList.add("active");
        });
    });

    // Focus mode toggle
    const focusModeToggle = document.getElementById("focusModeToggle");
    focusModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("focus-mode");
    });

    function navigateToShloka(shlokaRef) {
        let chapter, verse;
        
        if (shlokaRef.includes('/')) {
            [chapter, verse] = shlokaRef.split('/');
        } else {
            console.error('Unexpected shlokaRef format:', shlokaRef);
            return;
        }
        
        window.location.href = '/library/bg/' + chapter + '/' + verse;
    }

    // Handle browser back/forward navigation
    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.shlokaRef) {
            const shlokaRef = event.state.shlokaRef;
            const [chapter, verse] = shlokaRef.split('/');
            window.location.href = '/library/bg/' + chapter + '/' + verse;
        }
    });
  