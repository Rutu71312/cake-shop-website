document.addEventListener("DOMContentLoaded", function () {
    // Retrieve total price from localStorage (if not available, set to ₹0)
    let totalAmount = localStorage.getItem("totalPrice") || "0";
    document.getElementById("totalAmount").innerText = totalAmount;


    // Set estimated delivery date (3-5 days from today)
    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
    document.getElementById("deliveryDate").innerText = deliveryDate.toDateString();

    const paymentOptions = document.querySelectorAll("input[name='payment']");
    const cardDetails = document.getElementById("cardDetails");
    const upiDetails = document.getElementById("upiDetails");
    const qrCode = document.getElementById("qrCode");

    // Handle payment method selection
    paymentOptions.forEach(option => {
        option.addEventListener("change", function () {
            cardDetails.classList.add("hidden");
            upiDetails.classList.add("hidden");

            if (this.value === "card") {
                cardDetails.classList.remove("hidden");
            } else if (this.value === "upi") {
                upiDetails.classList.remove("hidden");
            }
        });
    });

    // Validate mobile number in real-time
    let mobileInput = document.getElementById("mobile");
    mobileInput.addEventListener("input", function () {
        let mobilePattern = /^[6-9]\d{9}$/; // Ensures 10-digit valid Indian mobile number
        if (!mobilePattern.test(this.value)) {
            this.style.border = "2px solid red";
            this.setCustomValidity("Enter a valid 10-digit Indian mobile number.");
        } else {
            this.style.border = "2px solid green";
            this.setCustomValidity("");
        }
    });

    // Place order logic
    document.getElementById("placeOrder").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent page reload

        let address = document.getElementById("address").value.trim();
        let mobile = mobileInput.value.trim();
        let selectedPayment = document.querySelector("input[name='payment']:checked");

        if (!address) {
            alert("Please enter your delivery address.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!selectedPayment) {
            alert("Please select a payment method.");
            return;
        }

        if (selectedPayment.value === "card") {
            let cardNumber = document.getElementById("cardNumber").value.trim();
            let cardHolder = document.getElementById("cardHolder").value.trim();
            let expiryDate = document.getElementById("expiryDate").value.trim();

            if (!cardNumber || !cardHolder || !expiryDate) {
                alert("Please fill in all card details.");
                return;
            }

            if (!/^\d{16}$/.test(cardNumber)) {
                alert("Invalid card number. Must be 16 digits.");
                return;
            }

            if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                alert("Invalid expiry date. Use MM/YY format.");
                return;
            }
        }

        // Success message
        // alert(`Order placed successfully! 
        // \nTotal Amount: ₹${totalAmount}
        // \nEstimated Delivery: ${document.getElementById("deliveryDate").innerText}`);

        // localStorage.removeItem("cart"); // Clear cart
        // window.location.href = "index.html"; // Redirect after order

        // Get cart data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Step 1: Send order to database
fetch("php/place_order.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `total=${totalAmount}&items=${JSON.stringify(cart)}`
})
.then(res => res.text())
.then(order_id => {

    // Step 2: Send payment data
    let method = selectedPayment.value;

    fetch("php/payment.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `order_id=${order_id}&amount=${totalAmount}&payment_method=${method}`
    })
    .then(res => res.text())
    .then(data => {

        if (data.trim() === "payment_success") {

            alert(`Order placed successfully!
            \nTotal Amount: ₹${totalAmount}
            \nEstimated Delivery: ${document.getElementById("deliveryDate").innerText}`);

            localStorage.removeItem("cart");
            localStorage.removeItem("totalPrice");

            window.location.href = "index.html";

        } else {
            alert("Payment failed");
        }

    });

})
.catch(error => {
    console.error("Error:", error);
});
    });
});
