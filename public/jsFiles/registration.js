
        const form = document.getElementById("registrationForm");
        const submitBtn = document.getElementById("registerButton");

        form.addEventListener("submit", async function (e) {
          e.preventDefault();

          // show loading
          submitBtn.classList.add("loading");
          submitBtn.textContent = "Submitting...";

          const formData = new FormData(form);
          const url =
            "https://script.google.com/macros/s/AKfycbwJCcbVNKf7qP4MrXoT7SD-XOZueEtWSbF8yTBxHY-lCRUjNrwO4eNAEJypL2mehhaJ/exec";

          try {
            const response = await fetch(url, {
              method: "POST",
              body: formData,
            });

            const result = await response.json();
            console.log("✅ Response from GAS:", result);

            if (result.result === "success") {
              alert("Form submitted successfully!");
              form.reset();
            } else {
              alert("Something went wrong. Try again.");
            }
          } catch (error) {
            console.error("❌ Error posting to GAS:", error);
            alert("Network error!");
          } finally {
            // remove loading state
            submitBtn.classList.remove("loading");
            submitBtn.textContent = "Submit Registration";
          }
        });
      