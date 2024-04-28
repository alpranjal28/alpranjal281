import FlyingButton from "react-flying-item"

export default function AddToCartButton(
  { menuItem }: any,
  addToCartFunction: () => void
) {
  const { sizes, extraIngredients, basePrice,image } = menuItem;
	console.log("this is menuitem",menuItem);
	

  const handleAddToCartButtonClick = () => {
    // Add the selected item to the cart
  };
  const hasSizesOrExtras = sizes?.length > 0 || extraIngredients?.length > 0;

	if(!hasSizesOrExtras) {
		return (
			<FlyingButton
				text="Add to cart"
				color="primary"
				onClick={addToCartFunction}
				src={image}
			/>
		)
	};

  return (
    <button
      type="button"
      onClick={addToCartFunction}
      className="bg-primary text-white rounded-full px-6 py-2 mt-4"
    >
      {hasSizesOrExtras ? (
        <span>From (₹{basePrice})</span>
      ) : (
        <span>Add to cart (₹{basePrice})</span>
      )}
    </button>
  );
}
