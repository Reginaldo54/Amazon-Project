import { ordersNumber, pickProducts, allProducts} from '../data/productData.js'

const cartNumber= document.querySelector('.cart-number');
cartNumber.innerText = ordersNumber;

function debounce(fun, delay)
{
  
  let timer;
  return function ()
  {
    console.log('Antes de clearTimeout:', timer);
    clearTimeout(timer);
    timer = setTimeout(()=>fun(), delay);
    console.log('Depois de clearTimeout:', timer);
  }

}


function searchProducts() {

  const searchInput = document.querySelector('.search > input');
  searchInput.addEventListener('keyup', debounce(()=>{
    
    const query = searchInput.value.toLowerCase();
    const products =  allProducts.filter((product)=>{

      const productName = product.name.toLowerCase();
      if (productName.includes(query)) {
      return product;
      }
    })
  
    pickProducts(cartNumber, products);
  }, 300));
}

function renderSearch() {
 
  searchProducts();


  pickProducts(cartNumber);
}

renderSearch();






