// ===== LENCO PAY CONFIG =====

const LENCO_PUBLIC_KEY = "pub-745f8f2bf396d94aa61027044bc30fb861a59a61de987f67"
const LENCO_CURRENCY = "ZMW"
const LENCO_CHANNELS = ["card", "mobile-money"]
const LOCAL_BACKEND = "http://localhost:3000"
const LIVE_BACKEND = "https://lenco-backend.onrender.com"
const USE_LIVE_BACKEND = true
const VERIFY_URL = `${USE_LIVE_BACKEND ? LIVE_BACKEND : LOCAL_BACKEND}/verify`

const generateReference = () => {
  const randomPart = Math.random().toString(36).slice(2, 8)
  return `ref-${Date.now()}-${randomPart}`
}

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value)

const getCustomerEmail = () => {
  const email = prompt("Enter your email to continue payment:")
  if (!email || !isValidEmail(email)) {
    alert("Please enter a valid email address.")
    return null
  }
  return email.trim()
}

// ===== PAYMENT FUNCTION =====

const verifyPayment = async (reference) => {
  try {
    const response = await fetch(`${VERIFY_URL}?reference=${encodeURIComponent(reference)}`)
    const data = await response.json()

    if (!response.ok) {
      console.error("Verification failed:", response.status, data)
      alert(data?.message || data?.error || "Verification failed. Try again.")
      return
    }

    const status = data?.data?.status || data?.status || "unknown"
    alert(`Verification status: ${status}`)
  } catch (error) {
    console.error("Verification error:", error)
    alert("Verification error. Please try again.")
  }
}

function payNow({ amount, product }) {
  if (!window.LencoPay) {
    alert("Lenco payment widget failed to load. Please refresh the page.")
    return
  }

  if (!LENCO_PUBLIC_KEY || LENCO_PUBLIC_KEY.includes("REPLACE_WITH")) {
    alert("Payment is not configured yet. Add your Lenco public key.")
    return
  }

  const email = getCustomerEmail()
  if (!email) return

  const reference = generateReference()

  window.LencoPay.getPaid({
    key: LENCO_PUBLIC_KEY,
    reference,
    email,
    amount,
    currency: LENCO_CURRENCY,
    label: product || "Purchase",
    channels: LENCO_CHANNELS,
    onSuccess: function (response) {
      const ref = response?.reference || reference
      alert(`Payment complete! Reference: ${ref}`)
      verifyPayment(ref)
    },
    onClose: function () {
      alert("Payment was not completed, window closed.")
    },
    onConfirmationPending: function () {
      alert("Your purchase will be completed when the payment is confirmed.")
    }
  })
}

const payButtons = document.querySelectorAll(".pay-now")
payButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const amount = Number(button.dataset.amount || 0)
    const product = button.dataset.product || "Purchase"

    if (!amount) {
      alert("Missing payment amount.")
      return
    }

    payNow({ amount, product })
  })
})


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
