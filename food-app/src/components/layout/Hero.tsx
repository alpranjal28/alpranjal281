import Image from "next/image";
import Link from "next/link";
import Right from "../icons/Right";

const Hero = () => {
  return (
    <section>
      <div className="hero mt-4">
        <div className=" md:py-12">
          <h1 className="text-4xl font-semibold">
            Everything <br />
            is Better <br />
            with a <span className="text-primary"> Pizza</span>
          </h1>
          <p className=" my-6 text-gray-500 ">
            Pizza is the missing piece that makes every day complete, a simple
            yet delicious joy in life
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="">
              <Link href={"/menu"}>
                <button className=" text-white  uppercase bg-primary py-2 px-4 rounded-full flex flex-row items-center gap-2">
                  Order Now! <Right />
                </button>
              </Link>
              <Link href={"#about"}>
                <button className="flex flex-row border-0 items-center gap-2 text-gray-500 font-semibold">
                  Learn more <Right />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block">
          <Image
            src={"/pizza.png"}
            alt="pizza"
            width={400}
            height={400}
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
