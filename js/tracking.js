import {findOrderById, findProductById, findProductInOrder} from '../data/product-module.js';
// Mostrando o numero de produtos no cart
let ordersNumber = JSON.parse(localStorage.getItem('qtdProduct')) ?? 0;

const cartNumber= document.querySelector('.cart-number');
cartNumber.innerText = ordersNumber;

const productInfo = JSON.parse(localStorage.getItem('product-tracked'));

  // Picking ids from the URL
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');
  
  // Picking elements
  const order = findOrderById(orderId);
  console.log(order)
  const productInOrder = findProductInOrder(order, productId);
  

function renderProduct() {
 
  const tarckedProduct = document.querySelector('.tracked-product-container');
  const productInfo = findProductById(productId);


  tarckedProduct.innerHTML = `<a href="./orders.html" class="going-orders-page">View all orders</a>
  <div class="tracked-product-info">
    <h2 class="product-title">Arriving on <span class="product-arrive-date">${productInOrder.arriveDate}</span></h2>
    <div class="product-name">${productInfo.name}</div>
    <div class="product-quantity-container">
      Quantity: ${productInOrder.quantity}
    </div>
    <div class="product-image-container">
      <img class="product-image" src="${productInfo.image}">
    </div>
  </div>`

}

renderProduct();

function getProgressInPercent() {
  const arriveDate  = new Date(productInOrder.arriveDate + ' 2025');
  const orderDate   = new Date(order.orderPlaced)
  const currentDate = new Date();
  
  // convertendo miliseconds em dia
  const day = 24*60*60*1000;
  const diasPassados = (currentDate - orderDate)/day;
  const totalDays    = (arriveDate - orderDate)/day;
  
  const porcentagem = Math.round((diasPassados/totalDays)*100); // obtendo porcentagem
  return porcentagem;
}

function barProgressIncrease(add, progressAdd) {
  const progressBarState = document.querySelector('.progress-bar-state');
  const productProgressBar = document.querySelector('.product-progress-bar');
  const progressBar = document.querySelector('.progress-bar');

  //================ Datas
  const porcentagem = getProgressInPercent();

  // Valores minumos e tal
  const barMaxWidth = productProgressBar.offsetWidth;
  let barWidth = (barMaxWidth*porcentagem)/100;
  
  progressBar.style.width = `${porcentagem}%`;
  
  // Regra de mudar cor dos textos
  if (barWidth > barMaxWidth * .02) {
    progressBarState.children[0].classList.add('product-progress-concluded');
  }
  
  if (barWidth > barMaxWidth* .5) {
    progressBarState.children[1].classList.add('product-progress-concluded');
  }

  if (barWidth >= barMaxWidth) {
    progressBarState.children[2].classList.add('product-progress-concluded');
    clearInterval(progressAdd);
  }

  
}

const progressAdd = setInterval(() => {
  barProgressIncrease(55, progressAdd);
},1000 );
















