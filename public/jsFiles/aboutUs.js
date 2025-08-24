 const btns = document.querySelectorAll(".lang-btn");
        const contents = document.querySelectorAll(".lang-content");

        btns.forEach((btn) => {
          btn.addEventListener("click", () => {
            btns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            const lang = btn.dataset.lang;
            contents.forEach((c) => c.classList.add("hidden"));
            document.getElementById("lang-" + lang).classList.remove("hidden");
          });
        });

        // Sticky Buy Button toggle (icon <-> text)
        const buyBtn = document.querySelector(".buy-btn");
        const icon = buyBtn.querySelector(".icon");
        const text = buyBtn.querySelector(".text");
        setInterval(() => {
          icon.classList.toggle("hidden");
          text.classList.toggle("hidden");
        }, 4000);

        const timelineData = {
          en: [
            {
              year: "14th August, 2025",
              description:
                "<b>Nandotsva</b> - Celebrating the birth of the Unborn, Lord Krishna, in collaboration with <b>NSS, GEHU and RangDarpan Society</b> ",
            },
            {
              year: "31th July, 2025",
              description:
                "<b>The Art of Mind Control</b> - An insightful session on the teachings of Bhagvad Gita by honored guest, <b>Dr. Sanjay Singh</b> ",
            },
            {
              year: "16-17th May, 2025",
              description:
                "<b>TECHKRITI 2.0</b> - Quiz and Coding challenge, in collaboration with <b>Dept. of CSE and Team Aryabhatt, GEHU</b>",
            },
            {
              year: "15 February, 2025",
              description:
                "<b>Gita Sutras</b> - 6 weeks program based on the teachings of Bhagvad Gita, with <b>IKS Approved Certifications</b>",
            },
            {
              year: "27 Novembar 2024",
              description:
                "<b>SANKARSHAN</b> - Grand Launch Event of Vedic Science Club in the Graphir Era Hill University, Dehradun, Uttarakhand, India  ",
            },
          ],
          hi: [
            {
              year: "14 अगस्त 2025",
              description:
                "<b>नन्दोत्सव</b> - अजन्मे भगवान श्रीकृष्ण के जन्म का उत्सव, <b>एनएसएस, जीईएचयू और रंगदर्पण सोसाइटी</b> के सहयोग से",
            },
            {
              year: "31 जुलाई 2025",
              description:
                "<b>माइंड कंट्रोल की कला</b> - भगवद गीता की शिक्षाओं पर आधारित एक प्रेरणादायी सत्र, माननीय अतिथि <b>डॉ. संजय सिंह</b> द्वारा",
            },
            {
              year: "16-17 मई 2025",
              description:
                "<b>टेकक्रिति 2.0</b> - क्विज़ और कोडिंग चैलेंज, <b>सीएसई विभाग और टीम आर्यभट्ट, जीईएचयू</b> के सहयोग से",
            },
            {
              year: "15 फ़रवरी 2025",
              description:
                "<b>गीता सूत्र</b> - भगवद गीता की शिक्षाओं पर आधारित 6 सप्ताह का कार्यक्रम, <b>आईकेएस अनुमोदित प्रमाणपत्रों</b> के साथ",
            },
            {
              year: "27 नवम्बर 2024",
              description:
                "<b>सङ्कर्षण</b> - वेदिक साइंस क्लब का भव्य उद्घाटन कार्यक्रम, ग्राफिक एरा हिल यूनिवर्सिटी, देहरादून, उत्तराखंड, भारत में",
            },
          ],
        };

        // Function to render timeline
        function renderTimeline(data, containerId) {
          const container = document.getElementById(containerId);
          container.innerHTML = ""; // Clear existing content
          data.forEach((item) => {
            const card = document.createElement("div");
            card.className = "timeline-card";
            card.innerHTML = `
        <h4>${item.year}</h4>
        <p>${item.description}</p>
      `;
            container.appendChild(card);
          });
        }

        // Initial render when the page loads
        renderTimeline(timelineData.en, "timeline-en");
        renderTimeline(timelineData.hi, "timeline-hi");