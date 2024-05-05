import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";

export default function MenuCard(menuItem: any) {
  const {
    image,
    name,
    desc,
    basePrice,
    sizes,
    extraIngredients,
  }: {
    image: string;
    name: string;
    desc: string;
    basePrice: number;
    sizes: any;
    extraIngredients: any;
  } = menuItem;

  const [selectedSize, setSelectedSize] = useState<any>(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState<any>([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredients.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopup(false);
    toast.success("Added to cart!");
    setSelectedSize(null);
    setSelectedExtras([]);
  }

  type E = {
    name: string;
    price: number;
  };

  function handleAddOnsClick(ev: any, extraItem: E) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev: any) => [...prev, extraItem]);
    } else {
      setSelectedExtras((prev: any) => {
        return prev.filter((e: any) => e.name !== extraItem.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (let extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  const hasSizesOrExtras = sizes?.length > 0 || extraIngredients?.length > 0;

  return (
    <>
      {/* POPUP */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-1 rounded-lg max-w-md text-center "
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={150}
                height={200}
                className="rounded-md mx-auto"
                priority
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
              <h2 className=" text-lg font-bold mb-2">{name.toUpperCase()}</h2>
              <p className=" text-gray-600">{desc}</p>

              {/* SIZES */}
              {sizes?.length > 0 && (
                <div
                  key={sizes._id}
                  className="bg-gray-300 rounded-md text-start p-2 mb-1"
                >
                  <h3 className="text-center font-medium text-gray-700">
                    Pick your size
                  </h3>
                  {sizes.map((size: any) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2 py-1 mb-2 text-base border"
                    >
                      <input
                        type="radio"
                        name="size"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        className=""
                      />
                      {size.name} ₹{basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {/* EXTRA */}
              {extraIngredients.length > 0 && (
                <div
                  className="bg-gray-300 rounded-md text-start p-2"
                  key={extraIngredients._id}
                >
                  <h3 className="text-center font-medium text-gray-700">
                    Extra ingredients?
                  </h3>
                  {extraIngredients.map((extraIngredient: any) => (
                    <label
                      key={extraIngredient._id}
                      className="flex items-center gap-2 py-1 mb-2 text-base border"
                    >
                      <input
                        type="checkbox"
                        onChange={(ev) => handleAddOnsClick(ev, extraIngredient)}
                        checked={selectedExtras.includes(extraIngredient)}
                        className="bg-green-200"
                      />
                      {extraIngredient.name} +₹{extraIngredient.price}
                    </label>
                  ))}
                </div>
              )}
              <div className="sticky bottom-1 flex-col">
                <button
                  type="button"
                  onClick={() => handleAddToCartButtonClick()}
                  className="bg-primary text-white rounded-full px-6 py-2 mt-4 "
                >
                  Add to cart ₹{selectedPrice}
                </button>
                <button
                  // type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-white rounded-full mt-1 "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" bg-gray-200 p-4 rounded-lg hover:bg-gray-300 hover:shadow-xl transition-colors text-center">
        <div className=" flex justify-center h-52 rounded-md">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className=" rounded-md"
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>
        <h4 className=" text-xl font-semibold my-2">{name}</h4>
        <p className=" text-gray-500 text-sm max-h-16 line-clamp-3 ">{desc}</p>
        <button
          type="button"
          onClick={() => handleAddToCartButtonClick()}
          className="bg-primary text-white rounded-full px-6 py-2 mt-4"
        >
          {hasSizesOrExtras ? (
            <span>From (₹{basePrice})</span>
          ) : (
            <span>Add to cart (₹{basePrice})</span>
          )}
        </button>
        {/* <AddToCartButton 
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={handleAddToCartButtonClick}
        basePrice={basePrice}
        image={image}
        /> */}
      </div>
    </>
  );
}
