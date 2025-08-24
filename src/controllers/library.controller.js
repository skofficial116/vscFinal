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
    <link rel="stylesheet" href="/cssFiles/common.css" />
    <link rel="stylesheet" href="/cssFiles/shloka.css" />

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
              <a href="/home">Home</a>
            </li>
            <li class="myNavButton">
              <a
                href="/library"
                style="color: #c90; background-color: #630; border-radius: 4px"
                >Library</a
              >
            </li>
            <li class="myNavButton">
              <a href="/registration">Join Us</a>
            </li>
          
            <li class="myNavButton">
              <a href="/aboutUs">About Us</a>
            </li>
          </ul>
        </div>
      </div>
                <div class="custom-marquee">
  <div class="marquee-track" id="marquee">
    <span>
      🙏 Hare Krishna! We’re humbly continuing to collect and organize data for Hindi Shloka, their meanings, and translations. 🙏🙏 कृपया धैर्य रखें, हम अभी हिंदी श्लोक, अर्थ और अनुवाद का संकलन कर रहे हैं। 🙏
    </span>
  </div>
</div>
        
        <div class="container">
            <div class="header">
                <h1 id="title"><a href="/library/bg" style="text-decoration: none; color: inherit;">Bhagavad Gita</a></h1>
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
    
    <script src='/jsFiles/shloka.js'> </script>
</body>
</html>`;
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
  // const description = chapterData.description; 
  // Assuming description is present
  const descriptionEnglish = chapterData.descriptionEnglish || '';
const descriptionHindi = chapterData.descriptionHindi || '';

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
    <link rel="stylesheet" href="/cssFiles/common.css" />
    <link rel="stylesheet" href="/cssFiles/chapter.css" />

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
              <a href="/home">Home</a>
            </li>
            <li class="myNavButton">
              <a
                href="/library"
                style="color: #c90; background-color: #630; border-radius: 4px"
                >Library</a
              >
            </li>
            <li class="myNavButton">
              <a href="/registration">Join Us</a>
            </li>
          
            <li class="myNavButton">
              <a href="/aboutUs">About Us</a>
            </li>
          </ul>
        </div>
      </div>
        <div class="custom-marquee">
          <div class="marquee-track" id="marquee">
            <span>
              🙏 Hare Krishna! We’re humbly continuing to collect and organize data for Hindi Shloka, their meanings, and translations. 🙏🙏 कृपया धैर्य रखें, हम अभी हिंदी श्लोक, अर्थ और अनुवाद का संकलन कर रहे हैं। 🙏
            </span>
          </div>
        </div>
        
        <div class="container">
            <div class="header">
                <h1 id="title"><a href="/library/bg" style="text-decoration: none; color: inherit;">Bhagavad Gita</a></h1>
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
                <p class="chapter-description">${descriptionEnglish}</p>
                <div class="verses-list">
                    ${englishVersesHtml}
                </div>
            </div>
            <div class="tab-content" id="hindi-content">
                <h2 class="chapter-title">${hindiTitle}</h2>
                <p class="chapter-description">${descriptionHindi}</p>
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
    
    <script 
      src="/chapter.js"
      data-chapter-number="${chapterNumber}" 
      data-english-title="${englishTitle}" 
      data-hindi-title="${hindiTitle}">
    </script>

</body>
</html>`;
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
    
   <link rel="stylesheet" href="/cssFiles/common.css" />
   <link rel="stylesheet" href="/cssFiles/bgHome.css" />


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
              <a href="/home"  style="color: #c90; background-color: #630; border-radius: 4px">Home</a>
            </li>
            <li class="myNavButton">
              <a
                href="/library"
               
                >Library</a
              >
            </li>
            <li class="myNavButton">
              <a href="/registration">Join Us</a>
            </li>
          
            <li class="myNavButton">
              <a href="/aboutUs">About Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="custom-marquee">
  <div class="marquee-track" id="marquee">
    <span>
      🙏 Hare Krishna! We’re humbly continuing to collect and organize data for Hindi Shloka, their meanings, and translations. 🙏🙏 कृपया धैर्य रखें, हम अभी हिंदी श्लोक, अर्थ और अनुवाद का संकलन कर रहे हैं। 🙏
    </span>
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

    <script src='/jsFiles/bgHome.js'>
      </script>
  </body>
</html>
` 
}






const getLibraryHTML = (req, res) => {
  const html = generateLibraryHTML();
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
};

const generateLibraryHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Library - Vedic Science Club</title>
    <link rel="stylesheet" href="/cssFiles/library.css" />
    <link rel="stylesheet" href="/cssFiles/common.css" />
  </head>
  <body>
    <div id="wrap">
      <div id="header">
        <h1>
          <img src="/media/title_left.gif" alt="" />Vedic Science Club
          <img src="/media/title_right.gif" alt="" />
        </h1>
        <h2>Unveiling ancient scientific wisdom</h2>
        <div id="nav">
          <ul>
            <li class="myNavButton">
              <a href="/home">Home</a>
            </li>
            <li class="myNavButton">
              <a
                href="/library"
                style="color: #c90; background-color: #630; border-radius: 4px"
                >Library</a
              >
            </li>
            <li class="myNavButton">
              <a href="/registration">Join Us</a>
            </li>
            <li class="myNavButton">
              <a href="/aboutUs">About Us</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="custom-marquee">
        <div class="marquee-track" id="marquee">
          <span>
            🙏 Hare Krishna! We’re humbly continuing to collect and organize data
            for Hindi Shloka, their meanings, and translations. 🙏🙏 कृपया धैर्य
            रखें, हम अभी हिंदी श्लोक, अर्थ और अनुवाद का संकलन कर रहे हैं। 🙏
          </span>
        </div>
      </div>

      <div id="content">
        <section class="sacred-texts-section">
          <h2>Sacred Texts</h2>
          <div class="books-grid" id="books-grid"></div>
        </section>

        <section class="shloka-categories-section">
          <h2>Shloka Categories</h2>
          <div class="categories-list" id="categories-list"></div>
        </section>
      </div>

      
    </div>
    <script src='/jsFiles/library.js'> </script>
  </body>
</html>`;
};



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
    <link rel="stylesheet" href="/cssFiles/common.css" />
    <link rel="stylesheet" href="/cssFiles/category.css" />
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
              <a href="/home">Home</a>
            </li>
            <li class="myNavButton">
              <a
                href="/library"
                style="color: #c90; background-color: #630; border-radius: 4px"
                >Library</a
              >
            </li>
            <li class="myNavButton">
              <a href="/registration">Join Us</a>
            </li>
          
            <li class="myNavButton">
              <a href="/aboutUs">About Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="custom-marquee">
      <div class="marquee-track" id="marquee">
        <span>
      🙏 Hare Krishna! We’re humbly continuing to collect and organize data for Hindi Shloka, their meanings, and translations. 🙏🙏 कृपया धैर्य रखें, हम अभी हिंदी श्लोक, अर्थ और अनुवाद का संकलन कर रहे हैं। 🙏
        </span>
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

    <script  src='/jsFiles/category.js'></script>
  </body>
</html>
`
};



export {getBGChapterHTML, getBGShlokaHTML,getBGHomeHTML, getLibraryHTML, getCategoryHTML };