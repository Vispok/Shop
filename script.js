const cart = {
    "Maggi": 0,
    "Bourbon Biscuits": 0,
    "Punjabi Tadka Namkeen": 0
};

function addToCart(item) {
    cart[item]++;
    document.getElementById("cart").classList.remove("hidden");
    updateCart();
    calculateTotal();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = '';
    for (const item in cart) {
        if (cart[item] > 0) {
            cartItems.innerHTML += `<p>${item}: ${cart[item]}</p>`;
        }
    }
}

function calculateTotal() {
    const hostel = document.getElementById("hostel").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const basePrice = hostel === "BH1" ? 13 : 15;
    
    let total = 0;
    for (const item in cart) {
        total += cart[item] * basePrice;
    }

    if (paymentMethod === "COD") {
        total += 1; // Additional charge for Cash on Delivery
    }

    document.getElementById("total-price").innerText = total;

    // Show payment instructions if UPI is selected
    document.getElementById("payment-instructions").classList.toggle(
        "hidden", paymentMethod !== "UPI"
    );
}

function placeOrder() {
    if (document.getElementById("total-price").innerText == "0") {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("order-confirmation").classList.remove("hidden");
}
