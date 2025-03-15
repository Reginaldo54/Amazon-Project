import { formatCurrency } from "../utils/money.js";
// import { arrayProducts } from "./product-module";
import { getDeliveryOption } from "./deliveryOptions.js";
import { findProductById, ordersNumber } from "./productData.js";

export function calculateOrderSummary(arrayProducts) {
  
  // Shipping Calcule
  let itemCost = 0;
  let shippingPrice = 0;
  let qtdItems = 0;
 
  arrayProducts.forEach(element => {
    const product = findProductById(element.id)
    
    // item cost
    itemCost += Math.round(product.priceCents) * element.quantity;

    // qtd items
    qtdItems += element.quantity;

    // Shipping cost
    const deliveryOption = getDeliveryOption(element.deliveryOptionId);
    shippingPrice += deliveryOption.priceCents;
    
  });

  const totalBeforeTax = itemCost + shippingPrice;
  const tax            = totalBeforeTax * .1;
  const total          = totalBeforeTax + tax;

  const alternativeValue = 0.00;
  // Formated values
  const formatedItemCost       = formatCurrency(itemCost)||alternativeValue;
  const formatedShippingPrice  = formatCurrency(shippingPrice)||alternativeValue;
  const formatedTotalBeforeTax = formatCurrency(totalBeforeTax)||alternativeValue;
  const formatedTax            = formatCurrency(tax)||alternativeValue;
  const formatedTotal          = formatCurrency(total)||alternativeValue;

  const html = 
  `
    <div class="title-order">Order Summary</div>
      
      <div class="order-items">
        <div class="item-order-qtd">
          <span>Items (<span class="item-order-number">${qtdItems||0}</span>):</span>  <span class="item-order-price">$${formatedItemCost}</span>
        </div>

        <div class="order-shipping">
          <span>Shipping & handling:</span>
          <span class="order-shipping-price">
            $<span class="order-shipping-price-value">${formatedShippingPrice}</span>
          </span>
        </div>

        <div class="total-before-tax">
          <span>Total before tax:</span>
          <span class="total-before-tax-price">$<span class="total-before-tax-value">${formatedTotalBeforeTax}</span></span>
        </div>

      <div class="estimated-tax">
        <span>Estimated tax (10%):</span>
      <span class="estimated-tax-price"> $<span class="estimated-tax-value">${formatedTax}</span></span>
      </div>
    </div>
      
    <div class="order-total">
    <span>Order total:</span>
    <span class="order-total-price">$<span class="order-total-value">${formatedTotal}</span></span>
    </div>
    
    
    <button class="place-order-button" ${ordersNumber?'':'inert'}>
    Place your order
    </button>
  `
  
 return html;
}
