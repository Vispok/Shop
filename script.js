let cart = [];
let totalPrice = 0;

// Function to add items to the cart
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
    calculateTotal();
    showPopup(); // Show popup when item is added to the cart
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';  // Clear previous cart items
    cart.forEach((cartItem, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        
        const itemText = document.createElement('span');
        itemText.textContent = `${cartItem.item} - ₹${cartItem.price}`;
        
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
    cart.splice(index, 1);  // Remove the item from the array
    updateCart();
    calculateTotal();
}

// Function to calculate the total price
function calculateTotal() {
    totalPrice = cart.reduce((total, cartItem) => total + cartItem.price, 0);
    
    // Update the displayed total price
    document.getElementById('total-price').textContent = totalPrice;
    
    // Show/hide payment instructions based on selected method
    const paymentMethod = document.getElementById('payment-method').value;
    const paymentInstructions = document.getElementById('payment-instructions');
    if (paymentMethod === 'UPI') {
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
