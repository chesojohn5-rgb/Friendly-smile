// ===== CONFIG =====

// For LOCAL testing (when running node server.js)
const LOCAL_URL = "http://localhost:3000/pay"

// For LIVE backend (change this after deployment)
const LIVE_URL = "https://your-backend-url.onrender.com/pay"

// Switch between LOCAL and LIVE
const USE_LIVE = false   // 👉 change to true when deployed

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
