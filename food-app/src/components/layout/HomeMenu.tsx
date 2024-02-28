import Image from "next/image";
import MenuCard from "../card/MenuCard";
import SectionHeader from "./SectionHeader";
// left and right lettuce images placement might need rework
// from absolute to relative

const HomeMenu = () => {
  return (
    <section className="">
      <div className="grid grid-cols-3 container">
        {/* left lettuce image */}
        <div className="relative top-8 -z-10 flex justify-start">
          <Image src="/sallad1.png" alt="salad" width={109} height={189} />
        </div>
        {/* menu heading */}
        <SectionHeader subHeader="Check out" mainHeader="Menu"/>
        {/* right lettuce image */}
        <div className="relative top-8 -z-10 flex justify-end">
          <Image src="/sallad2.png" alt="salad" width={109} height={189} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 place-content-center">
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
      </div>
    </section>
  );
};
export default HomeMenu;
