import { formatCurrency } from "../utils/money.js";
import { arrayProducts, saveChangeOnProduct } from "./productData.js";
import isWednesday from "../utils/date.js";
import {renderProducts} from '../data/cart.js'

const deliveryOptions = [
  {
    id: '1',
    deliveryTime: 7,
    priceCents: 0,
  },
  {
    id: '2',
    deliveryTime: 5,
    priceCents: 499
  },
  {
    id: '3',
    deliveryTime: 3,
    priceCents: 999
  }
]

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
      
    if (option.id === deliveryOptionId) {
      
      deliveryOption = option;
    }
  })

  return deliveryOption ?? {};
}


export function deliveryOptionHTML(optionIndex, productId) 
{
  let html = '';

  const option = {weekday: 'long', month: 'long', day: 'numeric'};

  deliveryOptions.forEach((deliveryOption, index) => {

    // Date
    const date = new Date();
    date.setDate( date.getDate() + deliveryOption.deliveryTime);
    
    const validDate = isWednesday(date);
  
    const dateString = validDate.toLocaleDateString('en-us', option);

    // Shipping
    let shipping;

    if (deliveryOption.priceCents === 0) {
      shipping = "FREE Shipping";
    } else {
      shipping = `$<span class='shipping-price'>${formatCurrency(deliveryOption.priceCents)}</span> - Shipping`
    }
    
   const checked = deliveryOption.id === arrayProducts[optionIndex].deliveryOptionId;
   
    
    html += 
    `
     <div class="delivery-option-item">
        <input type="radio" name="option-${optionIndex}" ${checked ? 'checked' : ''} class="option-input option-input-${optionIndex} delivery-product-id-${productId}-option-id-${deliveryOption.id}" data-delivery-option-id = '${deliveryOption.id}' >
        <div class="delivery-option-info">
          <div class="delivery-option-date">
            ${dateString}
          </div>
          
          <div class="delivery-option-price">
            ${shipping}
          </div>
        </div>
      </div>
    `
  })

  return html;
}

export function updateDeliveryOption(product, deliveryDate, deliveryOptionId)
{

  if (product instanceof Object) {
     // lógica de referencia do obj. -> alterar o produto aq, altera o produto dentro do array.
     product.arriveDate = deliveryDate;
     product.deliveryOptionId = deliveryOptionId;
     saveChangeOnProduct();
     renderProducts();
  }
  else
  {
    console.error(`Product: ${product} is undefined or other character.`)
  }
}