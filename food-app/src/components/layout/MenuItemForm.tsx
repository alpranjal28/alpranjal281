import { useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";

interface Size {
  name: string;
  price: number;
  field?: string;
}
interface MenuItems {
  _id?: string;
  name: string;
  desc: string;
  image: string;
  basePrice: string;
  sizes?: Size[];
  extraIngredients?: Size[];
}

interface MenuItemFormProps {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>, data: MenuItems) => void;
  menuItemForForm: {
    image: string;
    name: string;
    desc: string;
    basePrice: string;
    sizes?: Size[];
    extraIngredients?: Size[];
  } | null;
}

export default function MenuItemForm({
  onSubmit,
  menuItemForForm,
}: MenuItemFormProps) {
  const [image, setImage] = useState(menuItemForForm?.image || "");
  const [name, setName] = useState(menuItemForForm?.name || "");
  const [desc, setDesc] = useState(menuItemForForm?.desc || "");
  const [basePrice, setBasePrice] = useState(menuItemForForm?.basePrice || "");
  const [sizes, setSizes] = useState<Size[]>(menuItemForForm?.sizes || []);
  const [extraIngredients, setExtraIngredients] = useState<Size[]>(
    menuItemForForm?.extraIngredients || []
  );

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          desc,
          basePrice,
          sizes,
          extraIngredients,
        })
      }
      className="mt-8"
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="max-w-[200px] max-h-[200px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label htmlFor="item-name">Item name</label>
          <input
            type="text"
            id="item-name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label htmlFor="item-desc">Description</label>
          <input
            type="text"
            id="item-desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label htmlFor="item-b-price">Base price</label>
          <input
            type="text"
            id="item-b-price"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />

          <MenuItemPriceProps
            name={"Sizzes"}
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
