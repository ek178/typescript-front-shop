export class Order {
    id: number = 0;
    // buyer: number = 1;
    buyer_id: number = 1;

    // delivery_details: number = 0;
    delivery_details_id: number = 0;

    total_price: number = 0;
    total_product_amount: number = 0;
    // products: number[] = [];
    product_ids: number[] = [];
  }
  //orderId
  // products_price=models.DecimalField + products_amount=models.PositiveInteger