const generateHomeHTML = ()=>{
   return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vedic Science Club - Home</title>
    <link rel="stylesheet" href="https://vscassets.pages.dev/cssFiles/common.css" />
    <link rel="stylesheet" href="https://vscassets.pages.dev/cssFiles/home.css" />
  </head>
  <body>
    <div id="wrap">
      <!-- Header -->
      <div id="header">
        <h1>
          <img src="https://vscassets.pages.dev/media/title_left.gif" alt="" />Vedic Science Club
          <img src="https://vscassets.pages.dev/media/title_right.gif" alt="" />
        </h1>
        <h2>Unveiling ancient scientific wisdom</h2>
        <div id="nav">
          <ul>
            <li class="myNavButton">
              <a style="color: #c90; background-color: #300" href="/home"
                >Home</a
              >
            </li>
            <li class="myNavButton"><a href="/library">Library</a></li>
            <li class="myNavButton"><a href="/registration">Join Us</a></li>
            <li class="myNavButton"><a href="/aboutUs">About Us</a></li>
          </ul>
        </div>
      </div>

      <!-- Hero Section -->
      <div class="content">
        <section class="hero">
          <div class="hero-content">
            <h1>Welcome to Vedic Science Club</h1>
            <p>
              Exploring timeless wisdom from the Bhagavad Gita and Vedic
              traditions
            </p>
            <div class="hero-buttons">
              <a href="/registration" class="btn">Join Us</a>
              <a href="/library" class="btn secondary">Explore Library</a>
            </div>
          </div>
        </section>

        <!-- About Preview -->
        <section class="about-preview">
          <h2>About Us</h2>
          <p>
            Rooted in the Bhagavad Gita, we blend Vedic knowledge with today’s
            challenges. Through interactive sessions, and cultural events, we
            inspire Bhakti, inner peace, and purposeful living for individuals
            seeking balance in modern life.
          </p>
          <a href="/aboutUs" class="btn small">Read More</a>
        </section>

        <!-- Highlights -->
        <section class="highlights">
          <h2>Explore Highlights</h2>
          <div class="highlight-grid">
            <div class="highlight-card">
              <h3 style="margin-bottom: 12px">📖 Shloka Categories</h3>
              <p>
                Find verses from the Bhagavad Gita for life’s challenges — when
                sad, angry, seeking peace, or looking for wisdom.
              </p>
              <a href="/library" class="btn small">Explore Categories</a>
            </div>
            <div class="highlight-card">
              <h3 style="margin-bottom: 12px">📚 Books Library</h3>
              <p>
                Browse our digital collection of sacred texts and reference
                material to deepen your understanding.
              </p>
              <a href="/library" class="btn small">Browse Books</a>
            </div>
          </div>
        </section>

        <!-- Instagram Section -->
        <section class="instagram-block">
          <h2 style="margin-bottom: 12px">📸 Stay Connected</h2>
          <p>
            Join us on Instagram for club updates.
          </p>
          <a
            href="https://www.instagram.com/vsc.gehu?utm_source=ig_web_button_share_sheet&igsh=MWlpMjBvM2hyZjV3MA=="
            target="_blank"
            class="btn insta"
            >Visit Profile</a
          >
        </section>

        <!-- Join Section -->
        <section class="join-cta">
          <h2>Become a part of Us</h2>
          <p>
            Register now to stay updated, join discussions, and be part of our
            growing community.
          </p>
          <a href="/registration" class="btn big">Register Now</a>
        </section>

        <!-- Footer -->
        <footer class="footer">
          <p>
            © 2025 Vedic Science Club | Follow us on
            <a
              href="https://www.instagram.com/vsc.gehu?utm_source=ig_web_button_share_sheet&igsh=MWlpMjBvM2hyZjV3MA=="
              target="_blank"
              >Instagram</a
            >
          </p>
        </footer>
      </div>
    </div>
  </body>
</html>`
}

const getHomeHTML = (req, res) => {
  const html = generateHomeHTML();
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
};

export { getHomeHTML };
