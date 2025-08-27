
  document.addEventListener("DOMContentLoaded", () => {
    const plusButtons = document.querySelectorAll(".plus-btn");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartModal = document.getElementById("cart-modal");
    const cartItemsList = document.getElementById("cart-items");
    const checkoutBtn = document.getElementById("checkout-btn");
    const closeCartBtn = document.getElementById("close-cart");
  
    plusButtons.forEach(button => {
      button.addEventListener("click", () => {
        const quantitySpan = button.parentElement.querySelector(".quantity");
        let currentQty = parseInt(quantitySpan.textContent);
        quantitySpan.textContent = currentQty + 1;
      });
    });
  
    let cart = {};
  
    addToCartButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const coffeeItem = btn.closest(".coffee-item");
        const name = coffeeItem.querySelector("p").textContent;
        const quantitySpan = coffeeItem.querySelector(".quantity");
        let quantity = parseInt(quantitySpan.textContent);
  
        if (quantity > 0) {
          if (cart[name]) {
            cart[name] += quantity;
          } else {
            cart[name] = quantity;
          }
          quantitySpan.textContent = "0";
          updateCartUI();
          cartModal.style.display = "block";
        } else {
          alert("Veuillez sélectionner une quantité avant d'ajouter au panier.");
        }
      });
    });
  
    function updateCartUI() {
      cartItemsList.innerHTML = "";
      for (const [product, qty] of Object.entries(cart)) {
        const li = document.createElement("li");
        li.textContent = product + " x " + qty;
        cartItemsList.appendChild(li);
      }
    }
  
    closeCartBtn.addEventListener("click", () => {
      cartModal.style.display = "none";
    });
  
    checkoutBtn.addEventListener("click", () => {
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "checkout.html";
    });
  });
  // Make sure the DOM is fully loaded before running anything
document.addEventListener('DOMContentLoaded', () => {
  let total = 0;

  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const coffeeItem = button.closest('.coffee-item');
      const priceSpan = coffeeItem.querySelector('.item-price');

      if (!priceSpan) return;

      const price = parseFloat(priceSpan.textContent.trim());

      if (isNaN(price)) {
        console.error("Invalid price:", priceSpan.textContent);
        return;
      }

      total += price;

      const totalDisplay = document.getElementById('total');
      if (totalDisplay) {
        totalDisplay.textContent = total.toFixed(2);
      }

      const checkoutLink = document.getElementById('checkoutBtn');
      if (checkoutLink) {
        checkoutLink.href = `payment.html?total=${total.toFixed(2)}`;
      }
    });
  });
});
