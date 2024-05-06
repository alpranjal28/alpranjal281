import React from "react";

type AddressProps = {
  phone: number;
  address: string;
  city: string;
  postalCode: number;
  country: string;
};

export default function AddressInputs({
  addressProps,
  setAddressProps,
}: {
  addressProps: AddressProps;
  setAddressProps: React.SetStateAction<any>;
}) {
  const { phone, address, city, postalCode, country } = addressProps;
  return (
    <>
      <label htmlFor="number">Phone number</label>
      <input
        id="number"
        type="number"
        placeholder="phone number"
        value={phone || ""}
        onChange={(ev) => setAddressProps("phone", ev.target.valueAsNumber)}
      />
      <label htmlFor="address">Street address</label>
      <input
        id="address"
        type="text"
        placeholder="street address"
        value={address || ""}
        onChange={(ev) => setAddressProps("address", ev.target.value)}
        autoComplete="on"
      />
      <div className="flex gap-2">
        <div className="grow">
          <label htmlFor="city">City</label>
          <input
            id="city"
            style={{ margin: 0 }}
            type="text"
            placeholder="city"
            value={city || ""}
            onChange={(ev) => setAddressProps("city", ev.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="postalCode">Postal code</label>
          <input
            id="postalCode"
            style={{ margin: 0 }}
            type="number"
            placeholder="postal code"
            value={postalCode || ""}
            onChange={(ev) =>
              setAddressProps("postalCode", ev.target.valueAsNumber)
            }
          />
        </div>
      </div>
      <label htmlFor="country">Country</label>
      <input
        id="country"
        type="text"
        placeholder="country"
        value={country || ""}
        onChange={(ev) => setAddressProps("country", ev.target.value)}
        autoComplete="on"
      />
    </>
  );
}
