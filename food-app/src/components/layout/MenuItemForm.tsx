import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";
import { usePathname } from "next/navigation";

interface Size {
  name: string;
  price: number;
  field?: string;
}
interface MenuItems {
  _id?: string;
  name: string;
  desc: string;
  category: string;
  image: string;
  basePrice: string;
  sizes?: Size[];
  extraIngredients?: Size[];
}

interface MenuItemFormProps {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>, data: MenuItems) => void;
  menuItemForForm: {
    _id?: string;
    image: string;
    name: string;
    desc: string;
    category: any;
    basePrice: string;
    sizes?: Size[];
    extraIngredients?: Size[];
  } | null;
}

export default function MenuItemForm({
  onSubmit,
  menuItemForForm,
}: MenuItemFormProps) {
  const [id, setId] = useState(menuItemForForm?._id || "");
  const [image, setImage] = useState(menuItemForForm?.image || "");
  const [name, setName] = useState(menuItemForForm?.name || "");
  const [desc, setDesc] = useState(menuItemForForm?.desc || "");
  const [basePrice, setBasePrice] = useState(menuItemForForm?.basePrice || "");
  const [sizes, setSizes] = useState<Size[]>(menuItemForForm?.sizes || []);

  const [category, setCategory] = useState(menuItemForForm?.category || "");
  const [categories, setCategories] = useState<[]>([]);
  const [extraIngredients, setExtraIngredients] = useState<Size[]>(
    menuItemForForm?.extraIngredients || []
  );

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          desc,
          category,
          basePrice,
          sizes,
          extraIngredients,
        })
      }
      className="mt-8 mb-4 max-w-2xl"
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="max-w-[200px] max-h-[200px] mx-auto">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label htmlFor="item-name">Item name</label>
          <input
            type="text"
            id="item-name"
            value={name || ""}
            onChange={(ev) => setName(ev.target.value)}
          />

          <label htmlFor="item-desc">Description</label>
          <input
            type="text"
            id="item-desc"
            minLength={60}
            maxLength={120}
            value={desc || ""}
            onChange={(e) => setDesc(e.target.value)}
          />

          <label htmlFor="item-cat">Categories</label>
          <select
            name=""
            id="item-cat"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c: any) => (
                <option key={c._id} value={c!["_id"]}>
                  {c!["name"]}
                </option>
              ))}
          </select>

          <label htmlFor="item-b-price">Base price</label>
          <input
            type="text"
            id="item-b-price"
            value={basePrice || ""}
            onChange={(e) => setBasePrice(e.target.value)}
          />

          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"add item sizes"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"add extra items"}
            props={extraIngredients}
            setProps={setExtraIngredients}
          />

          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
