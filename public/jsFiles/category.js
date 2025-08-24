  
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

        categoryCard.innerHTML = `
          <div class="category-title">
            <span class="category-icon">${category.icon}</span>
            ${category.title}
          </div>
          <ul class="verses-list">
            ${category.verses.map(
              (verse) => `
                <li class="verse-item" onclick="navigateToVerse('${verse.ref}')">
                  <span class="verse-reference">${verse.ref}</span>
                  <span class="verse-description">${verse.desc}</span>
                </li>
              `
            ).join("")}
          </ul>
        `;

        grid.appendChild(categoryCard);
      });
    }

   function navigateToVerse(verseRef) {
  const [chapter, verse] = verseRef.split(".");
  window.location.href = `/library/bg/${chapter}/${verse}`;
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
    });