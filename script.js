// ===== CONFIG =====

const LOCAL_URL = "http://localhost:3000/pay"
const LIVE_URL = "https://lenco-backend.onrender.com/pay"

const USE_LIVE = true

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
        amount: 200
      })
    })

    const data = await response.json()

    if (data.checkout_url) {
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
