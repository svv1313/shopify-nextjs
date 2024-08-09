"use client";

import Link from "next/link";
import { useCart } from "../../context/shopContext";
import MiniCart from "../MiniCart";

export const CartNav = () => {
  const { cart, cartOpen, setCartOpen } = useCart();
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.variantQuantity;
  });
  return (
    <>
      <p
        className="text-md font-bold cursor-pointer"
        onClick={() => setCartOpen(!cartOpen)}
      >
        {`Cart (${cartQuantity})`}
      </p>
      <MiniCart cart={cart} />
    </>
  );
};
