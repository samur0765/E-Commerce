import { elements } from "./ui.js";

//LocalStorage'a ekleme yapan fonksiyon
const saveToLocalStorage = (cart) => {
    //Dışarıdan verilen elemanı json.stringfy ile stringe çevir ve localStorga'a ekle
    localStorage.setItem("cart", JSON.stringify(cart));
};

//LocalStorage'dan eleman alan fonksiyon
const getFromLocalStorage = () => {
    //localstroge'daki cart key'ine sahip elemanları localstroge'dan al

    const strData = localStorage.getItem("cart");

    //Eğer localStroage'da veri varsa bunu Json.parse ile dönüştür ve return et ama yoksa boş bir dizi return et 
    return strData ? JSON.parse(strData) : [];
};



//Sepetteki ürün miktarını sepet iconu yanında render etecek fonksiyon

const updateCartIcon = (cart) => {
    //Sepet iconuna eriş
    const cartIcon = document.querySelector("#cart-icon");

    //Sepetteki toplam ürün miktarına eriş
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    //Sepet iconu yanında toplam ürün miktarını render et

    cartIcon.setAttribute("data-quantity", totalQuantity)
}

//Sepetteki toplam fiyatı hesaplayan fonksiyon

const calculateCartTotal = (cart) => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0)
};

//Sepetteki toplam ürün fiyatını renderlayan fonksiyon

const displayCartTotal = (cart) => {

    //Toplam ürün fiyatını hesaplayan fonksiyonu çalıştır
    const total = calculateCartTotal(cart);

    //Sepetteki toplam ürün fiyatını render et 
    elements.cartTotal.textContent = `Total:$ ${total.toFixed(2)}`;
};




export { saveToLocalStorage, getFromLocalStorage, updateCartIcon, calculateCartTotal, displayCartTotal };