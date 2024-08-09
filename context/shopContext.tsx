'use client';

import { createContext, useState, useEffect, useContext, use } from "react";
import { createCheckout, createCheckoutLine, removeCheckoutLine, updateCheckoutLine } from "../lib/shopify";
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
  removeCartItem: (itemToRemove: ISelectedVariant) => void;
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
  removeCartItem: () => {},
});

export const ShopProvider = ({ children }: IProps) => {
  const [cart, setCart] = useState<ISelectedVariant[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const addToCart = async (newItem: ISelectedVariant) => {
    setCartOpen(true);
  
    if (!cart.length) {

      const checkout = await createCheckout(
        newItem.id,
        newItem.variantQuantity
      );
      const itemsToSet = [newItem].map((item, index) => ({
        ...item,
        lineId: checkout.lines.edges[index].node.id,
      }));
      setCart(itemsToSet);
      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.checkoutUrl);

      localStorage.setItem(
        "checkout_id",
        JSON.stringify([itemsToSet, checkout])
      );
    } else {
      const newCart = [...cart];
      const itemIndex = newCart.findIndex((item) => item.id === newItem.id);
      if (itemIndex !== -1) {
        newCart[itemIndex].variantQuantity += newItem.variantQuantity;
      } else {
        newCart.push(newItem);
      }
      const checkout = await createCheckoutLine(checkoutId, newItem);
      const itemsToSet = newCart.map((item, index) => ({
        ...item,
        lineId: checkout.lines.edges[index].node.id,
      }));
      setCart(itemsToSet);
      setCheckoutUrl(checkout.checkoutUrl);
      localStorage.setItem(
        "checkout_id",
        JSON.stringify([itemsToSet, checkout])
      );
    }
  };

  const removeCartItem = async (itemToRemove: ISelectedVariant) => {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);

    setCart(updatedCart);

    const newCheckout = await removeCheckoutLine(checkoutId, itemToRemove.lineId!);
    setCheckoutUrl(newCheckout.checkoutUrl);
    localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]));
  };

  useEffect(() => {
    if (localStorage.checkout_id) {
      const cartObj = JSON.parse(localStorage.checkout_id);
      if (cartObj[0].id) {
        setCart([cartObj[0]]);
      } else if (cartObj[0].length > 0) {
        setCart(...[cartObj[0]]);
      }

      setCheckoutId(cartObj[1].id);
      setCheckoutUrl(cartObj[1].checkoutUrl);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        checkoutUrl,
        cartOpen,
        checkoutId,
        setCart,
        setCartOpen,
        setCheckoutId,
        setCheckoutUrl,
        addToCart,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export { CartContext };