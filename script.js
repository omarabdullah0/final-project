var addToCartButtons = document.querySelectorAll('.add-to-cart');
var cartItemsList = document.getElementById('cart-items');
var totalPriceElement = document.getElementById('total-price');
var cartHeader = document.querySelector('.cake-top');
var cart = [];

function addToCart(event) {
    var button = event.target;
    var card = button.parentElement;

    var itemName = card.querySelector('h2').textContent;
    var itemPrice = parseFloat(card.querySelector('.par-mony').textContent.replace('$', ''));
    var itemImage = card.querySelector('img').src; 

    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === itemName) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }

    if (!found) {
        var cartItem = {
            name: itemName,
            price: itemPrice,
            quantity: 1,
            image: itemImage 
        };
        cart.push(cartItem);
    }

    updateCart();
}

function updateCart() {
    cartItemsList.innerHTML = '';
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = cart[i].name + ' - $' + cart[i].price + ' x ' + cart[i].quantity;
        cartItemsList.appendChild(listItem);

        total += cart[i].price * cart[i].quantity;
    }

    totalPriceElement.textContent = total.toFixed(2);

    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }
    cartHeader.textContent = 'Your Cart (' + totalItems + ')';
}

for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addToCart);
}

var confirmOrderButton = document.getElementById('confirm-order');
confirmOrderButton.addEventListener('click', function () {
    if (cart.length > 0) {
        var orderItemsList = document.getElementById('order-items');
        orderItemsList.innerHTML = ''; 
        for (var i = 0; i < cart.length; i++) {
            var listItem = document.createElement('li');
            var image = document.createElement('img');
            image.src = cart[i].image; 
            listItem.appendChild(image);
            listItem.appendChild(document.createTextNode(cart[i].name + ' - $' + cart[i].price + ' x ' + cart[i].quantity));
            orderItemsList.appendChild(listItem);
        }
        document.querySelector('.order-summary').style.display = 'block';
        document.querySelector('.overlay').style.display = 'block'; 
    } else {
        alert('Your cart is empty.');
    }
});

var backToShopButton = document.getElementById('back-to-shop');
backToShopButton.addEventListener('click', function () {
    document.querySelector('.order-summary').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
});


