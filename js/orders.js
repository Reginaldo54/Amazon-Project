
// Mostrando o numero de produtos no cart
import {arrayProducts,arrayOrders, ordersNumber, addOrdersNumber, findProductById, findProductInOrder, findOrderById, saveChangeOnProduct} from '../data/productData.js'

// const productList = JSON.parse(localStorage.getItem('productList')) ?? [];

// HEADER
const cartNumber= document.querySelector('.cart-number');
cartNumber.innerText = ordersNumber;


function renderOrder()
{
  const ordersContainer = document.querySelector('.order-container')
  let containerHTML = '';
  // vendo se tem algo no array.
  if (arrayOrders.length) { //arrayOrders[0].arrayProducts
    arrayOrders.forEach((order, orderIndex) => {
      
      // Botando o Top da order
      containerHTML += 
      `      <div class="order">

        <section class="order-top">
  
          <div class="order-placed">
            <span class="order-title">Order Placed:</span>
            <span class="order-placed-value">${new Date(order.orderPlaced).toLocaleDateString('en-us', {month: 'long', day: "numeric"})}</span>
          </div>
          
          <div class="order-price">
            <span class="order-title">Total:</span>
            <span class="order-place-value">$${order.total}</span>
          </div>
  
          <div class="order-id">
            <span class="order-title">ID:</span>
            <span class="order-id-value">${order.id}</span>
          </div>
  
        </section>
  
      `

      // Botando os items da order.
      
      //const orderItems = document.querySelectorAll('.order-items');
      
      let orderItems = ' <section class="order-items">' // começo

      // meio
      order.products.forEach((element)=>{
        const product = findProductById(element.id);

       
       orderItems += ` <div class="order-item"> 
            <section class="order-item-image">
              <img src="${product.image}" alt="">
            </section>

            <div class='order-item-info-container'>
              <section class="order-item-info">
                <div class="order-item-name">${product.name}</div>
                <div class="order-item-arrive-date">Arriving on: ${element.arriveDate}</div>
                <div class="order-item-quantity">Quantity: ${element.quantity}</div>
                <button class="order-item-button-buy-again"  data-order-id = '${order.id}' data-product-id='${product.id}'}> 
                  <img src="./images/icons/buy-again.png" alt="icon of buy again">
                  Buy it again
                </button>
              </section>
              
              <a class="track-button-container" href='./tracking.html?orderId=${order.id}&productId=${product.id}'>
                <button class="track-button">Track Package</button>
              </a>
            </div>
          </div>
       `;

      })

      // fim
      orderItems += ' </section> </div>';

      // passando para Html principal
      containerHTML += orderItems;
      ordersContainer.innerHTML = containerHTML;

      
    });
  }
  else
  {
    ordersContainer.innerHTML = `
      <div style="margin-top: 15px; margin-bottom: 5px; font-size: 16px;">Your Order is Empty.</div>
      <a href='./amazon.html'>
        <button class='empty-order-button'>View products</button>
      </a>
      `
  }

 

  // Funções que vão rodar mais de uma vez.
  buyOneItemMore();

  // Atualizando cartNumber
  cartNumber.innerText = ordersNumber;


}

renderOrder();

function buttonAnimation(button, buttonIndex, timeout) {
  // Mudando contéudo do botão.
  const htmlInternoAnterior = 
  `<img src="./images/icons/buy-again.png" alt="icon of buy again">
          Buy it again`;
 
  button.innerHTML = `&#10003; Added`;
 
  if (!timeout[buttonIndex]) {
   timeout[buttonIndex] = setTimeout(() => {
      button.innerHTML = htmlInternoAnterior;
    }, 1123);
  }
  else
  {
    
    clearTimeout(timeout[buttonIndex]);

    timeout[buttonIndex] = setTimeout(() => {
      button.innerHTML = htmlInternoAnterior;
      
      }, 1123);
  }
}

function productIsOnCart(newProduct)
{
  let productValid;
  if (arrayProducts.length) {
     // Verificando se acho valor igual
     for (let index = 0; index < arrayProducts.length; index++) {
      
       productValid = arrayProducts[index].id === newProduct.id;
     
       if (productValid) 
       {
         arrayProducts[index].quantity++;
         break;
       }
      }
   }

    // se n é item novo
    if(!productValid)
    {
     arrayProducts.push(newProduct)
    } 
    
   addOrdersNumber(1);
   cartNumber.innerText = ordersNumber;
   saveChangeOnProduct();
}

function buyOneItemMore()
{
  const timeout = []; // variável auxiliar para a animação de multiplos butões
  document.querySelectorAll('.order-item-button-buy-again')
    .forEach((button, buttonIndex) => {
      button.addEventListener('click', (event) => { // click
        
        // Animation
        buttonAnimation(button, buttonIndex, timeout);
       
        // Pegado dados para um novo produto ser criado.
        const id = event.target.getAttribute('data-product-id');

        const newProduct = {
          id,
          quantity: 1,
          deliveryOptionId: '1'
        }
        
        // se tiver no cart, soma +1 a quantidade.
        productIsOnCart(newProduct)
           
       
      })
    })
}






