"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<any>({});

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

// remove one product from cart

  function removeCartProduct(cartProduct: any) {
    setCartProducts((prevProducts: any) => {
      const newCartProducts = prevProducts.filter(
        (product: any) => product.id !== cartProduct.id
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function addToCart(product: any, size=null, extras = []) {
    
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
