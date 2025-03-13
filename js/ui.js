//Ui elemenlarının tutulduğu obje

import { onQuantityChange, removeFromCart } from "./cart.js";

const elements = {
    menuIcon: document.querySelector("#menu-icon"),
    menu: document.querySelector(".navbar"),
    productList: document.querySelector("#product-list"),
    cartContainer: document.querySelector("#cart-items"),
    cartTotal:document.querySelector("#cart-total")
};

//Ürünün kartlarını render eden fonksiyon

const renderProducts = (products, addToCartFunction) => {
    //product dizisinin dön ve bir html dizisi oluştur
    const productsHtml = products.map((product) =>
        `<div class="product">
                <img src="${product.image}" alt="product-image" class="product-image">
                 <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">$${product.price}</p>
                    <a  class="add-to-cart" data-id="${product.id}">Add to cart</a>
                 </div>
            </div>`
    ).join(" "); 

    //oluşturulan html'i arayüze aktar
    elements.productList.innerHTML = productsHtml;

    //Classı add-to-cart olan elemanlara eriş

    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    //querrySelector metodu erişilen elemanları bir dizi şeklinde döndürdüğünden bu elemana direkt addEventListener ekleyemeyiz.Bunun için dizi içerisindeki elemanlara teker teker erişmemiz gerek .

    for (let i = 0; i < addToCartButtons.length; i++) {

        //dizinin içeresindeki butonlara teker teker eriş
        const addToCartButton = addToCartButtons[i];

        //Erişilen elemana bir click olayı ekle

        addToCartButton.addEventListener("click", addToCartFunction)
    }
}

//Sepetteki ürünleri renderlayan fonksiyon

const renderCartItems = (cart) => {
    elements.cartContainer.innerHTML = cart.map((item) => ` <div class="cart-item">
                    <img src="${item.image}" alt="">
                    <div class="cart-item-info">
                        <h2 class="cart-title">${item.title}</h2>
                        <input type="number" min="1" 
                        value="${item.quantity}" class="cart-item-quantity" data-id="${item.id}">
                    </div>
                    <h2 class="cart-item-price">$${item.price}</h2>
                    <button class="remove-from-cart" data-id="${item.id}">remove</button>
                </div>`).join("");

                //Remove butonlarına eriş

              const removeButtons =  document.querySelectorAll(".remove-from-cart");

              //Remove butonlara olay izleyicisi ekle
              for(let i=0; i<removeButtons.length; i++){
                //Remove buttonlara eriş
               const removeButton = removeButtons[i];

               //Remove butonlara olay izleyicisi ekle
               removeButton.addEventListener("click", removeFromCart)
               
              }

              //Quantity inputlarına eriş
            const quantityInputs =  document.querySelectorAll(".cart-item-quantity");

           // Quantity inputlarına eriş ve herbirine bir olay izleyicisi ekle
           for(let k = 0; k< quantityInputs.length; k++){
            const quantityInput = quantityInputs[k];

            quantityInput.addEventListener("change", onQuantityChange)
           }
};


export { elements, renderProducts, renderCartItems };