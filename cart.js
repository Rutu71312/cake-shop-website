// //Add to cart
// let iconCart = document.querySelector('#cart-btn');
// let closeCart = document.querySelector('.close');
// let body = document.querySelector('body');
// let listProductHtml = document.querySelector('.product-row');
// let listCartHTML = document.querySelector('.listCart');
// let iconCartSpan = document.querySelector('#cart-count');

// let listProducts = [];
// let carts = [];

// iconCart.addEventListener('click', () => {
//      body.classList.toggle('showCart');
// })

// closeCart.addEventListener('click', () => {
//      body.classList.toggle('showCart');
// })

// const addDataToHTML = () =>{
//    listProductHtml.innerHTML = '';
//    if(listProducts.length > 0){
//        listProducts.forEach(product =>{
//           let newProduct = document.createElement('div');
//           newProduct.classList.add('item');
//           newProduct.dataset.id = product.id;
//           newProduct.innerHTML = `
//              <div class="swiper-slide box" class="item">
//                     <div class="img">
//                         <img src="${product.image}" alt="">
//                     </div>
//                     <div class="product-content">
//                         <h3>${product.name}</h3>
//                         <p>${product.price}</p>
//                         <div class="orderNow">
//                             <button>Order Now</button>
//                         </div>
//                         <div class="addCart">
//                             <button class="add-to-Cart"> Add To Cart</button>
//                         </div>
//                     </div>
//               </div>
//           `;
//           listProductHtml.appendChild(newProduct);
//        })
//    }
// }
// listProductHtml.addEventListener('click',(event)=>{
//    let positionClick = event.target;
//    if(positionClick.classList.contains('add-to-Cart')){
//     let item = positionClick.closest('.item');
      
//     // Log the item to ensure we selected it correctly
//     console.log(item);

//     // Apply some visual changes (highlight the item for example)
//     item.classList.add('highlight');  // Add a 'highlight' class for styling

//     // Get product ID from data-id attribute
//     let product_id = item.dataset.id;
//     addToCart(product_id);
      
//    }
// })

// const addToCart = (product_id) => {
//   let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
//     if(carts.length <=0){
//        carts = [{
//             product_id: product_id,
//             quantity: 1
//        }]
//     }
//     else if(positionThisProductInCart < 0){
//         carts.push({
//           product_id: product_id,
//           quantity: 1
//         })
//     }
//     else{
//        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
//     }
//     addCartToHTML(); 
//     addCartToMemory();

//     //database insert code
//     // 🔥 SEND DATA TO DATABASE
//     fetch("php/add_to_cart.php", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: `product_id=${product_id}&quantity=1`
//     })
//     .then(res => res.text())
//     .then(data => {
//         console.log("DB Response:", data);
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });
// }

// const addCartToMemory = () =>{
//   localStorage.setItem('cart',JSON.stringify(carts));
// }

// const addCartToHTML = () =>{
//   listCartHTML.innerHTML = '';
//   let totalQuantity = 0;
//   let totalPrice = 0;

//   if(carts.length > 0){
//     carts.forEach(cart => {
//        let product = listProducts.find(p => p.id == cart.product_id);
//        totalQuantity += cart.quantity;
//        totalPrice += product.price * cart.quantity;
        
//        let newCart = document.createElement('div');
//        newCart.classList.add('item');
//        newCart.dataset.id = cart.product_id;
//        let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
//        let info = listProducts[positionProduct];
//        newCart.innerHTML = `
//         <div class="image">
//             <img src="${info.image}" alt="">
//         </div>
//         <div class="name">
//         ${info.name}
//         </div>
//         <div class="totalPrice">
//            $${info.price * cart.quantity}
//         </div>
//         <div class="quantity">
//             <span class="minus"><</span>
//             <span>${cart.quantity}</span>
//             <span class="plus">></span>
//         </div>
//        `;
//        listCartHTML.appendChild(newCart);
//     })
//   }
//   iconCartSpan.innerText = `${totalQuantity}`;

//   // 💾 Save total price to localStorage
//   localStorage.setItem("totalPrice", totalPrice);
// }

// listCartHTML.addEventListener('click',(event) =>{
//     let positionClick = event.target;
//     if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
//          let product_id = positionClick.parentElement.parentElement.dataset.id;
//          let type= 'minus';
//          if(positionClick.classList.contains('plus')){
//              type = 'plus';
//          }
//          changeQuantity(product_id, type);
//     }
// })

// const changeQuantity = (product_id, type) => {
//     let positionItemInCart =carts.findIndex((value) => value.product_id == product_id)
//     if(positionItemInCart >= 0)
//     {
//       switch (type) {
//         case 'plus':
//           carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
//           break;
      
//         default:
//           let valueChange =carts[positionItemInCart].quantity -1;
//           if (valueChange > 0) {
//               carts[positionItemInCart].quantity = valueChange;
//           }
//           else{
//             carts.splice(positionItemInCart, 1);
//           }
//           break;
//       }
//     }
//     addCartToMemory();
//     addCartToHTML();
// }

// const initApp = () =>{
//    //get data from json
//    fetch('get_products.php')
//    .then(response => response.json())
//    .then(data =>{
//        listProducts = data;
//        addDataToHTML();   

//        //get cart from memory
//        if(localStorage.getItem('cart')){
//            carts = JSON.parse(localStorage.getItem('cart'));
//            addCartToHTML();
//        }
//    })
// }
// initApp();

// //---------------------------------------------------------------------------

// function checkout() {
//     const totalPrice = localStorage.getItem("totalPrice");

//     if (!totalPrice || totalPrice === "0") {
//         alert("Your cart is empty!");
//         return;
//     }

//     window.location.href = "payment.html";
// }

let listProductHtml = document.querySelector('.product-row');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('#cart-count');

let iconCart = document.querySelector('#cart-btn');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

// OPEN CART
iconCart.addEventListener('click', () => {
    body.classList.add('showCart');
});

// CLOSE CART
closeCart.addEventListener('click', () => {
    body.classList.remove('showCart');
});

let carts = [];
let listProducts = [];

// ==========================
// LOAD PRODUCTS FROM JSON
// ==========================
fetch('product.json')
    .then(res => res.json())
    .then(data => {
        listProducts = data;
        displayProducts();
        loadCart();
    });

// ==========================
// DISPLAY PRODUCTS
// ==========================
function displayProducts() {
    listProductHtml.innerHTML = '';

    listProducts.forEach(product => {
        let div = document.createElement('div');
        div.classList.add('box', 'item');
        div.dataset.id = product.id;

        div.innerHTML = `
            <div class="img">
                <img src="${product.image}">
            </div>
            <div class="product-content">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button class="add-to-Cart">Add To Cart</button>
            </div>
        `;

        listProductHtml.appendChild(div);
    });
}

// ==========================
// CLICK EVENT (ADD TO CART)
// ==========================
listProductHtml.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-Cart')) {

        let item = e.target.closest('.item');

        if (!item) return; // prevent null error

        let product_id = item.dataset.id;

        addToCart(product_id);
    }
});

// ==========================
// ADD TO CART FUNCTION
// ==========================
function addToCart(product_id) {

    let index = carts.findIndex(p => p.product_id == product_id);

    if (index < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[index].quantity++;
    }

    updateCartUI();
    saveCart();

    // 🔥 SEND TO DATABASE
    fetch("php/add_to_cart.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `product_id=${product_id}&quantity=1`
    })
    .then(res => res.text())
    .then(data => console.log("DB:", data))
    .catch(err => console.error(err));
}

// ==========================
// UPDATE CART UI
// ==========================
function updateCartUI() {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;

    carts.forEach(cart => {
        let product = listProducts.find(p => p.id == cart.product_id);
        if (!product) return;

        totalQuantity += cart.quantity;
        totalPrice += product.price * cart.quantity; // ✅ FIX

        let div = document.createElement('div');
        div.classList.add('item');
        div.dataset.id = cart.product_id;

        div.innerHTML = `
            <div class="name">${product.name}</div>

            <div class="quantity">
                <span class="minus">-</span>
                <span>${cart.quantity}</span>
                <span class="plus">+</span>
            </div>

            <div class="price">₹${product.price * cart.quantity}</div>
        `;

        listCartHTML.appendChild(div);
    });

    // ✅ update cart icon
    iconCartSpan.innerText = totalQuantity;

    // ✅ SAVE TOTAL PRICE (VERY IMPORTANT)
    localStorage.setItem("totalPrice", totalPrice);
}

listCartHTML.addEventListener('click', (e) => {

    if (e.target.classList.contains('plus') || e.target.classList.contains('minus')) {

        let item = e.target.closest('.item');
        let product_id = item.dataset.id;

        let type = e.target.classList.contains('plus') ? 'plus' : 'minus';

        changeQuantity(product_id, type);
    }
});

function changeQuantity(product_id, type) {

    let index = carts.findIndex(p => p.product_id == product_id);

    if (index >= 0) {

        if (type === 'plus') {
            carts[index].quantity++;
        } else {
            carts[index].quantity--;

            if (carts[index].quantity <= 0) {
                carts.splice(index, 1);
            }
        }
        }

    updateCartUI();
    saveCart();
}  

// ==========================
// SAVE CART (LOCAL STORAGE)
// ==========================
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(carts));
}

// ==========================
// LOAD CART
// ==========================
function loadCart() {
    let data = localStorage.getItem('cart');

    if (data) {
        carts = JSON.parse(data);
        updateCartUI();
    }
}

// ==========================
// CHECKOUT
// ==========================


function checkout() {

    // ❌ prevent empty cart checkout
    if (carts.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // ✅ redirect to payment page
    window.location.href = "payment.html";
}
