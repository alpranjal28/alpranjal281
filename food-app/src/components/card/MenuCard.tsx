import Image from "next/image";

export default function MenuCard({
  image,
  name,
  desc,
  basePrice,
}: {
  image: string;
  name: string;
  desc: string;
  basePrice: number;
}) {
  return (
    <>
      <div className=" bg-gray-200 p-4 rounded-lg hover:bg-gray-300 hover:shadow-xl transition-colors text-center">
        <div className=" flex justify-center h-36 rounded-md">
          <Image
            src={image}
            alt="pizza"
            width={150}
            height={150}
            className=" rounded-md"
          />
        </div>
        <h4 className=" text-xl font-semibold my-2">{name}</h4>
        <p className=" text-gray-500 text-sm max-h-16 line-clamp-3 ">
          {desc}
        </p>
        <button className="bg-primary text-white rounded-full px-6 py-2 mt-4">
          Add to cart (${basePrice})
        </button>
      </div>
    </>
  );
}
