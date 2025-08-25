const generateRegistrationHTML = ()=>{
   return `<!DOCTYPE html>
<!---Coding By CodingLab | www.codinglabweb.com--->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <!-- <link rel="stylesheet" href="/common.css" /> -->
    <link rel="stylesheet" href="https://vscassets.pages.dev/cssFiles/test.css" />
    <link rel="stylesheet" href="https://vscassets.pages.dev/cssFiles/registration.css" />
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  </head>
  <body>
    <div id="wrap">
      <div id="header">
        <h1>
          <img src="https://vscassets.pages.dev/media/title_left.gif" alt="" />Vedic Science Club<img
            src="https://vscassets.pages.dev/media/title_right.gif"
            alt=""
          />
        </h1>
        <h2>Unveiling ancient scientific wisdom</h2>
        <div id="nav">
          <ul>
            <li class="myNavButton"><a href="/home">Home</a></li>
            <li class="myNavButton"><a href="/library">Library</a></li>
            <li class="myNavButton">
              <a
                href="/registration"
                style="color: #c90; background-color: #300"
                >Join Us</a
              >
            </li>
            <li class="myNavButton"><a href="/aboutUs">About Us</a></li>
          </ul>
        </div>
      </div>
      <div id="content">
        <div class="formbold-main-wrapper">
          <div class="formbold-form-wrapper">
            <div class="formbold-event-wrapper">
              <div style="text-align: center">
                <span class="registration-badge">Registration</span>
              </div>

              <div class="header-content">
                <div class="header-text">
                  <h3 class="main-title">
                    Vedic Science Club Registration Form
                  </h3>
                  <p class="subtitle">
                    Exploring the Science Behind the Vedas.
                  </p>
                </div>
                <div class="header-image">
                  <img
                    class="headerImage"
                    src="https://wallpapercave.com/wp/wp3419846.jpg"
                    height="768px"
                    width="1024"
                    alt="Vedic Science Club"
                  />
                </div>
              </div>

              <div class="note">
                <b>Note!</b> We are currently limited to Graphic Era University
                (GEHU & GEU), Dehradun, Uttarakhand for club registrations.
              </div>
            </div>

            <form id="registrationForm">
              <h2 class="formbold-form-title">Register Now</h2>

              <div class="formbold-input-flex">
                <div>
                  <label for="firstname" class="formbold-form-label"
                    >First Name</label
                  >
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    class="formbold-form-input"
                    required
                  />
                </div>
                <div>
                  <label for="lastname" class="formbold-form-label"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    class="formbold-form-input"
                    required
                  />
                </div>
              </div>

              <div class="formbold-input-flex">
                <div>
                  <label for="phone" class="formbold-form-label"
                    >Phone Number</label
                  >
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    class="formbold-form-input"
                    pattern="[0-9]{10}"
                    title="Please enter a 10-digit phone number"
                    required
                  />
                </div>
                <div>
                  <label for="gender" class="formbold-form-label">Gender</label>
                  <select
                    class="formbold-form-input-select"
                    name="gender"
                    id="gender"
                    required
                  >
                    <option value="" selected disabled hidden>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div class="formbold-input-flex">
                <div>
                  <label for="university" class="formbold-form-label"
                    >College</label
                  >
                  <select
                    class="formbold-form-input-select"
                    name="university"
                    id="university"
                    required
                  >
                    <option value="" selected disabled hidden>
                      Select College
                    </option>
                    <option value="GEU">
                      Graphic Era Deemed to be University
                    </option>
                    <option value="GEHU">Graphic Era Hill University</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div class="formbold-input-flex">
                <div>
                  <label for="course" class="formbold-form-label">Course</label>
                  <select
                    class="formbold-form-input-select"
                    name="course"
                    id="course"
                    required
                  >
                    <option value="" selected disabled hidden>
                      Select Course
                    </option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="BBA">BBA</option>
                    <option value="MBA">MBA</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="B.Com">B.Com</option>
                    <option value="M.Com">M.Com</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label for="semester" class="formbold-form-label"
                    >Semester</label
                  >
                  <select
                    class="formbold-form-input-select"
                    name="semester"
                    id="semester"
                    required
                  >
                    <option value="" selected disabled hidden>
                      Select Semester
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                id="registerButton"
                class="formbold-btn submit"
              >
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      </div>
      <script src="https://vscassets.pages.dev/jsFiles/registration.js"></script>
    </div>
  </body>
</html>
`
}

const getRegistrationHTML = (req, res) => {
  const html = generateRegistrationHTML();
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
};

export { getRegistrationHTML };
