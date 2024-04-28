"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext<any>({});

export function cartProductPrice(cartProduct: any) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  //cart products extras with if statement
  if (cartProduct.extras) {
    cartProduct.extras.forEach((extra: any) => {
      price += extra.price;
    });
  }
  return price;
}

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartProducts, setCartProducts] = useState<any>([]);
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cartProducts")) {
      setCartProducts(JSON.parse(ls.getItem("cartProducts") as any));
    }
  }, []);

  function saveCartProductsToLocalStorage(cartProducts: any) {
    if (ls) {
      ls.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }


  function removeCartProduct(indexToRemove: any) {
    setCartProducts((prevProducts: any) => {
      const newCartProducts = prevProducts.filter(
        (v:any,index:number) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Product Removed");
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function addToCart(product: any, size = null, extras = []) {
    setCartProducts((prevProducts: any) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }
  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
          // saveCartProductsToLocalStorage,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
