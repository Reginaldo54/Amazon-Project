import { transformIntoProduct } from "./productClasses.js";

let arrayProducts;
let ordersNumber;
let arrayOrders;
let allProducts;

export function reloadLocalStorage() {
  arrayProducts = JSON.parse(localStorage.getItem('selectedProducts')) ?? [];
  ordersNumber  = JSON.parse(localStorage.getItem('qtdProduct')) ?? 0;
  allProducts   = JSON.parse(localStorage.getItem('allProducts'));
  arrayOrders   = JSON.parse(localStorage.getItem('orderedProducts')) ?? [];
}

reloadLocalStorage();



function addOrdersNumber(value) {
  ordersNumber += value;
}

function setOrdersNumber(value) {
  ordersNumber = value;
}

function clickAddButtonAnimation(idTimeout, index, messageAdded)
{
  
  messageAdded[index].style.opacity = '1';
  
    // animação de tirar o elemento. 
    if (idTimeout[index]) 
      {  // Renovando temiout caso eu acione o evento e o timeout ainda n desativou.
        clearTimeout(idTimeout[index]);

        idTimeout[index] = setTimeout(() => {
          messageAdded[index].style.opacity = '0';
        }, 1625);
      }
      else
      {
        idTimeout[index] = setTimeout(() => {
          messageAdded[index].style.opacity = '0';
        }, 1625);
      }

}

function addQttToProduct(json, qtdItems, index)
{
  if (qtdItems <= 0) {
    return console.error('QtdItems must be greater than zero.');
  }

  const qtdItemsSelecionada = typeof qtdItems === 'number' ? parseInt(qtdItems) : Number(qtdItems[index].value);
  
  let encontreiValor;
  for (let i = 0; i < arrayProducts.length; i++) {

    encontreiValor = arrayProducts[i].id === json[index].id;

    if (encontreiValor) {
      arrayProducts[i].quantity += qtdItemsSelecionada;
      break;
    }
  }

  
// valor n foi encontrado
  if (!encontreiValor) {
    
    const id = json[index].id;
    const deliveryOptionId = '1';
    const quantity = qtdItemsSelecionada;

    const newProduct = {
      id,
      deliveryOptionId,
      quantity
    };


    // json[index].quantity = qtdItemsSelecionada; // atualiza
    // json[index].deliveryOptionId = '1';
    
    arrayProducts.push(newProduct);
    
  }

  ordersNumber += qtdItemsSelecionada;
  
  saveChangeOnProduct();

}

function saveChangeOnProduct() {
  localStorage.setItem('qtdProduct', JSON.stringify(ordersNumber));
  // apaguei no localStorage
  localStorage.setItem('selectedProducts', JSON.stringify(arrayProducts));
}

function getRatingStarImg(number)
{
  switch (number) {
    case 0:
    return './images/ratings/rating-0.png';
  
    case 0.5:
    return './images/ratings/rating-05.png'
  
    case 1:
    return './images/ratings/rating-10.png';

    case 1.5:
    return './images/ratings/rating-15.png';

    case 2:
    return './images/ratings/rating-20.png';

    case 2.5:
    return './images/ratings/rating-25.png';
    
    case 3:
    return './images/ratings/rating-30.png';
    
    case 3.5:
    return './images/ratings/rating-35.png';
    
    case 4:
    return './images/ratings/rating-40.png';
    
    case 4.5:
    return './images/ratings/rating-45.png';

    case 5:
    return './images/ratings/rating-50.png';

    default:
      return './images/ratings/rating-0.png';
  }

}

function addProductOnArrayOrders(total)
{
  // pegando a data de ordem.

  // começar a order
  arrayOrders.unshift(
    {
      id: crypto.randomUUID(),
      products: arrayProducts,
      total,
      orderPlaced: new Date()
    });


  // salvando - impedir que o arrayProducts limpe antes.
  localStorage.setItem('orderedProducts', JSON.stringify(arrayOrders));

  setOrdersNumber(0);
  arrayProducts.splice(0, arrayProducts.length); // deleta os elementos.
  saveChangeOnProduct();
}


export function createProducts(allProducts) 
{
  // passando os produtos existentes.
  const productGrid = document.querySelector('.product-grid');
  productGrid.style.opacity = 0;
  productGrid.innerHTML = '';

  if (allProducts) {
    allProducts.forEach((product) => {
      const starImg = getRatingStarImg(product.rating.stars);
      productGrid.innerHTML += 
      `<div class="product">
      <a class="product-img-container" ${product.productExtraInfo()}>
        <img class="product-img" src="${product.image}" alt="">
      </a>
      <div class="product-name" title="${product.name}">${product.name}</div>
      <div class="product-rating-container">
        <img class="product-rating-img" src="${starImg}" alt="">
        <div class="product-rating-number">${product.rating.count}</div>
      </div>
      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>
      <div class="product-quantity-container">
        <select class="product-quantity-selector" >
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div class="product-added-message">
        <img class="product-added-icon" src="./images/icons/checkmark.png" alt="">
        <span class="product-added-text">Added</span>
      </div>
      
      <button class="product-button-add-cart">Add to Cart</button>
  </div>`
  });
  }
  else
  {
    productGrid.innerHTML = '<div>Nenhum Produto Encontrado</div>';
  }

// fazendo os produtos aparecerem.
  setTimeout(()=>{
    productGrid.style.opacity = 1;
  }, 2);

}


export async function pickProductsFromBackEnd() {
  
  let allProducts;
  
  try {
    const response = await fetch('https://supersimplebackend.dev/products');
    allProducts = await response.json();
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    return allProducts;
  } catch (error) {
    console.log(error)
  }
}

export async function pickProducts(cartNumber, produtosPesquisados = undefined) {

  let products;  
  if (!produtosPesquisados) {
    allProducts = allProducts ?? await pickProductsFromBackEnd();
    allProducts = transformIntoProduct(allProducts);
    products = allProducts;
  }
  else
  {
    products = produtosPesquisados;
  }


  try {
    
    if(Array.isArray(products))
    {
      createProducts(products)

      // Button's message.
      const messageAdded = document.querySelectorAll('.product-added-message');

      // Qtd items
      const qtdItems = document.querySelectorAll('.product-quantity-selector');

      let idTimeout = [];

      document.querySelectorAll('.product-button-add-cart')
      .forEach((button, index)=>{

        // fazendo cada animação indepente.
        idTimeout[index] = undefined;

        button.addEventListener('click', ()=>{ // sempre que eu clicar esse valor vai ser resetado.
          
          // Verificando quantos items vou colocar...
          addQttToProduct(products, qtdItems, index);

          cartNumber.innerHTML = `${ordersNumber}`;

          clickAddButtonAnimation(idTimeout, index, messageAdded)
        })
      })
   }
  } catch (e) {
    console.log(e)
  }


}


export function findProductById(productId)
{
  
  // Picking all products.
  for (const product of allProducts) {
    if (product.id === productId) {
      return product;
    }
  }
  
}

export function findOrderById(orderId)
{
  // Picking all products.
  for (const order of arrayOrders) {
    if (order.id === orderId) {
      return order;
    }
  }
  
}

export function findProductInOrder(order, productId)
{
  for (const product of order.products) {
    if (product.id === productId) {
      return product;
    }
   }
}

export {arrayProducts, ordersNumber,arrayOrders,allProducts, clickAddButtonAnimation, addQttToProduct,setOrdersNumber, addOrdersNumber, saveChangeOnProduct, addProductOnArrayOrders}