class Product
{
  id;
  image;
  name;
  rating;
  priceCents;

  constructor({id, name, image, rating, priceCents})
  {
    this.id = id;
    this.name = name;
    this.image = image;
    this.rating = rating;
    this.priceCents = priceCents;
  }

  productExtraInfo()
  {
    return '';
  }

  
}

class Clothing extends Product{
  sizeChartLink;

  constructor(productInfo){
    super(productInfo);
    this.sizeChartLink = productInfo.sizeChartLink;
  }

  productExtraInfo()
  {
    return `href="${this.sizeChartLink}" target='_blank' title='Click to see the cloth size chart'`;
  }
}

export function transformIntoProduct(allProducts)
{
  return allProducts.map(productData => {
    if (productData.type === 'clothing') {
      return new Clothing(productData);
    }
    return new Product(productData)
  });
}

