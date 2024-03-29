// Smooth Scroll
$(document).ready(function() {
  $("a").on("click", function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        800,
        function() {
          window.location.hash = hash;
        }
      );
    }
  });
});

// Shopping Cart
function OpenShoppingCart() {
  const shoppingCart = document.querySelector(".shopping-cart");
  shoppingCart.style.transform = "translateX(0%)";
}
function CloseShoppingCart() {
  const shoppingCart = document.querySelector(".shopping-cart");
  shoppingCart.style.transform = "translateX(100%)";
}

// Side Nav Active Link
const links = document.querySelectorAll(".left-nav a");
links.forEach(link => {
  link.addEventListener("click", function() {
    changeActive(this);
    if (window.innerWidth < 600) {
      sideNav.style.transform = "translate(-100%)";
    }
  });
});

function changeActive(e) {
  links.forEach(link => {
    link.classList.remove("active-link");
  });
  e.classList.add("active-link");

  const home = document.querySelector(".logo a");
  home.addEventListener("click", () => {
    e.classList.remove("active-link");
    if (window.innerWidth < 600) {
      sideNav.style.transform = "translate(-100%)";
    }
  });
}

const navOpen = document.querySelector(".top-nav-left i");
const navClose = document.querySelector(".side-nav i");
const sideNav = document.querySelector(".side-nav");
navOpen.addEventListener("click", () => {
  sideNav.style.transform = "translateX(0%)";
});
navClose.addEventListener("click", () => {
  sideNav.style.transform = "translate(-100%)";
});
