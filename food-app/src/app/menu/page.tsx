"use client";
import MenuCard from "@/components/card/MenuCard";
import SectionHeader from "@/components/layout/SectionHeader";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((res) =>
      res.json().then((categories) => {
        setCategories(categories);
      })
    );
    fetch("/api/menu-items").then((res) =>
      res.json().then((menuItems) => setMenuItems(menuItems))
    );
  }, []);

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c: any) => (
          <div key={c._id} className="">
            <div className="p-4">
              <SectionHeader mainHeader={c?.name} subHeader="" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems?.length > 0 &&
                menuItems
                  .filter((m: any) => m.category === c._id)
                  .map((item: any) => (
                    <div key={item?._id} className="">
                      <MenuCard {...item} />
                    </div>
                  ))}
            </div>
          </div>
        ))}
    </section>
  );
}
