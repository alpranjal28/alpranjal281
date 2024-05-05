import Image from "next/image";
import Link from "next/link";

export default function MenuCardAdmin({
  _id,
  image,
  name,
  desc,
  basePrice,
}: {
  _id: string;
  image: string;
  name: string;
  desc: string;
  basePrice: number;
}) {
  return (
    <>
      <Link
        href={"/menu-items/edit/" + _id}
        className=" bg-gray-300 rounded-lg p-4 max-w-60 mx-auto"
        key={_id}
      >
        <div className="flex-col overflow-hidden rounded-md">
          <div className="block h-48 ">
            <Image
              className="mx-auto"
              src={image}
              alt=""
              width={200}
              height={200}
              style={{
                width: "auto",
                height: "auto",
              }}
              priority
            />
          </div>
        </div>
        <div className=" text-center">{name}</div>
      </Link>
    </>
  );
}
