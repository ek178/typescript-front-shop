
import React, { createContext, useContext, useState } from 'react';

interface StatusContextType {
  status: string | null;
  setStatus: (status: string | null) => void;
}

export const StatusContext = createContext<StatusContextType>({
  status: null,
  setStatus: () => { },
});


//interface

interface CartItem {
  id: number;
  product: string;
  price: number;
  quantity: number;
}

interface ShoppingCart {
  items: CartItem[];
  totalPrice: number;
  deliveryDetail: number;
  totalQuantity: number;
}

interface ShoppingCartContextProps {
  shoppingCart: ShoppingCart;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateItem: (item: CartItem, quantity: number) => void;
}









// const CartContext = React.createContext<CartContextValues | undefined>(undefined);

// export const useCart = () => {
//   const context = React.useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
