"use client";
import Image from "next/image";
import MenuCard from "../card/MenuCard";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";
// left and right lettuce images placement might need rework
// from absolute to relative

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) =>
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(0, 3));
      })
    );
  }, []);
  return (
    <section className="">
      <div className=" relative grid grid-cols-3 -top-8">
        {/* left lettuce image */}
        <div className="relative -top-8 -left-4 -z-10 flex justify-start">
          <Image
            src="/sallad1.png"
            alt="salad"
            width={109}
            height={189}
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>
        {/* menu heading */}
        <SectionHeader subHeader="Check our" mainHeader="Best sellers" />
        {/* right lettuce image */}
        <div className="relative top-16 -right-4 -z-10 flex justify-end">
          <Image
            src="/sallad2.png"
            alt="salad"
            width={109}
            height={189}
            priority
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 xs:grid-cols-2 gap-4 place-content-center">
        {bestSellers.length > 0 &&
          bestSellers.map((item: any) => <MenuCard {...item} key={item._id} />)}
      </div>
    </section>
  );
}
