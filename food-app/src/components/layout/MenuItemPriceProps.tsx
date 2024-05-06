import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import ChevronUp from "../icons/ChevronUp";
import { useState } from "react";
import ChevronDown from "../icons/ChevronDown";

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
  const [toggle, setToggle] = useState(false);

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
      <div className="">
        <button
          className="justify-start p-1 border-0"
          type="button"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <ChevronUp /> : <ChevronDown />}
          <span>{name}</span>
          <span>({props.length})</span>
        </button>
      </div>

      <div className={toggle ? "block" : "hidden"}>
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
                <label htmlFor="extraPrice">Price</label>
                <input
                  type="number"
                  id="extraPrice"
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
    </div>
  );
}
