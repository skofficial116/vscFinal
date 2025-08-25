const generateAboutUsHTML = ()=>{
   return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Us - Vedic Science Club</title>
    <link rel="stylesheet" href="https://vscassets.pages.dev/cssFiles/common.css" />
    <link rel="stylesheet" href="https://vscassets.pages.dev/cssFiles/about.css" />
  </head>
  <body>
    <div id="wrap">
      <div id="header">
        <h1>
          <img src="https://vscassets.pages.dev/media/title_left.gif" alt="" />Vedic Science Club
          <img src="https://vscassets.pages.dev/media/title_right.gif" alt="" />
        </h1>
        <h2>Unveiling ancient scientific wisdom</h2>
        <div id="nav">
          <ul>
            <li class="myNavButton">
              <a href="/home">Home</a>
            </li>
            <li class="myNavButton">
              <a href="/library">Library</a>
            </li>
            <li class="myNavButton">
              <a href="/registration">Join Us</a>
            </li>
            <li class="myNavButton">
              <a
                href="/aboutUs"
                style="color: #c90; background-color: #630; border-radius: 4px"
                >About Us</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div id="content">
        <div class="about-wrapper">
          <h2 class="center">🙏 Hare Krishna! 🌸</h2>

          <!-- Language Toggle -->
          <div class="lang-toggle">
            <button class="lang-btn active" data-lang="en">English</button>
            <button class="lang-btn" data-lang="hi">हिन्दी</button>
          </div>

          <!-- English Content -->
          <div class="lang-content" id="lang-en">
            <section class="mission-vision">
              <div class="card">
                <h3>🕉️ Mission</h3>
                <p>
                  To make the Bhagavad Gita accessible and relatable for
                  everyone by organizing shlokas based on life situations and
                  providing practical applications.
                </p>
              </div>
              <div class="card">
                <h3>🌸 Vision</h3>
                <p>
                  We envision a world where ancient wisdom inspires modern life,
                  guiding us toward peace, balance, and self-realization.
                </p>
              </div>
              <div class="card">
                <h3>📖 What We Do</h3>
                <p>
                  We offer workshops, interactive sessions, and cultural events
                  grounded in Vedic teachings, inspiring individuals to embrace
                  Bhakti and spiritual values, while applying them practically
                  to lead more balanced, meaningful, and purposeful lives.
                </p>
              </div>
            </section>

            <section class="why-vedic">
              <h3>🔬 Why Vedic Science?</h3>
              <p>
                The Gita is more than scripture—it is a universal guide for mind
                control, decision-making, and emotional balance, deeply
                resonating with modern psychology and philosophy.
              </p>
            </section>

            <section class="team">
              <h3>👥 Our Community</h3>
              <img src="https://vscassets.pages.dev/media/team.jpg" alt="Vedic Science Club Members" />
              <p>
                <em
                  >We are seekers, students, and teachers—united by a love for
                  the Bhagavad Gita and a desire to share its timeless
                  wisdom.</em
                >
              </p>
            </section>

            <section class="timeline">
              <h3>📅 Our Journey</h3>
              <div class="timeline-cards" id="timeline-en"></div>
            </section>
          </div>

          <!-- Hindi Content -->
          <div class="lang-content hidden" id="lang-hi">
            <section class="mission-vision">
              <div class="card">
                <h3>🕉️ हमारा उद्देश्य</h3>
                <p>
                  भगवद् गीता को सबके लिए सरल और प्रासंगिक बनाना—जीवन की
                  स्थितियों के अनुसार श्लोकों को बाँटना और उनके व्यवहारिक प्रयोग
                  बताना।
                </p>
              </div>
              <div class="card">
                <h3>🌸 हमारा दृष्टिकोण</h3>
                <p>
                  हम ऐसा संसार चाहते हैं जहाँ प्राचीन ज्ञान आधुनिक जीवन को
                  प्रेरित करे और हमें शांति, संतुलन व आत्मबोध की ओर ले जाए।
                </p>
              </div>
              <div class="card">
                <h3>📖 हम क्या करते हैं</h3>
                <p>
                  हम श्लोकों का संग्रह, वर्गीकरण और डिजिटलीकरण करते हैं; अध्ययन
                  मंडलियाँ और सत्संग आयोजित करते हैं।
                </p>
              </div>
            </section>

            <section class="why-vedic">
              <h3>🔬 वेद विज्ञान क्यों?</h3>
              <p>
                गीता केवल धर्मग्रंथ नहीं, बल्कि जीवन का मार्गदर्शक है—मन
                नियंत्रण, निर्णय क्षमता और संतुलन सिखाती है और आधुनिक मनोविज्ञान
                से मेल खाती है।
              </p>
            </section>

            <section class="team">
              <h3>👥 हमारा समुदाय</h3>
              <img src="https://vscassets.pages.dev/media/team.jpg" alt="सदस्य समूह" />
              <p>
                <em
                  >हम साधक, विद्यार्थी और शिक्षक हैं—गीता के अमर ज्ञान को साझा
                  करने के लिए एकजुट।</em
                >
              </p>
            </section>

            <section class="timeline">
              <h3>📅 हमारी यात्रा</h3>
              <div class="timeline-cards" id="timeline-hi"></div>
            </section>
          </div>
        </div>
      </div>

      <!-- Sticky Buy Button -->
      <div
        class="buy-btn"
        onclick="window.open('https://wa.me/91XXXXXXXXXX?text=I want to buy a Bhagavad Gita','_blank')"
      >
        <span class="icon">📖</span>
        <span class="text hidden">Buy Bhagavad Gita</span>
      </div>

      <div class="follow-us">
        <p class="follow-us-text">Follow Us</p>
        <a
          href="https://www.instagram.com/vsc.gehu?igsh=MWlpMjBvM2hyZjV3MA=="
          target="_blank"
          class="social-icon"
          aria-label="Follow us on Instagram"
        >
          <img
            src="media/image.png"
            alt="Instagram logo"
            class="instagram-logo"
          />
        </a>
      </div>
      <script src="https://vscassets.pages.dev/jsFiles/aboutUs.js"></script>  
    </div>
  </body>
</html>
`
}

const getAboutUsHTML = (req, res) => {
  const html = generateAboutUsHTML();
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
};

export { getAboutUsHTML };
