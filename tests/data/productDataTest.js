import {addQttToProduct, arrayOrders, arrayProducts, ordersNumber, reloadLocalStorage} from '../../data/productData.js';

describe('Testing addQttToProduct function ', () => {

  const json = [{id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}];
  
  beforeEach(() => {
    const call = [];
    // mocking getItem
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      
      if (!call[0]) {
        call[0] = 'called';
        return JSON.stringify([]);

      }
      else if(!call[1])
      {
        call[1] = 'called';
        
        return JSON.stringify(0);
      }
      else
      {
        return JSON.stringify([]);
      }
    })
    // reaload Local storage -> to get the new value mocked.
    reloadLocalStorage();
   
    

    // simulate setItem -> prevent save in the localStorage
    spyOn(localStorage, 'setItem');

  });

  it('Adding a new product: 1 item', () => {
 
    // testin
    const qtdItems = 1;
    addQttToProduct(json, qtdItems, 0);

    expect(arrayProducts.length).toEqual(1);
    expect(Number(ordersNumber)).toEqual(qtdItems);
    expect(arrayProducts[0].quantity).toEqual(1);
    expect(arrayProducts[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('qtdProduct', JSON.stringify(ordersNumber));
    expect(localStorage.setItem).toHaveBeenCalledWith('selectedProducts', JSON.stringify(arrayProducts));
    expect(arrayOrders.length).toEqual(0);
  });

  it('Adding a new product: 4 items', () => {
    
    // testin
    const qtdItems = 4;
    const index = 0;
    addQttToProduct(json, 4, index);

    expect(arrayProducts.length).toEqual(1);
    expect(Number(ordersNumber)).toEqual(qtdItems);
    expect(arrayProducts[0].quantity).toEqual(4);
    expect(arrayProducts[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(arrayOrders.length).toEqual(0);
  });

  it('Adding a existent product: 1 item', () => {
    const qtdItems = 1;
    const index = 0;
    addQttToProduct(json, qtdItems, index);

    expect(arrayProducts[0].quantity).toEqual(qtdItems);
    expect(arrayProducts.length).toEqual(1);
    expect(Number(ordersNumber)).toEqual(1);
    expect(arrayProducts[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(arrayOrders.length).toEqual(0);
  });

  it('Adding a existent product: 4 items', () => {
    
    const qtdItems = 4;
    const index = 0;
    addQttToProduct(json, qtdItems, index);

    expect(arrayProducts[0].quantity).toEqual(qtdItems);
    expect(arrayProducts.length).toEqual(1);
    expect(Number(ordersNumber)).toEqual(qtdItems);
    expect(arrayProducts[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(arrayOrders.length).toEqual(0);
  });

  it('Adding a existent product: 1.2 items', () => {
    
    const qtdItems = 1.2;
    const index = 0;
    addQttToProduct(json, qtdItems, index);

    expect(arrayProducts[0].quantity).toEqual(1);
    expect(arrayProducts.length).toEqual(1);
    expect(Number(ordersNumber)).toEqual(1);
    expect(arrayProducts[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(arrayOrders.length).toEqual(0);
  });

  it('Adding a existent product: -1 items', () => {
    
    const qtdItems = -1;
    const index = 0;
    addQttToProduct(json, qtdItems, index);
    console.log(arrayProducts[0]);
    
    expect(arrayProducts[0]).toEqual(undefined);
    expect(arrayProducts.length).toEqual(0);
    expect(Number(ordersNumber)).toEqual(0);
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(arrayOrders.length).toEqual(0);
  });

})

