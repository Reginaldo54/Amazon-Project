
import {arrayProducts, reloadLocalStorage, ordersNumber} from '../../data/productData.js';
import { renderProducts } from "../../data/cart.js";
import { updateDeliveryOption } from '../../data/deliveryOptions.js';

describe('Test Suit: Cart test', () => {

  const productId1 = "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c";
  const productId2 = "4e37dd03-3b23-4bc6-9ff8-44e112a92c64";

  beforeEach(() => {
    //document.querySelector('.js-checkout-product-grid').innerHTML = '';
     // Criando um container temporário para os elementos
        document.querySelector('.js-checkout-product-grid').innerHTML = `
        <div class="js-checkout-product-grid">
          <a class="items-qtd" href="./amazon.html" title="Pick more items">0 items</a>
        </div>
    
        <div class="products-orders"></div>
        <div class="order-summary"></div>
      `;
    
      // Alterando LocalStorage GetItem
      const call = [];
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => {
        if (!call[0]) {
          call[0] = 'called';
          return JSON.stringify([
            {
              id: productId1,
              quantity: 2,
              deliveryOptionId: '1'
            },
            {
              id: productId2,
              quantity: 1,
              deliveryOptionId: '2'
            }
          ]);
        } else if (!call[1]) {
          call[1] = 'called';
          return JSON.stringify(3);
        } else if (!call[2]) {
          call[1] = 'called';
          return JSON.stringify([{
            "id": "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
            "image": "images/products/men-navigator-sunglasses-brown.jpg",
            "name": "Men's Navigator Sunglasses Pilot",
            "rating": {
              "stars": 3.5,
              "count": 42
            },
            "priceCents": 1690,
            "keywords": [
              "sunglasses",
              "glasses",
              "accessories",
              "shades"
            ]
          },{
            "id": "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
            "image": "images/products/non-stick-cooking-set-15-pieces.webp",
            "name": "Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces",
            "rating": {
              "stars": 4.5,
              "count": 511
            },
            "priceCents": 6797,
            "keywords": [
              "cooking set",
              "kitchen"
            ]
          },
          {
            "id": "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
            "image": "images/products/vanity-mirror-silver.jpg",
            "name": "Vanity Mirror with Heavy Base - Chrome",
            "rating": {
              "stars": 4.5,
              "count": 130
            },
            "priceCents": 1649,
            "keywords": [
              "bathroom",
              "washroom",
              "mirrors",
              "home"
            ]
          },
          {
            "id": "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
            "image": "images/products/women-french-terry-fleece-jogger-camo.jpg",
            "name": "Women's Fleece Jogger Sweatpant",
            "rating": {
              "stars": 4.5,
              "count": 248
            },
            "priceCents": 2400,
            "keywords": [
              "pants",
              "sweatpants",
              "jogging",
              "apparel",
              "womens"
            ]
          }]);
        }
        else {
          return JSON.stringify([]);
        }
      });
    
      reloadLocalStorage();
      renderProducts(); // Agora os elementos já foram adicionados
    
  });

  afterEach(() => {
    document.querySelector('.js-checkout-product-grid').innerHTML = '';
  });

  it('checkout Products', () => {
     
    const products = document.querySelectorAll('.checkout-product');
    const totalQtt = arrayProducts[0].quantity + arrayProducts[1].quantity;// model/data creates view, so i need only pick or modify the data for modify the view.
    
    // View
    expect(document.querySelectorAll('.checkout-product-name')[0].innerText).toContain('Men\'s Navigator Sunglasses Pilot');
    expect(document.querySelectorAll('.checkout-product-name')[1].innerText).toContain('Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces');
    expect(
      document.querySelector(`.js-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    // Data
    expect(arrayProducts.length).toBe(2); // valid data/Model
    expect(products.length).toBe(2); // Valid HTML/View
    expect(totalQtt).toBe(3); // Valid qtt
    expect(arrayProducts[0].deliveryOptionId).toBeTruthy();


  });

  it('delete product', () => {

    document.querySelector(`.js-delete-product-${productId1}`).click(); // mock click
    
    expect(document.querySelector(`.js-delete-product-${productId1}`)).toBeNull(); // view
    expect(document.querySelector(`.js-delete-product-${productId2}`)).not.toBeNull(); // view
    expect(arrayProducts.length).toBe(1); // model
    expect(arrayProducts[0].id).toBe(productId2);
    expect(ordersNumber).toBe(1);
    expect(document.querySelector('.item-order-qtd').innerText).toContain('Items (1)');

    expect(localStorage.setItem).toHaveBeenCalledWith('selectedProducts', JSON.stringify(arrayProducts));
    expect(localStorage.setItem).toHaveBeenCalledWith('qtdProduct', JSON.stringify(ordersNumber));

    expect(document.querySelectorAll('.checkout-product-name')[0].innerText).toContain('Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces');
  });

  it('delete product: that not exist', () => {

     // mock click
    
    expect(document.querySelector(`.js-delete-product-${1}`)).toBeNull(); // view
    expect(document.querySelector(`.js-delete-product-${productId1}`)).not.toBeNull(); // view
    expect(document.querySelector(`.js-delete-product-${productId2}`)).not.toBeNull(); // view

    expect(arrayProducts.length).toBe(2); // model
    expect(arrayProducts[0].id).toBe(productId1);
    expect(arrayProducts[1].id).toBe(productId2);
    expect(ordersNumber).toBe(3);
    expect(document.querySelector('.item-order-qtd').innerText).toContain('Items (3)');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0); // not be called

    
    expect(document.querySelectorAll('.checkout-product-name')[1].innerText).toContain('Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces');
    expect(document.querySelectorAll('.checkout-product-name')[0].innerText).toContain('Men\'s Navigator Sunglasses Pilot');
  });

  it('update quantity of the product', ()=>{
    const update = document.querySelectorAll('.js-update-quantity');
    update[1].click();
    
    
    const select = document.querySelectorAll('.product-quantity-input');
    console.log(select);
    
  });


  describe('Test Suite: Delivery Option', () => {
    
    it('Update deliveryOption', () => {
      
      const option = 3;
      const optionsProduct1 = document.querySelector(`.delivery-product-id-${productId1}-option-id-${option}`);
      
      optionsProduct1.click();
      expect(optionsProduct1.checked).toBe(true);
      expect(arrayProducts.length).toBe(2);
      expect(optionsProduct1.classList).toContain(`delivery-product-id-${productId1}-option-id-${option}`);
      expect(document.querySelector('.order-shipping-price').innerText).toContain('$14.98');
      expect(localStorage.setItem).toHaveBeenCalledWith('selectedProducts', JSON.stringify(arrayProducts));
      expect(localStorage.setItem).toHaveBeenCalledWith('qtdProduct', JSON.stringify(ordersNumber));
    })
    
    it('function: updateDeliveryOption', () => {
      const index = 1;
      const deliveryId = 1;
      const deliveryDate = new Date();

      updateDeliveryOption(arrayProducts[index], deliveryDate, deliveryId);
      
      expect(arrayProducts[index].arriveDate).toEqual(deliveryDate);
      expect(arrayProducts[index].deliveryOptionId).toBe(deliveryId);
      expect(localStorage.setItem).toHaveBeenCalledWith('selectedProducts', JSON.stringify(arrayProducts));
      expect(localStorage.setItem).toHaveBeenCalledWith('qtdProduct', JSON.stringify(ordersNumber));

    })

    it('function: updateDeliveryOption - Product not exist', () => {
      
      const index = 2;
      const deliveryId = 1;
      const deliveryDate = new Date();

      updateDeliveryOption('123123', deliveryDate, deliveryId);
      
      expect(arrayProducts[index]).toBeUndefined();
      expect(localStorage.setItem).toHaveBeenCalledTimes(0); // not be called
  
    })
  })
  
})
