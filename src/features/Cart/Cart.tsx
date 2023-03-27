import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Login/Status';


export const Cart1 = () =>{
    const { cart } = useContext(CartContext);





    
    return (
        <div>
          {cart.items.map((item, index) => (
            <div key={index}>
              <p>Product: {item?.product}</p>
              <p>Price: {item?.price}</p>
              <p>Quantity: {item?.quantity}</p>
              <hr />
            </div>
          ))}
          <p>Total Price: {cart.totalPrice}</p>
          <p>Total Quantity: {cart.totalQuantity}</p>
        </div>
      );


}

