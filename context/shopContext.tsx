'use client';

import { createContext, useState, useEffect, useContext } from "react";
import { createCheckout, createCheckoutLine, updateCheckoutLine } from "../lib/shopify";
import { ISelectedVariant } from '../components/ProductForm/ProductForm';

interface IProps {
  children: React.ReactNode;
}

interface ICartContext {
  cart: ISelectedVariant[];
  setCart: (cart: ISelectedVariant[]) => void;
  cartOpen: boolean;
  setCartOpen: (cartOpen: boolean) => void;
  checkoutId: string;
  setCheckoutId: (checkoutId: string) => void;
  checkoutUrl: string;
  setCheckoutUrl: (checkoutUrl: string) => void;
  addToCart: (newItem: ISelectedVariant) => void;
}

const CartContext = createContext<ICartContext>({
  cart: [],
  setCart: () => {},
  cartOpen: false,
  setCartOpen: () => {},
  checkoutId: "",
  setCheckoutId: () => {},
  checkoutUrl: "",
  setCheckoutUrl: () => {},
  addToCart: () => {},
});

export const ShopProvider = ({ children }: IProps) => {
  const [cart, setCart] = useState<ISelectedVariant[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const addToCart = async (newItem: ISelectedVariant) => {
    if (!cart.length) {
      setCart([newItem]);

      const checkout = await createCheckout(
        newItem.id,
        newItem.variantQuantity
      );
      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.checkoutUrl);

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]));
    } else {
      const newCart = [...cart];
      const itemIndex = newCart.findIndex((item) => item.id === newItem.id);
      if (itemIndex !== -1) {
        newCart[itemIndex].variantQuantity += newItem.variantQuantity;
      } else {
        newCart.push(newItem);
      }
      setCart(newCart);
      const checkout = await createCheckoutLine(checkoutId, newItem);
      setCheckoutUrl(checkout.checkoutUrl);
      localStorage.setItem("checkout_id", JSON.stringify([newCart, checkout]));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartOpen,
        setCartOpen,
        checkoutId,
        setCheckoutId,
        checkoutUrl,
        setCheckoutUrl,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export { CartContext };