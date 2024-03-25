import { useState } from "react";
import Trash from "../icons/Trash";
import Plus from "../icons/Plus";

interface Size {
  name: string;
  price: number;
  field?: string;
}

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}: {
  name: string;
  addLabel: string;
  props: any;
  setProps: any;
}) {
  // const [sizes, setProps] = useState<Size[]>([]);

  function addProps() {
    setProps((oldProps: any) => {
      return [...oldProps, { name: "", price: 0 }];
    });
    return;
  }

  function editProps(
    ev: React.ChangeEvent<HTMLInputElement>,
    index: number,
    prop: string
  ) {
    const newValue = ev.target.value;

    setProps((prevSizes: any) => {
      const newSizes: any = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove: number) {
    setProps((prev: any) =>
      prev.filter((v: any, index: any) => index !== indexToRemove)
    );
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <label>{name}</label>
      {/* <div className="">what is this</div> */}

      {props?.length > 0 &&
        props.map((size: any, index: any) => (
          <div className="flex gap-2 items-end" key={index}>
            <div className="">
              <label htmlFor="extra">Name</label>
              <input
                type="text"
                id="extra"
                placeholder="Size name"
                value={size["name"]} //
                onChange={(ev) => editProps(ev, index, "name")}
              />
            </div>

            <div className="">
              <label htmlFor="extras">Price</label>
              <input
                type="number"
                id="extras"
                placeholder="Extra price"
                value={size["price"]} //
                onChange={(ev) => editProps(ev, index, "price")}
              />
            </div>

            {/* REMOVE SIZE */}
            <div className="">
              <button
                type="button"
                onClick={() => removeProp(index)}
                className="bg-white mb-2"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      <button type="button" onClick={addProps} className="bg-white">
        <Plus />
        {addLabel}
      </button>
    </div>
  );
}
