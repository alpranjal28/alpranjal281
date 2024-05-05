import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export default function EditableImage({
  link,
  setLink,
}: {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
}) {
  async function handleFileChange(ev: any) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(async (resp) => {
        if (resp.ok) {
          const link = await resp.json();
          setLink(link); //link of s3 image comes perfectly
        }
        if (!resp.ok) {
          throw new Error("Error uploading image!");
        }
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Image uploaded!",
        error: "Error uploading image!",
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      {link && (
        <div className="">
          <Image
            className="rounded-lg w-full mt-5"
            src={link}
            width={96}
            height={96}
            alt="Food Image"
            style={{
              width: "auto",
              height: "auto",
            }}
            priority
          />
        </div>
      )}
      {!link && (
        <div className="bg-gray-200 text-center px-4 py-8 text-gray-500 rounded-lg mt-4">
          No image
        </div>
      )}
      <label>
        <input
          type="file"
          id="imageInput"
          className=" hidden"
          onChange={handleFileChange}
        />
        <span
          className="block border-2 border-gray-300 cursor-pointer 
                font-semibold py-2 px-8 rounded-lg"
        >
          Edit image
        </span>
      </label>
    </div>
  );
}
