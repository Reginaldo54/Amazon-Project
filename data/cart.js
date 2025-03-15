
import {arrayProducts,
  ordersNumber,
  addOrdersNumber,
  findProductById,
  saveChangeOnProduct,
  addProductOnArrayOrders
} from './productData.js';

import { deliveryOptionHTML, updateDeliveryOption } from './deliveryOptions.js';

import { calculateOrderSummary } from './orderSummary.js';


function createHTMLCheckout() 
{
  let productHTML = '';

  if (arrayProducts.length) {
   arrayProducts.forEach((element, index) => {
   
      let product
 
      product = findProductById(element.id);

      if(product)
      {
        
        productHTML += `
        <div class="checkout-product product-${index}">
              <div class="delivery-product-title">
                Delivery date: <span class="change-delivery">Select a Delivery Date</span>
              </div>
              <div class="checkout-product-main-container">
              <div class='checkout-product-img-info-etc'>
                <div class="checkout-product-image-container">
                  <img class="checkout-product-image" src="${product.image}" alt="">
                </div>
                <div class="checkout-product-info-container">
                  <div class="checkout-product-info">
                    <div class="checkout-product-name" title="${product.name}">
                      ${product.name}
                    </div>
                    <div class="checkout-product-price">
                      $<span class='checkout-product-price-value-teste'>${
                      element.quantity > 1 ? '<span>'+ ((product.priceCents) / 100).toFixed(2) +' -> ' + ' $<span class="checkout-product-price-value">' + ((product.priceCents * element.quantity) / 100).toFixed(2) + '</span> </span>': '<span class="checkout-product-price-value">' + ((product.priceCents) / 100).toFixed(2) + '</span>'
                      }</span>
                    </div>
                    <div class="checkout-product-quantity-container">
                      <div class="checkout-product-quantity js-quantity-${product.id}">Quantity: <span class="checkout-productquantity-change">${element.quantity}</span></div>
                      <span class="checkout-product-control-update-quantity js-update-quantity">Update</span>
                      <span class="checkout-product-control-delete-product js-delete-product js-delete-product-${product.id}">Delete</span>
                      
                    </div>
                  </div>
                </div>
              </div>
                <div class="delivery-option">
                  <div class="delivery-option-title">Choose a delivery option:</div>
                  ${deliveryOptionHTML(index, product.id)}
                </div>
              </div>
            </div>`
       
      }
    
      }) 
      
  }
  else
  {
    productHTML += `
      <div>Your Cart is Empty.</div>
      <a href='./amazon.html'>
        <button class='empty-order-button'>View products</button>
      </a>
      `
  }

  return productHTML;
  
}

export function renderProducts() 
{
 const productHTML = createHTMLCheckout();

 const orderSummary = document.querySelector('.order-summary');
 orderSummary.innerHTML = calculateOrderSummary(arrayProducts);
 orderSummary.style.opacity = arrayProducts.length?'1':'.8';

 document.querySelector('.products-orders').innerHTML = productHTML;
 document.querySelector('.items-qtd').innerHTML = `${ordersNumber} items`;

 // Reaply the listeners of the functions.
 deleteProduct();
 updateQtt(); // update Quantity
 chooseShipping();

 document.querySelector('.place-order-button')
   .addEventListener('click', () => {

     const total =  document.querySelector('.order-total-value').innerText;

     // Array Withing Array -> push products
     addProductOnArrayOrders(total);
        // Resetando Variaveis

     location.href='./orders.html';
   })

}

function deleteProduct()
{
 document.querySelectorAll('.js-delete-product').forEach((del, index)=>{
   del.addEventListener('click', () => {
     
     const quantity = document.querySelectorAll('.checkout-productquantity-change');
     const qtt = Number(quantity[index].innerText);
     
     addOrdersNumber(-qtt);
     // apaguei no array
     arrayProducts.splice(index, 1);
 
     saveChangeOnProduct();
 
     // rederizando elementos existentes.
     renderProducts();
 
 
   })
 });
}

function updateQtt() {
  let qttBefore;
  let content = [];
  document.querySelectorAll('.js-update-quantity')
  .forEach( (update, index) => {

    update.addEventListener('click', () => {
      const quantity = document.querySelectorAll('.checkout-productquantity-change');
      
      // //Só pode existir um update aberto.
      // for (let i = 0; i < quantity.length; i++) {
      //   console.log(quantity[i]);
      //   console.log(i !== index);
      //   console.log(quantity[i].innerHTML);
      //   if (i !== index  && quantity[i].innerHTML === `<input type='number' class="product-quantity-input" min = '1' max = '99'>`) {
          
      //     quantity[i].parentElement.parentElement.innerHTML = content[i];
          
      //   }
        
      // }
      
     
      if (update.innerText === 'Save') 
      {
        // pegando select
        const select = document.querySelectorAll('.product-quantity-input');
        
        update.innerText = 'Update'
 
        let qttAfter;
        if (select.length === 1) {
          qttAfter = Number(select[0].value);
        }
        else
        {
          qttAfter = Number(select[index].value);
        }
        
        // guardando valor
        
        const qttAtual =  qttAfter - qttBefore;

        
        // atualizando
        addOrdersNumber(qttAtual);
        
        arrayProducts[index].quantity = qttAfter; 
        
        // voltando para guardar um número.
        quantity[index].innerHTML = qttAfter;

        saveChangeOnProduct();
 
      } 
      else 
      {
        
        qttBefore = Number(quantity[index].innerText);
        quantity[index].innerHTML = `<input type='number' class="product-quantity-input" min = '1' max = '99'>`;
        
        content[index] = quantity[index].parentElement.parentElement.innerHTML;

        const select = document.querySelectorAll('.product-quantity-input');
      
        if (select.length === 1) {
          select[0].value = qttBefore;
        }
        else
        {
          select[index].value = qttBefore
        }
 
        update.innerText = 'Save';
      

      }


    })
   
  })
 
 }
 
 function chooseShipping()
{
//  const input = document.querySelectorAll('.option-input');
 const deliveryDate = document.querySelectorAll('.delivery-option-date');
 const changeDelivery = document.querySelectorAll('.change-delivery'); 
 
// vai funcionar para cada item.// um para cada.
 changeDelivery.forEach((changeDel, index) => 
 {
  
   const input = document.querySelectorAll(`.option-input-${index}`);
   input.forEach( (input, i) => 
   {
    const deliveryOptionId = input.dataset.deliveryOptionId;
     if (input.checked ) {
      
      
      changeDel.innerText =  deliveryDate[deliveryOptionId-1].innerText;
      
      const product = arrayProducts[index];
      product.arriveDate = deliveryDate[i].innerText;
      product.deliveryOptionId = deliveryOptionId;
      
     }

     input.addEventListener('click', () => 
     {
        // Atuaizando a data de chegada 
        updateDeliveryOption(arrayProducts[index], deliveryDate[i].innerText, deliveryOptionId);
      });

   });
   
 });
}