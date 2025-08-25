const bookData = {
        english: {
            book_title: "Bhagavad Gita As It Is",
            Author: "His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada",
            Description:
                "The timeless conversation between Lord Krishna and Arjuna, presenting the science of self-realization and the path to spiritual enlightenment.",
            content: {
                // Introduction:
                //     "/library/bg/",
                // Preface: "/library/bg/",
                // "Disciplic Succession":
                //     "/library/bg/disciplic_succession",
                "Chapter One: Observing the Armies on the Battlefield of Kurukṣetra":
                    "/library/bg/1",
                "Chapter Two: Contents of the Gītā Summarized":
                    "/library/bg/2",
                "Chapter Three: Karma-yoga":
                    "/library/bg/3",
                "Chapter Four: Transcendental Knowledge":
                    "/library/bg/4",
                "Chapter Five: Karma-yoga – Action in Kṛṣṇa Consciousness":
                    "/library/bg/5",
                "Chapter Six: Dhyāna-yoga":
                    "/library/bg/6",
                "Chapter Seven: Knowledge of the Absolute":
                    "/library/bg/7",
                "Chapter Eight: Attaining the Supreme":
                    "/library/bg/8",
                "Chapter Nine: The Most Confidential Knowledge":
                    "/library/bg/9",
                "Chapter Ten: The Opulence of the Absolute":
                    "/library/bg/10",
                "Chapter Eleven: The Universal Form":
                    "/library/bg/11",
                "Chapter Twelve: Devotional Service":
                    "/library/bg/12",
                "Chapter Thirteen: Nature, the Enjoyer, and Consciousness":
                    "/library/bg/13",
                "Chapter Fourteen: The Three Modes of Material Nature":
                    "/library/bg/14",
                "Chapter Fifteen: The Yoga of the Supreme Person":
                    "/library/bg/15",
                "Chapter Sixteen: The Divine and Demoniac Natures":
                    "/library/bg/16",
                "Chapter Seventeen: The Divisions of Faith":
                    "/library/bg/17",
                "Chapter Eighteen: Conclusion – The Perfection of Renunciation":
                    "/library/bg/18",
            },
        },
        hindi: {
            book_title: "श्रीमद् भगवद्गीता  यथारूप",
            Author: "परम पूज्य ए.सी. भक्तिवेदांत स्वामी श्रील प्रभुपाद",
            Description:
                "भगवान कृष्ण और अर्जुन के बीच शाश्वत संवाद, आत्म-साक्षात्कार के विज्ञान और आध्यात्मिक ज्ञान के मार्ग को प्रस्तुत करता है।",
            content: {
                // आमुख: "/library/bg/",
                // भूमिका: "/library/bg/",
                // "गुरु परंपरा":
                //     "/library/bg/disciplic_succession",
                "अध्याय एक: कुरुक्षेत्र के युद्धस्थल में सैन्यनिरीक्षण":
                    "/library/bg/1",
                "अध्याय दो: गीता का सार":
                    "/library/bg/2",
                "अध्याय तीन: कर्म-योग":
                    "/library/bg/3",
                "अध्याय चार: दिव्य ज्ञान":
                    "/library/bg/4",
                "अध्याय पाँच: कर्मयोग - कृष्णभावनाभावित कर्म":
                    "/library/bg/5",
                "अध्याय छह: ध्यान-योग":
                    "/library/bg/6",
                "अध्याय सात: भगवद्ज्ञान":
                    "/library/bg/7",
                "अध्याय आठ: भगवत्प्राप्ति":
                    "/library/bg/8",
                "अध्याय नौ: परम गुह्य ज्ञान":
                    "/library/bg/9",
                "अध्याय दस: श्रीभगवान् का ऐश्वर्य":
                    "/library/bg/10",
                "अध्याय ग्यारह: विराट रूप":
                    "/library/bg/11",
                "अध्याय बारह: भक्तियोग":
                    "/library/bg/12",
                "अध्याय तेरह: प्रकृति, पुरुष तथा चेतना":
                    "/library/bg/13",
                "अध्याय चौदह: प्रकृति के तीन गुण":
                    "/library/bg/14",
                "अध्याय पंद्रह: पुरुषोत्तम योग":
                    "/library/bg/15",
                "अध्याय सोलह: दैवी और आसुरी स्वभाव":
                    "/library/bg/16",
                "अध्याय सत्रह: श्रद्धा के विभाग":
                    "/library/bg/17",
                "अध्याय अठारह: उपसंहार - संन्यास की सिद्धि":
                    "/library/bg/18",
            },
        },
    };

document.addEventListener("DOMContentLoaded", function () {
    loadContent("english");
});

function loadContent(language) {
    const langData = bookData[language];

    document.getElementById(
        `book-title-${language === "english" ? "en" : "hi"}`
    ).textContent = langData.book_title;

    document.getElementById(
        `book-author-${language === "english" ? "en" : "hi"}`
    ).textContent = langData.Author || "";

    document.getElementById(
        `book-description-${language === "english" ? "en" : "hi"}`
    ).textContent = langData.Description;

    const tocList = document.getElementById(
        `table-of-contents-${language === "english" ? "en" : "hi"}`
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
  