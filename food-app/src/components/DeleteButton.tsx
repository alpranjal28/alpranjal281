import { useState } from "react";

export default function DeleteButton({
  label,
  onDelete,
}: {
  label: string;
  onDelete: () => void;
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <div className="">
        <div className=" text-center font-semibold pb-4">
          Are you sure you want to delete "{label}" ?
        </div>
        <div className="flex gap-2 pb-4">
          <button
            className=""
            type="button"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </button>
          <button className="bg-primary" type="button" onClick={onDelete}>
            Confirm delete {label}
          </button>
        </div>
      </div>
    );
  }
  return (
    <button
      className=""
      type="button"
      onClick={() => setShowConfirmation(true)}
    >
      {label}
    </button>
  );
}
