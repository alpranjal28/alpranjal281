"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import useProfile from "@/components/UseProfile";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeader from "@/components/layout/SectionHeader";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

type AddressProps = {
  phone: number;
  address: string;
  city: string;
  postalCode: number;
  country: string;
};

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState<AddressProps>(); /////////
  const { data: profileData }: any = useProfile();

  useEffect(() => {
    if (profileData) {
      const { phone, address, city, postalCode, country } = profileData;
      const profileAddress = { phone, address, city, postalCode, country };
      setAddress(profileAddress);
    }
  }, [profileData]);

  function handleAddressChange(propName: any, value: any) {
    console.log(propName);
    console.log(value);

    setAddress((prevAddress: any) => ({ ...prevAddress, [propName]: value }));
  } ///

  let totalPrice = 0;
  for (let product in cartProducts) {
    totalPrice += cartProductPrice(cartProducts[product]);
  }

  return (
    <section>
      <div className="">
        <SectionHeader mainHeader="Cart" subHeader="" />
      </div>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="p-2">
          {cartProducts?.length === 0 && (
            <div className="">No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product: any, index: number) => (
              <div
                key={product._id}
                className="flex items-center gap-4  border-b py-2 mx-2"
              >
                <div className=" w-24">
                  <Image
                    src={product.image}
                    width={100}
                    height={100}
                    alt={product.name}
                    priority
                    style={{
                      height: "auto",
                      width: "auto",
                    }}
                    className="rounded-xl"
                  />
                </div>
                <div className="grow">
                  <h3 className=" text-lg font-medium leading-6">
                    {product.name}
                  </h3>
                  {product.size && (
                    <div className="text-sm ">
                      Size : <span>{product.size.name} </span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className=" text-sm text-gray-500">
                      {product.extras.map((extra: any) => (
                        <div key={extra._id}>
                          {extra.name} +₹{extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="font-semibold">
                  ₹{cartProductPrice(product)}
                </div>
                <div className="mx-1">
                  <button
                    onClick={() => removeCartProduct(index)}
                    type="button"
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className=" text-lg p-4 pr-14 text-right">
            <span className="text-gray-500">Subtotal :</span>
            <span className="font-semibold">₹{totalPrice}/-</span>
          </div>
        </div>

        <div className="">
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2>Payment</h2>
            <form action="">
              <AddressInputs
                addressProps={profileData}
                setAddressProps={()=>handleAddressChange}
              />
              <button type="submit">Pay ₹{totalPrice}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
