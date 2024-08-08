'use client';

import Link from 'next/link';
import { useCart } from '../../context/shopContext';

export const CartNav = () => {
    const { cart } = useCart();
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.variantQuantity;
    });
  return (
    <Link href="/cart">
      <p className="text-md font-bold cursor-pointer">
        {`Cart (${cartQuantity})`}
      </p>
    </Link>
  );
}
