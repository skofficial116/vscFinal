import { ApiError } from "../utils/ApiError.js";

import library from "./shloka2.js";


const getBGShlokaHTML = (req, res) => {
  const { chapter, shloka } = req.params;

  if (!chapter) {
    throw new ApiError(404, "Bhagvad Gita's Chapter Number missing!");
  }

  if (!shloka) {
    throw new ApiError(404, "Bhagvad Gita's Shloka Number missing!");
  }

  if (!library || typeof library !== 'object') {
    throw new ApiError(500, "Internal server error: library not found");
  } else if (!library.hasOwnProperty("bg")) {
      throw new ApiError(404, "Bhagavad Gita not found in library");
  } else if (!library["bg"].hasOwnProperty(chapter)) {
      throw new ApiError(404, `Chapter ${chapter} not found in Bhagavad Gita`);
  } else if (!library["bg"][chapter]["verses"].hasOwnProperty(shloka)) {
      throw new ApiError(404, `Shloka number ${shloka} not found in chapter ${chapter}`);
  }

  const data = library["bg"][chapter]["verses"][shloka];
  const englishTranslation = data.english;
  const hindiTranslation = data.hindi;

  const prevShloka = data.prev || null;
  const nextShloka = data.next || null;

  // Generate the complete HTML
  const html = generateShlokaHTML(chapter, shloka, englishTranslation, hindiTranslation, prevShloka, nextShloka);
  
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
};

const generateShlokaHTML = (chapter, shloka, englishData, hindiData, prevShloka, nextShloka) => {
  
  // Handle purport arrays
  const englishPurport = Array.isArray(englishData.purport) 
    ? englishData.purport.join('<br><br>') 
    : englishData.purport;
  
  const hindiPurport = Array.isArray(hindiData.purport) 
    ? hindiData.purport.join('<br><br>') 
    : hindiData.purport;

  // Create navigation URLs properly
  const createNavUrl = (navData) => {
    if (!navData) return null;
    
    // Handle different navigation data structures
    if (navData.chapter && navData.shloka) {
      return `${navData.chapter}/${navData.shloka}`;
    } else if (typeof navData === 'string') {
      return navData;
    }
    return null;
  };

  const prevUrl = createNavUrl(prevShloka);
  const nextUrl = createNavUrl(nextShloka);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bhagavad Gita - Chapter ${chapter}, Verse ${shloka}</title>
    <link rel="stylesheet" href="/shloka.css" />

</head>
<body>
    <div id="wrap">
        <div id="header">
            <h1>
                <img src="/media/title_left.gif" alt="" />Vedic Science Club<img
                    src="/media/title_right.gif"
                    alt=""
                />
            </h1>
            <h2>Unveiling ancient scientific wisdom</h2>
            <div id="nav">
                <ul>
                    
                    <li class="myNavButton">
                        <a href="http://localhost:8000/library" style="color:  #c90; background-color: #630;border-radius: 4px;" >Library</a>
                    </li>
                    <li class="myNavButton"><a href="http://localhost:8000/registration">Join Us</a></li>
                    <li class="myNavButton"><a href="http://localhost:8000/signInSignUp" >Login</a></li>
                    <li class="myNavButton"><a href="http://localhost:8000/aboutUs">About Us</a></li>
                </ul>
            </div>
        </div>
        
        <div class="container">
            <div class="header">
                <h1 id="title">Bhagavad Gita</h1>
                <div class="chapter-info">
                    <a href="/library/bg/${chapter}">Chapter ${chapter}</a>, Verse ${shloka}
                </div>
            </div>
            <button class="focus-mode-toggle" id="focusModeToggle">
                Toggle Focus Mode
            </button>
            <div class="tabs">
                <button class="tab-button" data-tab="hindi">Hindi</button>
                <button class="tab-button active" data-tab="english">English</button>
            </div>
            <div class="tab-content" id="hindi-content">
                <div class="shloka-container">
                    <div class="shloka" id="shlokaHindi">${hindiData.shloka}</div>
                </div>
                <div class="synonyms" id="synonymsHindi">${hindiData.synonyms}</div>
                <div class="translation" id="translationHindi">${hindiData.translation}</div>
                <h3 class="purport-heading">तात्पर्य</h3>
                <div class="purport" id="purportHindi">${hindiPurport}</div>
                <div class="navigation-buttons" id="navigation-buttons-hindi">
                    ${prevUrl ? `<button class="nav-button prev-button" onclick="navigateToShloka('${prevUrl}')">पिछला श्लोक</button>` : '<div></div>'}
                    ${nextUrl ? `<button class="nav-button next-button" onclick="navigateToShloka('${nextUrl}')">अगला श्लोक</button>` : '<div></div>'}
                </div>
            </div>
            <div class="tab-content active" id="english-content">
                <div class="shloka-container">
                    <div class="shloka" id="shlokaEnglish">${englishData.shloka}</div>
                </div>
                <div class="synonyms" id="synonymsEnglish">${englishData.synonyms}</div>
                <div class="translation" id="translationEnglish">${englishData.translation}</div>
                <h3 class="purport-heading">Purport</h3>
                <div class="purport" id="purportEnglish">${englishPurport}</div>
                <div class="navigation-buttons" id="navigation-buttons-english">
                    ${prevUrl ? `<button class="nav-button prev-button" onclick="navigateToShloka('${prevUrl}')">Previous Verse</button>` : '<div></div>'}
                    ${nextUrl ? `<button class="nav-button next-button" onclick="navigateToShloka('${nextUrl}')">Next Verse</button>` : '<div></div>'}
                </div>
            </div>
        </div>
    </div>
    
    <script>
        ${getEmbeddedJS()}
    </script>
</body>
</html>`;
};

const getEmbeddedJS = () => {
  return `
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
  `;
};
// Function to serve HTML for a Bhagavad Gita Chapter
const getBGChapterHTML = (req, res) => {
  const { chapter } = req.params;

  if (!chapter) {
    throw new ApiError(404, "Bhagvad Gita's Chapter Number missing!");
  }

  if (!library || typeof library !== 'object') {
    throw new ApiError(500, "Internal server error: library not found");
  } else if (!library.hasOwnProperty("bg")) {
    throw new ApiError(404, "Bhagavad Gita not found in library");
  } else if (!library["bg"].hasOwnProperty(chapter)) {
    throw new ApiError(404, `Chapter ${chapter} not found in Bhagavad Gita`);
  }

  const chapterData = library["bg"][chapter];
  const html = generateChapterHTML(chapter, chapterData);

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
};

// Function to generate the complete HTML for a chapter
const generateChapterHTML = (chapterNumber, chapterData) => {
  const verses = chapterData.verses;
  const englishTitle = chapterData.titleEnglish;
  const hindiTitle = chapterData.titleHindi;
  const description = chapterData.description; // Assuming description is present

  let englishVersesHtml = '';
  let hindiVersesHtml = '';

  // Get all shloka numbers (keys) and sort them numerically, handling ranges
  const sortedShlokaNums = Object.keys(verses).sort((a, b) => {
    // Function to get the starting number for sorting (e.g., '37-38' -> 37)
    const getStartNum = (shlokaKey) => {
      return parseInt(shlokaKey.split('-')[0], 10);
    };
    return getStartNum(a) - getStartNum(b);
  });

  for (const shlokaNum of sortedShlokaNums) {
    // --- FIX START ---
    // Defensively get translations, providing empty string as fallback
    let englishTranslation = verses[shlokaNum].english?.translation;
    let hindiTranslation = verses[shlokaNum].hindi?.translation;

    // Convert "null" string or actual null/undefined to empty string
    if (englishTranslation === null || englishTranslation === undefined || englishTranslation === "null") {
        englishTranslation = '';
    }
    if (hindiTranslation === null || hindiTranslation === undefined || hindiTranslation === "null") {
        hindiTranslation = '';
    }

    const shlokaUrl = `/library/bg/${chapterNumber}/${shlokaNum}`;

    englishVersesHtml += `
      <div class="shloka-summary">
          <a href="${shlokaUrl}">
              <div class="shloka-number">Verse ${shlokaNum}</div>
              <div class="shloka-translation">${englishTranslation}</div>
          </a>
      </div>
    `;

    hindiVersesHtml += `
      <div class="shloka-summary">
          <a href="${shlokaUrl}">
              <div class="shloka-number">श्लोक ${shlokaNum}</div>
              <div class="shloka-translation">${hindiTranslation}</div>
          </a>
      </div>
    `;
  }

  // Determine previous and next chapters
  const prevChapter = chapterNumber > 1 ? parseInt(chapterNumber) - 1 : null;
  const nextChapter = chapterNumber < Object.keys(library["bg"]).length ? parseInt(chapterNumber) + 1 : null;

  const prevChapterUrl = prevChapter ? `/library/bg/${prevChapter}` : null;
  const nextChapterUrl = nextChapter ? `/library/bg/${nextChapter}` : null;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale="1.0" />
    <title>Bhagavad Gita - Chapter ${chapterNumber}</title>
    <link rel="stylesheet" href="/chapter.css" />

</head>
<body>
    <div id="wrap">
        <div id="header">
            <h1>
                <img src="/media/title_left.gif" alt="" />Vedic Science Club<img
                    src="/media/title_right.gif"
                    alt=""
                />
            </h1>
            <h2>Unveiling ancient scientific wisdom</h2>
            <div id="nav">
                <ul>
                    
                    <li class="myNavButton">
                        <a href="http://localhost:8000/library" style="color:  #c90; background-color: #630;border-radius: 4px;" >Library</a>
                    </li>
                    <li class="myNavButton"><a href="http://localhost:8000/registration">Join Us</a></li>
                    <li class="myNavButton"><a href="http://localhost:8000/signInSignUp" >Login</a></li>
                    <li class="myNavButton"><a href="http://localhost:8000/aboutUs">About Us</a></li>
                </ul>
            </div>
        </div>
        
        <div class="container">
            <div class="header">
                <h1 id="title">Bhagavad Gita</h1>
                <div class="chapter-info" id="chapterTitle"></div>
            </div>
            <button class="focus-mode-toggle" id="focusModeToggle">
                Toggle Focus Mode
            </button>
            <div class="tabs">
                <button class="tab-button" data-tab="hindi" onclick="showChapterContent('hindi')">Hindi</button>
                <button class="tab-button active" data-tab="english" onclick="showChapterContent('english')">English</button>
            </div>
            <div class="tab-content active" id="english-content">
                <h2 class="chapter-title">${englishTitle}</h2>
                <p class="chapter-description">${description}</p>
                <div class="verses-list">
                    ${englishVersesHtml}
                </div>
            </div>
            <div class="tab-content" id="hindi-content">
                <h2 class="chapter-title">${hindiTitle}</h2>
                <p class="chapter-description">${description}</p>
                <div class="verses-list">
                    ${hindiVersesHtml}
                </div>
            </div>
            <div class="chapter-navigation">
                ${prevChapterUrl ? `<button class="nav-button prev-chapter-button" onclick="navigateToChapter('${prevChapterUrl}')">Previous Chapter</button>` : '<div></div>'}
                ${nextChapterUrl ? `<button class="nav-button next-chapter-button" onclick="navigateToChapter('${nextChapterUrl}')">Next Chapter</button>` : '<div></div>'}
            </div>
        </div>
    </div>
    
    <script>
        ${getChapterEmbeddedJS(chapterNumber, englishTitle, hindiTitle)}
    </script>
</body>
</html>`;
};

const getChapterEmbeddedJS = (chapterNumber, englishTitle, hindiTitle) => {
  return `// Function to set the chapter title based on active tab
    function setChapterTitle(lang) {
        const titleElement = document.getElementById('chapterTitle');
        if (lang === 'english') {
            titleElement.textContent = 'Chapter ${chapterNumber}: ${englishTitle}';
        } else {
            titleElement.textContent = 'अध्याय ${chapterNumber}: ${hindiTitle}';
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

        const activeTabButton = document.querySelector(\`[data-tab="\${tabId}"]\`);
        activeTabButton.classList.add("active");
        document.getElementById(tabId + "-content").classList.add("active");
        setChapterTitle(tabId); // Update chapter title
    }

    // Focus mode toggle
    const focusModeToggle = document.getElementById("focusModeToggle");
    focusModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("focus-mode");
    });

    // Navigation function for chapters
    function navigateToChapter(chapterUrl) {
        window.location.href = chapterUrl;
    }

    // Initialize with English content active
    document.addEventListener('DOMContentLoaded', () => {
        showChapterContent('english');
    });  `;
};


const getBGHomeHTML = (req, res) => {
  const html = generateBGHomeHTML();
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
};


const generateBGHomeHTML = ()=>{
    return   `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bhagavad Gita As It Is - Vedic Science Club</title>
    
   <link rel="stylesheet" href="/bgHome.css" />

  </head>
  <body>
    <div id="wrap">
      <div id="header">
        <h1>
          <img src="/media/title_left.gif" alt="" />Vedic Science Club<img
            src="/media/title_right.gif"
            alt=""
          />
        </h1>
        <h2>Unveiling ancient scientific wisdom</h2>
        <div id="nav">
          <ul>
                    
                    <li class="myNavButton">
                        <a href="http://localhost:8000/library" style="color:  #c90; background-color: #630;border-radius: 4px;" >Library</a>
                    </li>
                    <li class="myNavButton"><a href="http://localhost:8000/registration">Join Us</a></li>
                    <li class="myNavButton"><a href="http://localhost:8000/signInSignUp" >Login</a></li>
                    <li class="myNavButton"><a href="http://localhost:8000/aboutUs">About Us</a></li>
                </ul>
        </div>
      </div>
      <div id="content">
        <div class="language-toggle">
          <div class="language-btn active" onclick="switchLanguage('english')">
            English
          </div>
          <div class="language-btn" onclick="switchLanguage('hindi')">
            Hindi
          </div>
        </div>

        <div id="english-content" class="language-content active">
          <div class="book-details-container">
            <br />
            <center>
              <h1 id="book-title-en" class="book-title"></h1>
              <h2 id="book-author-en" class="book-author"></h2>
            </center>
            <p id="book-description-en" class="book-description"></p>
            <h2 class="toc">Table of Contents</h2>
            <ul id="table-of-contents-en"></ul>
          </div>
        </div>

        <div id="hindi-content" class="language-content">
          <div class="book-details-container">
            <br />
            <center>
              <h1 id="book-title-hi" class="book-title"></h1>
              <h2 id="book-author-hi" class="book-author"></h2>
            </center>
            <p id="book-description-hi" class="book-description"></p>
            <h2 class="toc">विषयसूची</h2>
            <ul id="table-of-contents-hi"></ul>
          </div>
        </div>
      </div>
    </div>

    <script>
      ${getBGHomeJS()}
      </script>
  </body>
</html>
` 
}



const getBGHomeJS = () => {
  return `
const bookData = {
        english: {
            book_title: "Bhagavad Gita As It Is",
            Author: "His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada",
            Description:
                "The timeless conversation between Lord Krishna and Arjuna, presenting the science of self-realization and the path to spiritual enlightenment.",
            content: {
                Introduction:
                    "http://localhost:8000/library/bg/introduction",
                Preface: "http://localhost:8000/library/bg/preface",
                "Disciplic Succession":
                    "http://localhost:8000/library/bg/disciplic_succession",
                "Chapter One: Observing the Armies on the Battlefield of Kurukṣetra":
                    "http://localhost:8000/library/bg/1",
                "Chapter Two: Contents of the Gītā Summarized":
                    "http://localhost:8000/library/bg/2",
                "Chapter Three: Karma-yoga":
                    "http://localhost:8000/library/bg/3",
                "Chapter Four: Transcendental Knowledge":
                    "http://localhost:8000/library/bg/4",
                "Chapter Five: Karma-yoga – Action in Kṛṣṇa Consciousness":
                    "http://localhost:8000/library/bg/5",
                "Chapter Six: Dhyāna-yoga":
                    "http://localhost:8000/library/bg/6",
                "Chapter Seven: Knowledge of the Absolute":
                    "http://localhost:8000/library/bg/7",
                "Chapter Eight: Attaining the Supreme":
                    "http://localhost:8000/library/bg/8",
                "Chapter Nine: The Most Confidential Knowledge":
                    "http://localhost:8000/library/bg/9",
                "Chapter Ten: The Opulence of the Absolute":
                    "http://localhost:8000/library/bg/10",
                "Chapter Eleven: The Universal Form":
                    "http://localhost:8000/library/bg/11",
                "Chapter Twelve: Devotional Service":
                    "http://localhost:8000/library/bg/12",
                "Chapter Thirteen: Nature, the Enjoyer, and Consciousness":
                    "http://localhost:8000/library/bg/13",
                "Chapter Fourteen: The Three Modes of Material Nature":
                    "http://localhost:8000/library/bg/14",
                "Chapter Fifteen: The Yoga of the Supreme Person":
                    "http://localhost:8000/library/bg/15",
                "Chapter Sixteen: The Divine and Demoniac Natures":
                    "http://localhost:8000/library/bg/16",
                "Chapter Seventeen: The Divisions of Faith":
                    "http://localhost:8000/library/bg/17",
                "Chapter Eighteen: Conclusion – The Perfection of Renunciation":
                    "http://localhost:8000/library/bg/18",
            },
        },
        hindi: {
            book_title: "श्रीमद् भगवद्गीता  यथारूप",
            Author: "परम पूज्य ए.सी. भक्तिवेदांत स्वामी श्रील प्रभुपाद",
            Description:
                "भगवान कृष्ण और अर्जुन के बीच शाश्वत संवाद, आत्म-साक्षात्कार के विज्ञान और आध्यात्मिक ज्ञान के मार्ग को प्रस्तुत करता है।",
            content: {
                आमुख: "http://localhost:8000/library/bg/introduction",
                भूमिका: "http://localhost:8000/library/bg/preface",
                "गुरु परंपरा":
                    "http://localhost:8000/library/bg/disciplic_succession",
                "अध्याय एक: कुरुक्षेत्र के युद्धस्थल में सैन्यनिरीक्षण":
                    "http://localhost:8000/library/bg/1",
                "अध्याय दो: गीता का सार":
                    "http://localhost:8000/library/bg/2",
                "अध्याय तीन: कर्म-योग":
                    "http://localhost:8000/library/bg/3",
                "अध्याय चार: दिव्य ज्ञान":
                    "http://localhost:8000/library/bg/4",
                "अध्याय पाँच: कर्मयोग - कृष्णभावनाभावित कर्म":
                    "http://localhost:8000/library/bg/5",
                "अध्याय छह: ध्यान-योग":
                    "http://localhost:8000/library/bg/6",
                "अध्याय सात: भगवद्ज्ञान":
                    "http://localhost:8000/library/bg/7",
                "अध्याय आठ: भगवत्प्राप्ति":
                    "http://localhost:8000/library/bg/8",
                "अध्याय नौ: परम गुह्य ज्ञान":
                    "http://localhost:8000/library/bg/9",
                "अध्याय दस: श्रीभगवान् का ऐश्वर्य":
                    "http://localhost:8000/library/bg/10",
                "अध्याय ग्यारह: विराट रूप":
                    "http://localhost:8000/library/bg/11",
                "अध्याय बारह: भक्तियोग":
                    "http://localhost:8000/library/bg/12",
                "अध्याय तेरह: प्रकृति, पुरुष तथा चेतना":
                    "http://localhost:8000/library/bg/13",
                "अध्याय चौदह: प्रकृति के तीन गुण":
                    "http://localhost:8000/library/bg/14",
                "अध्याय पंद्रह: पुरुषोत्तम योग":
                    "http://localhost:8000/library/bg/15",
                "अध्याय सोलह: दैवी और आसुरी स्वभाव":
                    "http://localhost:8000/library/bg/16",
                "अध्याय सत्रह: श्रद्धा के विभाग":
                    "http://localhost:8000/library/bg/17",
                "अध्याय अठारह: उपसंहार - संन्यास की सिद्धि":
                    "http://localhost:8000/library/bg/18",
            },
        },
    };

document.addEventListener("DOMContentLoaded", function () {
    loadContent("english");
});

function loadContent(language) {
    const langData = bookData[language];

    document.getElementById(
        \`book-title-\${language === "english" ? "en" : "hi"}\`
    ).textContent = langData.book_title;

    document.getElementById(
        \`book-author-\${language === "english" ? "en" : "hi"}\`
    ).textContent = langData.Author || "";

    document.getElementById(
        \`book-description-\${language === "english" ? "en" : "hi"}\`
    ).textContent = langData.Description;

    const tocList = document.getElementById(
        \`table-of-contents-\${language === "english" ? "en" : "hi"}\`
    );
    tocList.innerHTML = "";

    for (const chapterName in langData.content) {
        const listItem = document.createElement("li");
        listItem.className = "toc-item";

        const link = document.createElement("a");
        link.href = langData.content[chapterName];
        link.textContent = chapterName;
        link.className = "toc-link";

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    }

    const englishContent = document.getElementById("english-content");
    const hindiContent = document.getElementById("hindi-content");
    const englishTab = document.querySelector(".language-btn:first-child");
    const hindiTab = document.querySelector(".language-btn:last-child");

    if (language === "english") {
        englishContent.classList.add("active");
        hindiContent.classList.remove("active");
        englishTab.classList.add("active");
        hindiTab.classList.remove("active");
    } else {
        englishContent.classList.remove("active");
        hindiContent.classList.add("active");
        englishTab.classList.remove("active");
        hindiTab.classList.add("active");
    }
}

function switchLanguage(language) {
    loadContent(language);
}
  `;
};





const getLibraryHTML = (req, res) => {
  const html = generateLibraryHTML();
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
};

const generateLibraryHTML = ()=>{
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Library - Vedic Science Club</title>
    <link rel="stylesheet" href="/common.css">
    <link rel="stylesheet" href="/library.css">
   
  </head>
  <body>
    <div id="wrap">
      <div id="header">
        <h1>
          <img src="/media/title_left.gif" alt="" />Vedic Science Club<img
            src="/media/title_right.gif"
            alt=""
          />
        </h1>
        <h2>Unveiling ancient scientific wisdom</h2>
        <div id="nav">
          <ul>
                  
                    <li class="myNavButton">
                        <a href="http://localhost:8000/library" style="color:  #c90; background-color: #630;border-radius: 4px;" >Library</a>
                    </li>
                    <li class="myNavButton"><a href="http://localhost:8000/registration">Join Us</a></li>
                    <li class="myNavButton"><a href="http://localhost:8000/signInSignUp" >Login</a></li>
                    <li class="myNavButton"><a href="http://localhost:8000/aboutUs">About Us</a></li>
                </ul>
        </div>
      </div>
      <div id="content">
        <div class="library-container">
          <div class="language-toggle">
            <button class="language-btn active" data-lang="en">English</button>
            <button class="language-btn" data-lang="hi">हिंदी</button>
          </div>

          <div class="library-section" id="sacred-texts-section">
            <h2
              class="section-title"
              data-lang-en="Sacred Texts"
              data-lang-hi="पवित्र ग्रंथ"
            >
              Sacred Texts
            </h2>
            <div class="books-grid" id="books-grid"></div>
          </div>

          <div class="library-section" id="shloka-categories-section">
            <h2
              class="section-title"
              data-lang-en="Shloka Categories"
              data-lang-hi="श्लोक श्रेणियाँ"
            >
              Shloka Categories
            </h2>
            <div class="categories-list" id="categories-list"></div>
          </div>
        </div>

        <script>
          ${getLibraryJS()}
        </script>
      </div>
    </div>
  </body>
</html>
`
}


const getLibraryJS = () => {
  return `// Sample data structure for your library content
          const libraryData = {
            en: {
              sacredTexts: [
                {
                  title: "Bhagavad Gita",
                  author: "His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada",
                  description:
                    "The timeless conversation between Lord Krishna and Arjuna, presenting the science of self-realization and the path to spiritual enlightenment.",
                  coverImage: "/media/gitaCover.jpg",
                  link: "http://localhost:8000/library/category",
                },
                {
                  title: "More Texts Coming Soon",
                  author: "Various Authors",
                  description:
                    "We're continuously adding more sacred texts to our library. Check back soon for updates!",
                  coverImage: "media/comingSoon.jpg",
                  link: "#",
                },
                // Add more books here in English
              ],
              shlokaCategories: [
                {
                  name: "Peace of Mind",
                  description:
                    "Discover verses that bring inner calm and tranquility, helping you navigate life's challenges with equanimity.",
                  icon: "🕊️",
                  link: "http://localhost:8000/library/category",
                },
                {
                  name: "Stress Relief",
                  description:
                    "Powerful shlokas to alleviate anxiety and stress, providing spiritual solutions to modern problems.",
                  icon: "🧘",
                  link: "http://localhost:8000/library/category",
                },
                {
                  name: "Success & Prosperity",
                  description:
                    "Verses that guide toward righteous success and abundance while maintaining spiritual values.",
                  icon: "🌟",
                  link: "http://localhost:8000/library/category",
                },
                {
                  name: "Relationships",
                  description:
                    "Wisdom for harmonious relationships with family, friends, and society at large.",
                  icon: "💞",
                  link: "http://localhost:8000/library/category",
                },
                {
                  name: "Health & Well-being",
                  description:
                    "Ancient verses promoting physical, mental, and spiritual health.",
                  icon: "💪",
                  link: "http://localhost:8000/library/category",
                },
                {
                  name: "Wisdom & Knowledge",
                  description:
                    "Shlokas that illuminate the path to true knowledge and understanding.",
                  icon: "📚",
                  link: "http://localhost:8000/library/category",
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
                  coverImage: "/media/gitaCover.jpg",
                  link: "gita.html",
                },
                {
                  title: "और ग्रंथ जल्द ही आ रहे हैं",
                  author: "विभिन्न लेखक",
                  description:
                    "हम लगातार अपनी लाइब्रेरी में और पवित्र ग्रंथ जोड़ रहे हैं। अपडेट के लिए जल्द ही वापस देखें!",
                  coverImage: "/media/comingSoon.jpg",
                  link: "#",
                },
                // Add more books here in Hindi
              ],
              shlokaCategories: [
                {
                  name: "मन की शांति",
                  description:
                    "ऐसे छंदों की खोज करें जो आंतरिक शांति और सुकून लाते हैं, जिससे आपको जीवन की चुनौतियों का समान भाव से सामना करने में मदद मिलती है।",
                  icon: "🕊️",
                  link: "http://localhost:8000/library/category",
                },
                {
                  name: "तनाव से मुक्ति",
                  description:
                    "चिंता और तनाव को कम करने के लिए शक्तिशाली श्लोक, आधुनिक समस्याओं के आध्यात्मिक समाधान प्रदान करते हैं।",
                  icon: "🧘",
                  link: "http://localhost:8000/library/category",
                },
                {
                  name: "सफलता और समृद्धि",
                  description:
                    "ऐसे छंद जो आध्यात्मिक मूल्यों को बनाए रखते हुए धार्मिक सफलता और प्रचुरता की ओर मार्गदर्शन करते हैं।",
                  icon: "🌟",
                  link: "http://localhost:8000/library/category",
                },
                {
                  name: "संबंध",
                  description:
                    "परिवार, दोस्तों और बड़े पैमाने पर समाज के साथ सामंजस्यपूर्ण संबंधों के लिए ज्ञान।",
                  icon: "💞",
                  link: "http://localhost:8000/library/category",
                },
                {
                  name: "स्वास्थ्य और कल्याण",
                  description:
                    "शारीरिक, मानसिक और आध्यात्मिक स्वास्थ्य को बढ़ावा देने वाले प्राचीन छंद।",
                  icon: "💪",
                  link: "http://localhost:8000/library/category",
                },
                {
                  name: "ज्ञान और विद्या",
                  description:
                    "श्लोक जो सच्चे ज्ञान और समझ के मार्ग को प्रकाशित करते हैं।",
                  icon: "📚",
                  link: "http://localhost:8000/library/category",
                },
              ],
            },
          };

          function loadContent(lang = "en") {
            const booksGrid = document.getElementById("books-grid");
            const categoriesList = document.getElementById("categories-list");

            // Clear existing content
            booksGrid.innerHTML = "";
            categoriesList.innerHTML = "";

            const currentLangData = libraryData[lang];

            // Load Sacred Texts
            currentLangData.sacredTexts.forEach((book) => {
              const bookCard = document.createElement("div");
              bookCard.classList.add("book-card");
              bookCard.onclick = function () {
                window.location.href = book.link;
              };

              const img = document.createElement("img");
              img.src = book.coverImage;
              img.alt = book.title;
              img.classList.add("book-cover");

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

            // Load Shloka Categories
            currentLangData.shlokaCategories.forEach((category) => {
              const categoryCard = document.createElement("div");
              categoryCard.classList.add("category-card");
              categoryCard.onclick = function () {
                window.location.href = category.link;
              };

              const title = document.createElement("h3");
              title.classList.add("category-title");
              // CORRECTED LINE: Use template literals for cleaner concatenation
              title.innerHTML = \`<span class="category-icon">\${category.icon}</span>\${category.name}\`; 

              const description = document.createElement("p");
              description.classList.add("category-description");
              description.textContent = category.description;

              categoryCard.appendChild(title);
              categoryCard.appendChild(description);
              categoriesList.appendChild(categoryCard);
            });

            // Update section titles
            document.querySelectorAll("[data-lang-en]").forEach((element) => {
              const enText = element.dataset.langEn;
              const hiText = element.dataset.langHi;
              element.textContent = lang === "en" ? enText : hiText;
            });
          }

          // Initial content load (default to English)
          loadContent();

          // Language toggle functionality
          document.querySelectorAll(".language-btn").forEach((btn) => {
            btn.addEventListener("click", function () {
              document
                .querySelectorAll(".language-btn")
                .forEach((b) => b.classList.remove("active"));
              this.classList.add("active");

              const lang = this.dataset.lang;
              loadContent(lang); // Load content based on selected language
            });
          });`
}


const getCategoryHTML = (req, res) => {
  const html = generateCategoryHTML();
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
};

const generateCategoryHTML = ()=>{
return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Finding Help in Bhagavad Gita - Categories</title>
    <link rel="stylesheet" href="/common.css" />
    <link rel="stylesheet" href="/category.css" />

    <link rel="stylesheet" href="" />
  </head>
  <body>
    <div id="wrap">
      <div id="header">
        <h1>
          <img src="/media/title_left.gif" alt="" />Vedic Science Club<img
            src="/media/title_right.gif"
            alt=""
          />
        </h1>
        <h2>Unveiling ancient scientific wisdom</h2>
        <div id="nav">
          <ul>
            <li class="myNavButton">
              <a href="http://localhost:8000/home">Home</a>
            </li>
            <li class="myNavButton">
              <a
                href="http://localhost:8000/library"
                style="color: #c90; background-color: #630; border-radius: 4px"
                >Library</a
              >
            </li>
            <li class="myNavButton">
              <a href="http://localhost:8000/registration">Join Us</a>
            </li>
            <li class="myNavButton">
              <a href="http://localhost:8000/signInSignUp">Login</a>
            </li>
            <li class="myNavButton">
              <a href="http://localhost:8000/aboutUs">About Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div id="content">
        <div class="headerTitle">
          <h1>Finding Help in Bhagavad Gita</h1>
          <p>Discover wisdom for life's challenges through sacred verses</p>
        </div>

        <div class="search-section">
          <label for="categorySearch" class="search-label"
            >Search Categories or Verses</label
          >
          <input
            type="text"
            id="categorySearch"
            class="search-box"
            placeholder="Type to search for specific guidance..."
          />
        </div>

        <div class="categories-grid" id="categoriesGrid"></div>
      </div>
    </div>

    <script>
   ${getCategoryJS()}
   </script>
  </body>
</html>
`
};

const getCategoryJS= () =>{
  return  `  
  const categories = [
        {
          title: "When Feeling Depressed or Sad",
          icon: "😔",
          verses: [
            {
              ref: "2.14",
              desc: "Tolerance of dualities and temporary nature of pain",
              link: "",
            },
            {
              ref: "2.47",
              desc: "Focus on duty without attachment to results",
            },
            { ref: "18.58", desc: "Grace through surrender and devotion" },
            {
              ref: "7.14",
              desc: "Overcoming illusion through surrender to divine",
            },
          ],
        },
        {
          title: "When Lacking Confidence",
          icon: "💪",
          verses: [
            { ref: "2.31", desc: "Doing one's duty brings happiness" },
            { ref: "18.78", desc: "Success comes with Krishna's presence" },
            { ref: "7.1", desc: "Complete knowledge through devotion" },
            { ref: "10.10", desc: "Divine guidance for sincere devotees" },
          ],
        },
        {
          title: "When Feeling Angry",
          icon: "😤",
          verses: [
            { ref: "2.56", desc: "Steadiness of mind in all conditions" },
            {
              ref: "2.62-63",
              desc: "Chain reaction of anger and its consequences",
            },
            { ref: "5.23", desc: "Controlling desires and anger before death" },
            { ref: "16.21", desc: "Anger as gateway to hell" },
          ],
        },
        {
          title: "When Seeking Peace",
          icon: "🕊️",
          verses: [
            { ref: "2.66", desc: "No peace without self-control" },
            { ref: "5.12", desc: "Peace through surrender of results" },
            { ref: "5.29", desc: "Peace through understanding divine nature" },
            { ref: "4.39", desc: "Peace through faith and knowledge" },
          ],
        },
        {
          title: "When Facing Fear or Anxiety",
          icon: "😰",
          verses: [
            { ref: "2.40", desc: "No loss in spiritual endeavor" },
            { ref: "9.31", desc: "Divine protection for devotees" },
            { ref: "18.66", desc: "Freedom from all fears through surrender" },
            { ref: "11.44", desc: "Seeking divine mercy and forgiveness" },
          ],
        },
        {
          title: "When Seeking Success",
          icon: "🎯",
          verses: [
            { ref: "2.50", desc: "Skill in action through equanimity" },
            { ref: "3.19", desc: "Success through desireless action" },
            { ref: "6.17", desc: "Success through regulated life" },
            { ref: "18.45", desc: "Perfection through one's natural work" },
          ],
        },
        {
          title: "When Dealing with Relationships",
          icon: "👥",
          verses: [
            { ref: "12.13-14", desc: "Qualities of a dear devotee" },
            { ref: "16.1-3", desc: "Divine qualities to cultivate" },
            { ref: "17.15", desc: "Truthful and beneficial speech" },
            { ref: "9.29", desc: "Equal vision toward all beings" },
          ],
        },
        {
          title: "When Seeking Wisdom",
          icon: "🧠",
          verses: [
            { ref: "4.34", desc: "Gaining knowledge from realized teachers" },
            { ref: "7.2", desc: "Complete knowledge of absolute truth" },
            { ref: "18.63", desc: "Deliberation before decision making" },
            { ref: "15.20", desc: "Most confidential knowledge" },
          ],
        },
        {
          title: "When Feeling Lost or Confused",
          icon: "🤔",
          verses: [
            { ref: "2.7", desc: "Seeking guidance when confused about duty" },
            { ref: "3.2", desc: "Clarification of confusing teachings" },
            { ref: "18.73", desc: "Clarity through divine instruction" },
            { ref: "10.11", desc: "Divine illumination dispelling ignorance" },
          ],
        },
        {
          title: "When Seeking Spiritual Growth",
          icon: "🌱",
          verses: [
            { ref: "6.5", desc: "Self-elevation through mind control" },
            { ref: "8.7", desc: "Constant remembrance while performing duty" },
            { ref: "9.27", desc: "Offering all actions to the divine" },
            { ref: "18.65", desc: "Complete surrender and devotion" },
          ],
        },
        {
          title: "When Dealing with Death or Loss",
          icon: "💔",
          verses: [
            { ref: "2.13", desc: "Soul's journey through different bodies" },
            { ref: "2.20", desc: "Eternal nature of the soul" },
            { ref: "2.22", desc: "Soul changing bodies like clothes" },
            { ref: "8.5", desc: "Remembering divine at time of death" },
          ],
        },
        {
          title: "When Seeking Happiness",
          icon: "😊",
          verses: [
            { ref: "5.21", desc: "Inner joy through self-realization" },
            { ref: "6.20-23", desc: "Supreme happiness through yoga practice" },
            {
              ref: "18.37",
              desc: "Initial difficulty leading to ultimate happiness",
            },
            { ref: "9.2", desc: "Joyful practice of devotional service" },
          ],
        },
      ];

      function renderCategories(categoriesToRender = categories) {
      const grid = document.getElementById("categoriesGrid");
      if (!grid) return;
      grid.innerHTML = "";

      categoriesToRender.forEach((category) => {
        const categoryCard = document.createElement("div");
        categoryCard.className = "category-card";

        categoryCard.innerHTML = \`
          <div class="category-title">
            <span class="category-icon">\${category.icon}</span>
            \${category.title}
          </div>
          <ul class="verses-list">
            \${category.verses.map(
              (verse) => \`
                <li class="verse-item" onclick="navigateToVerse('\${verse.ref}')">
                  <span class="verse-reference">\${verse.ref}</span>
                  <span class="verse-description">\${verse.desc}</span>
                </li>
              \`
            ).join("")}
          </ul>
        \`;

        grid.appendChild(categoryCard);
      });
    }

   function navigateToVerse(verseRef) {
  const [chapter, verse] = verseRef.split(".");
  window.location.href = \`http://localhost:8000/library/bg/\${chapter}/\${verse}\`;
}


    function searchCategories() {
      const searchTerm = document
        .getElementById("categorySearch")
        ?.value.toLowerCase();

      if (!searchTerm) {
        renderCategories();
        return;
      }

      const filteredCategories = categories
        .filter((category) => {
          const titleMatch = category.title.toLowerCase().includes(searchTerm);
          const verseMatch = category.verses.some(
            (verse) =>
              verse.desc.toLowerCase().includes(searchTerm) ||
              verse.ref.includes(searchTerm)
          );
          return titleMatch || verseMatch;
        })
        .map((category) => {
          return {
            ...category,
            verses: category.verses.filter(
              (verse) =>
                verse.desc.toLowerCase().includes(searchTerm) ||
                verse.ref.includes(searchTerm) ||
                category.title.toLowerCase().includes(searchTerm)
            ),
          };
        });

      renderCategories(filteredCategories);
    }

    document.addEventListener("DOMContentLoaded", () => {
      renderCategories();
      document
        .getElementById("categorySearch")
        .addEventListener("input", searchCategories);
    });`
}


export {getBGChapterHTML, getBGShlokaHTML,getBGHomeHTML, getLibraryHTML, getCategoryHTML };