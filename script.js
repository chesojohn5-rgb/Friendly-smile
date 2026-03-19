// ===== LENCO PAY CONFIG =====

const LENCO_PUBLIC_KEY = "pub-745f8f2bf396d94aa61027044bc30fb861a59a61de987f67"
const LENCO_CURRENCY = "ZMW"
const LENCO_CHANNELS = ["mobile-money"]
const DEFAULT_CUSTOMER_EMAIL_DOMAIN = "friendly-smile.com"
const LOCAL_BACKEND = "http://localhost:3000"
const LIVE_BACKEND = "https://lenco-backend.onrender.com"
const USE_LIVE_BACKEND = true
const VERIFY_URL = `${USE_LIVE_BACKEND ? LIVE_BACKEND : LOCAL_BACKEND}/verify`

const generateReference = () => {
  const randomPart = Math.random().toString(36).slice(2, 8)
  return `ref-${Date.now()}-${randomPart}`
}

const normalizePhone = (value) => value.replace(/[^\d]/g, "")
const isValidPhone = (value) => normalizePhone(value).length >= 7
const buildCustomerEmail = (phone) => `customer-${phone}@${DEFAULT_CUSTOMER_EMAIL_DOMAIN}`

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

function payNow({ amount, product, customer, networkLabel }) {
  if (!window.LencoPay) {
    alert("Lenco payment widget failed to load. Please refresh the page.")
    return
  }

  if (!LENCO_PUBLIC_KEY || LENCO_PUBLIC_KEY.includes("REPLACE_WITH")) {
    alert("Payment is not configured yet. Add your Lenco public key.")
    return
  }

  const reference = generateReference()

  window.LencoPay.getPaid({
    key: LENCO_PUBLIC_KEY,
    reference,
    email: customer.email,
    amount,
    currency: LENCO_CURRENCY,
    label: `${product || "Purchase"} - ${networkLabel}`,
    channels: LENCO_CHANNELS,
    customer: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone
    },
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

const paymentModal = document.getElementById("payment-modal")
const paymentForm = document.getElementById("payment-form")
const productNameEl = document.getElementById("payment-product")
const amountEl = document.getElementById("payment-amount")
const firstNameInput = document.getElementById("pay-first-name")
const lastNameInput = document.getElementById("pay-last-name")
const phoneInput = document.getElementById("pay-phone")
const networkSelect = document.getElementById("pay-network")
const amountInput = document.getElementById("pay-amount")
const closeButtons = document.querySelectorAll("[data-modal-close]")

let pendingPayment = null

const openPaymentModal = ({ amount, product }) => {
  if (!paymentModal || !paymentForm) return

  pendingPayment = { amount, product }
  if (productNameEl) productNameEl.textContent = product
  if (amountEl) amountEl.textContent = `K${Number(amount).toFixed(2)}`
  if (amountInput) amountInput.value = Number(amount).toFixed(2)

  paymentModal.classList.add("show")
  paymentModal.setAttribute("aria-hidden", "false")
  if (firstNameInput) {
    firstNameInput.focus()
  }
}

const closePaymentModal = () => {
  if (!paymentModal || !paymentForm) return
  paymentModal.classList.remove("show")
  paymentModal.setAttribute("aria-hidden", "true")
  paymentForm.reset()
  pendingPayment = null
}

closeButtons.forEach((button) => {
  button.addEventListener("click", closePaymentModal)
})

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && paymentModal?.classList.contains("show")) {
    closePaymentModal()
  }
})

const payButtons = document.querySelectorAll(".pay-now")
payButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const amount = Number(button.dataset.amount || 0)
    const product = button.dataset.product || "Purchase"

    if (!amount) {
      alert("Missing payment amount.")
      return
    }

    openPaymentModal({ amount, product })
  })
})

if (paymentForm) {
  if (amountInput && amountEl) {
    amountInput.addEventListener("input", () => {
      const value = Number(amountInput.value || 0)
      amountEl.textContent = `K${value.toFixed(2)}`
    })
  }

  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!pendingPayment) {
      alert("Missing payment details.")
      return
    }

    const firstName = firstNameInput?.value.trim() || ""
    const lastName = lastNameInput?.value.trim() || ""
    const phoneRaw = phoneInput?.value.trim() || ""
    const networkValue = networkSelect?.value || "airtel"
    const amountValue = Number(amountInput?.value || 0)

    if (!firstName || !lastName) {
      alert("Please enter your full name.")
      return
    }

    if (!phoneRaw || !isValidPhone(phoneRaw)) {
      alert("Please enter a valid mobile money number.")
      return
    }

    if (!amountValue || amountValue <= 0) {
      alert("Please enter a valid amount.")
      return
    }

    const networkLabel = networkValue === "mtn" ? "MTN Money" : "Airtel Money"
    const phone = normalizePhone(phoneRaw)
    const email = buildCustomerEmail(phone)

    const payment = pendingPayment
    closePaymentModal()

    payNow({
      amount: amountValue,
      product: payment.product,
      networkLabel,
      customer: {
        firstName,
        lastName,
        email,
        phone
      }
    })
  })
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
