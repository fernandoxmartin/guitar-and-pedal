if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const removeItemButton = document.getElementsByClassName("remove-button");
  for (let i = 0; i < removeItemButton.length; i++) {
    let button = removeCartItems[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInput = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInput.length; i++) {
    let input = quantityInput[i];
    input.addEventListener("change", quantityChanged);
  }

  const addToCart = document.getElementsByClassName("atc");
  for (let i = 0; i < addToCart.length; i++) {
    let button = addToCart[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
  updateCartIcon();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
  updateCartIcon();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("shop-item")[0].innerText;
  let price = shopItem.getElementsByClassName("item-price")[0].innerHTML;
  addItemToCart(title, price);
  updateCartTotal();
}

function addItemToCart(title, price) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-rows");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemName = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerText == title) {
      alert("this is already added to the cart");
      return;
    }
  }

  let cartRowContents = `
    <div class="cart-item cart-column">
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="remove-button" type="button">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("remove-button")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  updateCartIcon();
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-rows");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}

function purchaseClicked() {
  alert("thank you for your purchase!");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
  updateCartIcon();
}

function updateCartIcon() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-rows");

  let icon = document.querySelector(".cart-counter i");

  let count = 0;
  for (let i = 0; i < cartRows.length; i++) {
    count = count + 1;
  }
  icon.dataset.count = `${count}`;
}
