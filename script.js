// ===== CONFIG =====

// For LIVE backend (change this after deployment)
const LIVE_URL = "https://your-backend-url.onrender.com/pay"

// Switch between LOCAL and LIVE
const USE_LIVE = true   // 👉 change to true when deployed

// Select the correct URL
const API_URL = USE_LIVE ? LIVE_URL : LOCAL_URL


// ===== PAYMENT FUNCTION =====

async function payNow() {

  try {

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 200   // 💰 change this dynamically later
      })
    })

    const data = await response.json()

    if (data.checkout_url) {
      // Redirect user to Lenco payment page
      window.location.href = data.checkout_url
    } else {
      alert("Payment failed. No checkout URL received.")
      console.log(data)
    }

  } catch (error) {

    console.error("Error:", error)
    alert("Something went wrong. Try again.")

  }

}
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const backToTop = document.getElementById("back-to-top");

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }

    if (backToTop) {
      const toggleBackToTop = () => {
        backToTop.classList.toggle("show", window.scrollY > 320);
      };

      window.addEventListener("scroll", toggleBackToTop);
      toggleBackToTop();

      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
