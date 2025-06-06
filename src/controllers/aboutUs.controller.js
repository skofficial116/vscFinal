const aboutUsHTML = ()=>{
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Us - Vedic Science Club</title>
    <style>/* Responsive Style.css */

/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0 auto;
  padding: 0;
  font: 100% times, "times new romans", serif;
  background: #300 url(/media/bg.jpg) no-repeat top center;
  background-attachment: fixed;
  background-size: cover;
}

img {
  max-width: 100%;
  height: auto;
}

/* Layout */
#wrap {
  color: #505050;
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
  background: url("/media/parchment.jpg") repeat-y top center;
  background-size: 100% auto;
  position: relative;
}

/* Header */
#header {
  margin: 0;
  padding: 0 0 10px 0;
  text-align: center;
  background: url("/media/ornament.gif") no-repeat center bottom;
  background-size: 80% auto;
  overflow: hidden;
}

#header h1 {
  font: 250% garamond, times, "times new romans", serif;
  color: #630;
  font-weight: 600;
  margin: 0 auto;
  padding: 30px 0 2px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

#header h1 img {
  padding: 0 15px;
  max-width: 50px;
}

#header h2 {
  font: 100% times, "times new romans", serif;
  color: #505050;
  letter-spacing: 3px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 0px;
  font-variant: small-caps;
}

/* Navigation */
#nav ul {
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}

#nav {
  margin: 0 auto;
  padding: 10px 0 15px 0;
  list-style-type: none;
  width: 100%;
  max-width: 600px;
  text-align: center;
  border-top: 1px solid #600;
  overflow-x: auto;
}

#nav li {
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
}

#nav li a {
  padding: 5px 8px;
  font: 600 1.2em garamond, times, "times new romans", serif;
  color: #990000;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

#nav li a:hover {
  color: #c90;
  text-decoration: none;
  background: url("menuhover.jpg") repeat-x bottom left;
}

/* Main content */
#content {
  margin: 0;
  padding: 20px;
  line-height: 1.7em;
  width: 100%;
}

#content img {
  float: left;
  clear: none;
  margin: 10px 10px 10px 0;
  padding: 2px;
  border: 1px solid #600;
  max-width: 90%;
}

#content a {
  color: #800;
  text-decoration: underline;
}

#content a:hover {
  color: #c90;
  text-decoration: none;
}

/* Headings */
h1 {
  font: 600 1.6em garamond, times, "times new romans", serif;
  color: #600;
  margin: 0 0 10px 0;
}

h2 {
  font: 600 1.2em "times new romans", times, serif;
  color: #740;
  margin: 3px 0;
}

h3 {
  font: 400 0.9em garamond, times, serif;
  color: #404040;
  font-style: italic;
  margin: 0 0 10px 0;
}

/* Sidebar */
#side {
  width: 100%;
  max-width: 150px;
  float: right;
  clear: none;
  margin: 0 20px 0 0;
}

.right {
  float: right;
  clear: right;
  width: 100%;
  margin: 30px 0 0 0;
}

.right h4 {
  font: 1.1em garamond, "times new romans", serif;
  border-top: 1px solid #98615f;
  background: url("/media/h3bg.gif") no-repeat bottom center;
  background-size: contain;
  padding: 2px 0 16px 0;
  text-align: center;
  color: #a80;
  font-variant: small-caps;
  margin: 0;
}

.right ul {
  list-style: none;
  margin: 0;
  padding: 5px;
}

.right li {
  margin: 0;
  padding: 0;
}

.right li a {
  display: block;
  text-decoration: none;
  font-size: 0.9em;
  padding: 5px 5px 5px 22px;
  background: url(/media/menu.gif) left no-repeat;
  color: #600;
}

.right li a:hover {
  background: #eccaa3 url(/media/menu.gif) right no-repeat;
  color: #800;
}

/* Blog entries */
.entry {
  padding: 10px 10px 25px 10px;
  background: url("/media/entrybg.gif") no-repeat bottom center;
  background-size: contain;
  border-top: 1px solid #601c2a;
  line-height: 1.4em;
}

.entry p {
  font-size: 0.8em;
}

.comment a {
  font: 0.8em garamond, times, serif;
  color: #800;
  text-decoration: underline;
  padding: 4px 6px;
}

.comment a:hover {
  color: #eccaa3;
  text-decoration: none;
  background-color: #600;
}

/* Lists */
ol {
  color: #600;
  font: 600 1em garamond, times, serif;
  font-style: italic;
}

ol span {
  font: 400 1em "times new romans", times, serif;
  color: #505050;
  font-style: normal;
}

ol li {
  margin-left: 25px;
  padding: 4px 0;
}

#content ul {
  list-style-type: none;
}

#content ul li {
  padding-left: 17px;
  background: url("/media/bullet.gif") no-repeat left center;
  margin-left: 10px;
  padding: 5px 5px 5px 25px;
}

#content ul li:hover {
  color: #c90 !important;
  text-decoration: none !important;
  background-color: rgba(236, 202, 163, 0.5);
  border-left: 3px solid #740;
  transform: translateX(5px);
}
#content ul li :active {
  background-color: rgba(236, 202, 163, 0.8);
  transform: translateX(8px);
}
/* Tables */
table {
  width: 100%;
  margin-bottom: 20px;
  font-size: 1em;
  border-collapse: collapse;
  overflow-x: auto;
  display: block;
}

table caption {
  margin-top: 10px;
  padding: 0 0 0.5em 3px;
  font: 400 1.2em garamond, times, serif;
  text-align: left;
}

table th,
table td {
  text-align: left;
  vertical-align: top;
  padding: 4px 7px;
}

thead th {
  color: #740;
  border-top: 2px solid #600;
  border-bottom: 1px solid #600;
}

tbody td {
  border-bottom: 1px solid #d6b8a0;
}

tbody tr:hover {
  background-color: #edd4ae;
}

/* Forms */
form label {
  display: block;
  margin-top: 10px;
}

form input.text,
form textarea {
  width: 100%;
  border: 1px #87764b solid;
  color: #211000;
  padding: 4px 5px;
  font: 12px Verdana, Arial, san-serif;
  background-color: #f6edcb;
}

form input.text:hover,
form textarea:hover {
  border: 1px #87764b solid;
}

form input.text:focus,
form textarea:focus {
  border: 1px #2d1a06 solid;
  color: #211000;
}

form input.button {
  margin-right: 8px;
  padding: 3px 5px;
  font: 12px Verdana, Arial, san-serif;
}

/* Footer */
#footer {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  color: #996633;
  padding: 20px 0;
  text-align: center;
  font-size: 0.8em;
  background: #300 url("/media/foot.jpg") no-repeat top center;
  background-size: 100% auto;
}

#footer a {
  color: #963;
  text-decoration: underline;
}

#footer a:hover {
  color: #c90;
  text-decoration: none;
}

#footer p {
  line-height: 1.6em;
}

#nav li a {
  padding: 3px 2vw;
  /* font-size: 1em; */
}
/* Media Queries */
@media screen and (max-width: 900px) {
  #wrap {
    width: 100%;
  }

  #content img {
    max-width: 90%;
  }
}

@media screen and (max-width: 768px) {
  #side,
  #content {
    float: none;
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 15px;
  }

  #side {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .right {
    width: 45%;
    float: none;
    margin: 10px 0;
  }
  #nav li a {
    padding: 3px 2vw;
    /* font-size: 1em; */
  }

  #content img {
    max-width: 90%;
  }
}

@media screen and (max-width: 600px) {
  #header h1 {
    font-size: 180%;
  }

  #header h1 img {
    max-width: 30px;
    padding: 0 5px;
  }

  #nav li a {
    padding: 3px 2vw;
    /* font-size: 1em; */
  }

  #content img {
    float: none;
    display: block;
    margin: 10px auto;
    max-width: 90%;
  }

  .right {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  #header h1 {
    font-size: 150%;
  }

  #header h2 {
    font-size: 80%;
  }

  #nav li a {
    padding: 1px 2vw;
  }

  form label,
  form input.text,
  form textarea {
    width: 100%;
  }
}
.myNavButton:hover {
  color: var(--border-color);
  background-color: #300;
}



/* Library-specific styles */
.library-container {
  margin: 0 auto;
  max-width: 100%;
}

/* Language Toggle */
.language-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.language-btn {
  padding: 8px 15px;
  margin: 0 5px;
  background: #f6edcb;
  border: 1px solid #87764b;
  color: #600;
  font-family: garamond, times, serif;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-btn:hover {
  background: #edd4ae;
}

.language-btn.active {
  background: #600;
  color: #f6edcb;
  border-color: #300;
}

/* Library Sections */
.library-section {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #d6b8a0;
}

.section-title {
  font: 600 1.8em garamond, times, serif;
  color: #600;
  margin-bottom: 20px;
  text-align: center;
  padding-bottom: 10px;
  background: url("/media/h3bg.gif") no-repeat bottom center;
  background-size: 200px auto;
}</style>
    <!-- Slick Carousel CSS -->
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
    />
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
            <li class="myNavButton"><a href="index2.html">Home</a></li>
            <li class="myNavButton"><a href="library.html">Library</a></li>
            <li class="myNavButton">
              <a
                href="registration.html"
                
                >Join Us</a
              >
            </li>
            <li class="myNavButton"><a href="signin-signup.html">Login</a></li>
            <li class="myNavButton" ><a href="aboutUs.html" style="color: #c90; background-color: #300 ">About Us</a></li>
          </ul>
        </div>
      </div>
      <div id="content">
        <div class="about-section">
          <h1>About Vedic Science Club</h1>
          <p>The Vedic Science Club was established to explore and understand the deep connections between ancient Vedic knowledge and modern scientific principles. Our club serves as a platform for students interested in exploring this fascinating intersection of traditional wisdom and contemporary science.</p>
          <p>Through regular meetings, discussions, workshops, and events, we aim to foster a community that appreciates both the scientific method and the profound insights from ancient Vedic texts. Our members engage in research, presentations, and collaborative projects that bridge these seemingly different worlds.</p>
        </div>

        <div class="mission-vision">
          <div class="mission">
            <h2>Our Mission</h2>
            <p>To create an environment where students can explore, discuss, and research the connections between Vedic knowledge and modern scientific understanding, fostering intellectual growth and cultural appreciation.</p>
          </div>
          <div class="vision">
            <h2>Our Vision</h2>
            <p>To become a leading student organization that promotes interdisciplinary learning by bridging ancient wisdom with contemporary scientific inquiry, producing research and educational materials that benefit both the academic community and society at large.</p>
          </div>
        </div>

      
        </div>
      </div>
      <div id="footer">
      <p>&copy; Vedic Science Club 2025 | All Rights Reserved</p>
    </div>
    </div>
    
  </body>
</html>`
}

export { aboutUsHTML };
