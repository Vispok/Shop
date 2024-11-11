let cart = [];
let totalPrice = 0;

// Function to add items to the cart
function addToCart(item) {
    const price = 13;  // Base price of all items is ₹13
    
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.item === item);
    if (existingItemIndex !== -1) {
        // If item exists, increment the quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // If item doesn't exist, add new item with quantity 1
        cart.push({ item, price, quantity: 1 });
    }
    
    updateCart();
    calculateTotal();
    showPopup(); // Show popup when item is added to the cart
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';  // Clear previous cart items
    
    // Loop through cart to display items
    cart.forEach((cartItem, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        
        // Display item with quantity
        const itemText = document.createElement('span');
        itemText.textContent = `${cartItem.item} x${cartItem.quantity} - ₹${cartItem.price * cartItem.quantity}`;
        
        // Add "Remove" button to reduce the quantity or remove the item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function() {
            removeItem(index);
        };
        
        itemDiv.appendChild(itemText);
        itemDiv.appendChild(removeButton);
        
        cartItemsContainer.appendChild(itemDiv);
    });

    // Show the cart
    document.getElementById('cart').classList.remove('hidden');
}

// Function to remove an item from the cart
function removeItem(index) {
    // Decrease the quantity of the item
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        // If quantity is 1, remove the item entirely
        cart.splice(index, 1);
    }
    
    updateCart();
    calculateTotal();
}

// Function to calculate the total price
function calculateTotal() {
    let total = cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
    
    // Get the selected hostel and payment method
    const selectedHostel = document.getElementById('hostel').value;
    const selectedPaymentMethod = document.getElementById('payment-method').value;

    // Apply extra charges based on the selected hostel
    if (selectedHostel === "BH2") {
        total += cart.length * 2;  // ₹2 extra per item for BH2
    }

    // Apply extra charges based on the selected payment method
    if (selectedPaymentMethod === "COD") {
        total += cart.length * 1;  // ₹1 extra per item for Cash on Delivery
    }

    // Update the total price
    totalPrice = total;
    document.getElementById('total-price').textContent = totalPrice;

    // Show/hide payment instructions based on selected method
    const paymentInstructions = document.getElementById('payment-instructions');
    if (selectedPaymentMethod === 'UPI') {
        paymentInstructions.classList.remove('hidden');
    } else {
        paymentInstructions.classList.add('hidden');
    }
}

// Function to show the "Item Added to Cart" popup
function showPopup() {
    const popup = document.getElementById('add-to-cart-popup');
    popup.classList.add('show'); // Display the popup
    setTimeout(function() {
        popup.classList.remove('show'); // Hide the popup after 3 seconds
    }, 3000);
}

// Function to place the order (simplified for this example)
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Order placed successfully!');
    document.getElementById('order-confirmation').classList.remove('hidden');
}
