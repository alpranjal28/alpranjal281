import Image from "next/image";

const MenuCard = () => {
  return (
    <>
      <div className=" bg-gray-200 p-4 rounded-lg hover:bg-gray-300 hover:shadow-xl transition-colors text-center">
        <div className=" flex justify-center">
          <Image src="/pizza2.png" alt="pizza" width={150} height={150} />
        </div>
        <h4 className=" text-xl font-semibold my-2">Pepperoni pizza</h4>
        <p className=" text-gray-500 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <button className="bg-primary text-white rounded-full px-6 py-2 mt-4">
          Add to cart
        </button>
      </div>
    </>
  );
};
export default MenuCard;
