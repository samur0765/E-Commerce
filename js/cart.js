import { displayCartTotal, getFromLocalStorage, saveToLocalStorage, updateCartIcon } from "./helper.js";
import { renderCartItems } from "./ui.js";


let cart = getFromLocalStorage();

//Sepete ürün ekleyen fonksiyon
const addToCart = (e, products) => {

    //add-to-cart butonların tıklandığına butonları birbirinden ayırt etmek için bunlara data-id ile birer uniq id atadık.Bu sayede bu butonların birbirinde farklı olmasını sağladık.

    //Tıklanılan elemanın id'sine eriş

    const productId = +e.target.dataset.id;

    //İd'si bilinen ürünü product dizisi içerisinden bul 

    const product = products.find((product) => product.id === productId)

    //Eğer ürün varsa

    if (product) {

        //Bu ürünün sepete önceden eklendimi diye kontrol et
        const exitingItem = cart.find((item) => item.id === productId);
        if (exitingItem) {
            //Eğer ürün sepette varsa bunun miktarını bir arttır
            exitingItem.quantity++;
        }
        else {

            //Sepete eklenecek ürün için bir ürün objesi oluştur.
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image,
            };

            //Sepet dizisine oluşturulan elemanı ekle
            cart.push(cartItem);

            //Sepetteki ürün miktarını renderla
            updateCartIcon(cart);
        }
    }

    //Sepet dizisini localstroge'a kayıt et
    saveToLocalStorage(cart);

    //Add to cart butonunun içeriğni güncelle 
    e.target.innerText = "Added";

    //3s sonra Add to cart butonunun içeriğini eski haline çevir
    setTimeout(() => {
        e.target.innerText ="Add to cart";
    }, 2000);
};


//Sepetten ürün kaldıran fonksiyon

const removeFromCart  = (e) => {
    //Tıklanılan butonun id'sine eriş
   const productId = parseInt(e.target.dataset.id);

   //Tıklanılan elemanı sepet dizisinden kaldır

  cart = cart.filter((item) => item.id !== productId);

   //LocalStorga'ı güncelle
   saveToLocalStorage(cart);

   //Arayüzü renderla

   renderCartItems(cart);

   //Sepetteki ürün miktarını renderla
   updateCartIcon(cart);

   //Sepetteki toplam ürün fiyatını renderla
   displayCartTotal(cart);
}

//Sepetteki ürünlerin miktarını güncelleyen fonksiyon

const onQuantityChange = (e) => {
       //Yeni miktara eriş
       const newQuantity = +e.target.value;

       //Güncellenecek elemanın id'sine eriş
       const productId = +e.target.dataset.id;

    //Yeni miktar 0'dan büyükse güncellenecek elemanın miktarını güncelle
    if(newQuantity > 0){


    //Güncellenecek elemanı dizi içerisinden bul
    const updateItem = cart.find((item) => item.id === productId);
    
    //Güncellenecek elemanın miktarını güncelle
    updateItem.quantity = newQuantity;

    //Localstorge güncelle

    saveToLocalStorage(cart);

    //Sepetteki ürün miktarını renderla
    updateCartIcon(cart);

    
    }
     //Sepetteki toplam ürün fiyatını renderla
   displayCartTotal(cart);
};


export { addToCart,removeFromCart , onQuantityChange};