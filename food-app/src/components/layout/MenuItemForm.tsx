import { useState } from "react";
import EditableImage from "./EditableImage";

interface MenuItems {
	name: string;
	desc: string;
	image: string;
	basePrice: string;
	// _id: string;

}

interface MenuItemFormProps {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>,data: MenuItems) => void;
  menuItemForForm: {
    image: string;
    name: string;
    desc: string;
    basePrice: string;
		// _id:string | null
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
	// const _id = menuItemForForm?._id || "";
  return (
    <form onSubmit={ev=>onSubmit(ev, {image,name,desc,basePrice})} className="mt-8">
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
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
