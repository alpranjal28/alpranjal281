import { useState } from "react";
import EditableImage from "./EditableImage";
import Plus from "../icons/Plus";
import Trash from "../icons/Trash";

interface Size {
  name: string;
  price: number;
  field?: string;
}
interface MenuItems {
  name: string;
  desc: string;
  image: string;
  basePrice: string;
  extraSizes?: Size;
  // _id: string;
}

interface MenuItemFormProps {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>, data: MenuItems) => void;
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
  const [sizes, setSizes] = useState<Size[]>([]);

  function addSize() {
    setSizes((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
    return;
  }

  function editSize(
    ev: React.ChangeEvent<HTMLInputElement>,
    index: number,
    prop: string
  ) {
    const newValue = ev.target.value;
    console.log(newValue);

    setSizes((prevSizes) => {
      const newSizes: Size[] = [...prevSizes];
      newSizes[index], (prop = newValue);
      return newSizes;
    });
  }

  function removeSize(indexToRemove: number) {
    setSizes((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <form
      onSubmit={(ev) => onSubmit(ev, { image, name, desc, basePrice })}
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

          <div className="bg-gray-200 p-2 rounded-md mb-2">
            <label>Sizes</label>
            {/* <div className="">what is this</div> */}

            {sizes?.length > 0 &&
              sizes.map((size, index) => (
                <div className="flex gap-2 items-end" key={index}>
                  <div className="">
                    {/* <label htmlFor="extra">Size name</label> */}
                    <input
                      type="text"
                      id="extra"
                      placeholder="Size name"
                      value={size["name"]} //
                      onChange={(ev) => editSize(ev, index, "name")}
                    />
                  </div>

                  <div className="">
                    {/* <label htmlFor="extras">Price</label> */}
                    <input
                      type="number"
                      id="extras"
                      placeholder="Extra price"
                      value={size["price"]} //
                      onChange={(ev) => editSize(ev, index, "price")}
                    />
                  </div>

                  {/* REMOVE SIZE */}
                  <div className="">
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="bg-white mb-2"
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              ))}
            <button type="button" onClick={addSize} className="bg-white">
              <Plus />
              Add item size
            </button>
          </div>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
