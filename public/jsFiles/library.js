const libraryData = {
          en: {
            sacredTexts: [
              {
                title: "Bhagavad Gita",
                author: "His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada",
                description:
                  "The timeless conversation between Lord Krishna and Arjuna, presenting the science of self-realization and the path to spiritual enlightenment.",
                coverImage: "/https://vscassets.pages.dev/js/bgCOver3.jpg",
                link: "/library/category",
                altName:"gita-cover"
              },
            ],
            shlokaCategories: [
              {
                name: "Peace of Mind",
                description:
                  "Discover verses that bring inner calm and tranquility, helping you navigate life's challenges with equanimity.",
                icon: "🕊️",
                link: "/library/category",
              },
              {
                name: "Stress Relief",
                description:
                  "Powerful shlokas to alleviate anxiety and stress, providing spiritual solutions to modern problems.",
                icon: "🧘",
                link: "/library/category",
              },
              {
                name: "Success & Prosperity",
                description:
                  "Verses that guide toward righteous success and abundance while maintaining spiritual values.",
                icon: "🌟",
                link: "/library/category",
              },
              {
                name: "Relationships",
                description:
                  "Wisdom for harmonious relationships with family, friends, and society at large.",
                icon: "💞",
                link: "/library/category",
              },
              {
                name: "Health & Well-being",
                description:
                  "Ancient verses promoting physical, mental, and spiritual health.",
                icon: "💪",
                link: "/library/category",
              },
              {
                name: "Wisdom & Knowledge",
                description:
                  "Shlokas that illuminate the path to true knowledge and understanding.",
                icon: "📚",
                link: "/library/category",
              },
            ],
          },
          hi: {
            sacredTexts: [
              {
                title: "भगवद गीता",
                author: "श्रील प्रभुपाद",
                description:
                  "भगवान कृष्ण और अर्जुन के बीच कालातीत संवाद, आत्म-साक्षात्कार का विज्ञान और आध्यात्मिक ज्ञान का मार्ग प्रस्तुत करता है।",
                coverImage: "/https://vscassets.pages.dev/js/gitaCover.jpg",
                link: "/library/category",
              },
            ],
            shlokaCategories: [
              {
                name: "मन की शांति",
                description:
                  "ऐसे छंदों की खोज करें जो आंतरिक शांति और सुकून लाते हैं, जिससे आपको जीवन की चुनौतियों का समान भाव से सामना करने में मदद मिलती है।",
                icon: "🕊️",
                link: "/library/category",
              },
              {
                name: "तनाव से मुक्ति",
                description:
                  "चिंता और तनाव को कम करने के लिए शक्तिशाली श्लोक, आधुनिक समस्याओं के आध्यात्मिक समाधान प्रदान करते हैं।",
                icon: "🧘",
                link: "/library/category",
              },
              {
                name: "सफलता और समृद्धि",
                description:
                  "ऐसे छंद जो आध्यात्मिक मूल्यों को बनाए रखते हुए धार्मिक सफलता और प्रचुरता की ओर मार्गदर्शन करते हैं।",
                icon: "🌟",
                link: "/library/category",
              },
              {
                name: "संबंध",
                description:
                  "परिवार, दोस्तों और बड़े पैमाने पर समाज के साथ सामंजस्यपूर्ण संबंधों के लिए ज्ञान।",
                icon: "💞",
                link: "/library/category",
              },
              {
                name: "स्वास्थ्य और कल्याण",
                description:
                  "शारीरिक, मानसिक और आध्यात्मिक स्वास्थ्य को बढ़ावा देने वाले प्राचीन छंद।",
                icon: "💪",
                link: "/library/category",
              },
              {
                name: "ज्ञान और विद्या",
                description:
                  "श्लोक जो सच्चे ज्ञान और समझ के मार्ग को प्रकाशित करते हैं।",
                icon: "📚",
                link: "/library/category",
              },
            ],
          },
        };

        function loadContent(lang = "en") {
          const booksGrid = document.getElementById("books-grid");
          const categoriesList = document.getElementById("categories-list");

          booksGrid.innerHTML = "";
          categoriesList.innerHTML = "";

          const currentLangData = libraryData[lang];

          // Sacred Texts
          currentLangData.sacredTexts.forEach((book) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookCard.onclick = () => (window.location.href = book.link);

            const img = document.createElement("img");
            img.src = book.coverImage;
            img.alt = book.title;
            img.classList.add("book-cover");
            img.classList.add(book.altName);

            const bookInfo = document.createElement("div");
            bookInfo.classList.add("book-info");

            const title = document.createElement("h3");
            title.classList.add("book-title");
            title.textContent = book.title;

            const author = document.createElement("p");
            author.classList.add("book-author");
            author.textContent = book.author;

            const description = document.createElement("p");
            description.classList.add("book-description");
            description.textContent = book.description;

            bookInfo.appendChild(title);
            bookInfo.appendChild(author);
            bookInfo.appendChild(description);
            bookCard.appendChild(img);
            bookCard.appendChild(bookInfo);
            booksGrid.appendChild(bookCard);
          });

          // Add bilingual "Coming Soon" card
          const comingSoonCard = document.createElement("div");
          comingSoonCard.classList.add("book-card");

          const placeholderDiv = document.createElement("div");
          placeholderDiv.className = "book-cover";

          const artworkText = document.createElement("span");
          artworkText.className = "coming-soon";
          artworkText.dataset.langEn = "ARTWORK Coming Soon";
          artworkText.dataset.langHi = "कलाकृति जल्द ही आ रही है";
          placeholderDiv.appendChild(artworkText);

          const bookInfo = document.createElement("div");
          bookInfo.classList.add("book-info");

          const title = document.createElement("h3");
          title.classList.add("book-title");
          title.dataset.langEn = "More texts coming soon";
          title.dataset.langHi = "जल्द ही और ग्रंथ जोड़े जाएंगे";

          const description = document.createElement("p");
          description.classList.add("book-description");
          description.dataset.langEn =
            "We're continuously adding more sacred texts to our library. Check back soon for updates!";
          description.dataset.langHi =
            "हम लगातार और पवित्र ग्रंथ अपनी लाइब्रेरी में जोड़ रहे हैं। जल्द ही और अपडेट्स देखें!";

          bookInfo.appendChild(title);
          bookInfo.appendChild(description);
          comingSoonCard.appendChild(placeholderDiv);
          comingSoonCard.appendChild(bookInfo);
          booksGrid.appendChild(comingSoonCard);

          // Shloka Categories
          currentLangData.shlokaCategories.forEach((category) => {
            const categoryCard = document.createElement("div");
            categoryCard.classList.add("category-card");
            categoryCard.onclick = () => (window.location.href = category.link);

            const title = document.createElement("h3");
            title.classList.add("category-title");
            title.innerHTML = `<span class="category-icon">${category.icon}</span>${category.name}`;

            const description = document.createElement("p");
            description.classList.add("category-description");
            description.textContent = category.description;

            categoryCard.appendChild(title);
            categoryCard.appendChild(description);
            categoriesList.appendChild(categoryCard);
          });

          // Update bilingual texts
          document.querySelectorAll("[data-lang-en]").forEach((el) => {
            el.textContent = lang === "en" ? el.dataset.langEn : el.dataset.langHi;
          });
        }

        // Language toggle
        function setupLanguageToggle() {
          document.querySelectorAll(".language-btn").forEach((btn) => {
            btn.addEventListener("click", function () {
              document.querySelectorAll(".language-btn").forEach((b) =>
                b.classList.remove("active")
              );
              this.classList.add("active");
              loadContent(this.dataset.lang);
            });
          });
        }

        // Use DOMContentLoaded to ensure the HTML elements are loaded before running the script
        document.addEventListener("DOMContentLoaded", function () {
          loadContent(); // Default load
          setupLanguageToggle();
        });