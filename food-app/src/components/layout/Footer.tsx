import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    //property to keep footer at bootom even when page is empty

    <footer className="relative text-center border-t p-8 text-gray-500 mt-16">
      <div className="flex justify-center items-center gap-4 p-4">
        <div className="w-10 h-10">
          <Link href={"www.linkedin.com/in/pranjal-altherius-lakra"}>
            <Image
              alt={"linkedin"}
              width={50}
              height={50}
              src={"/linkedin.png"}
            ></Image>
          </Link>
        </div>
        <div className="w-10 h-10">
          <Link href="https://github.com/alpranjal28">
            <Image
              alt={"github"}
              width={50}
              height={50}
              src={"/github-mark.png"}
            ></Image>
          </Link>
        </div>
      </div>

      <div className="">&copy;2024 All rights reserved</div>
    </footer>
  );
};
export default Footer;
