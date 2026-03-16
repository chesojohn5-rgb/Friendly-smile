async function payNow() {
  try {
    const response = await fetch("http://localhost:3000/pay", { // Step 9.3 explains the URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 200 // Replace with the amount you want to charge
      })
    });

    const data = await response.json();

    // Redirect customer to Lenco checkout page
    window.location.href = data.checkout_url;
  } catch (error) {
    console.error("Payment failed:", error);
    alert("Payment failed. Please try again.");
  }
}
