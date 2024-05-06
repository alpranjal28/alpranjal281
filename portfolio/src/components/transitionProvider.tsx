"use client";
import { AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const TransitionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <div
        key={pathname}
        className="w-screen h-screen bg-gradient-to-b from-blue-100 to-red-200"
      >
        <motion.div
          className="h-screen w-screen fixed bg-black top-0 rounded-b-[100px] z-40"
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* <motion.div
          className="m-auto top-0 bottom-0 left-0 right-0 text-white cursor-default text-8xl z-50 w-fit h-fit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {pathname.substring(1)}
        </motion.div> */}
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-t-[100px] bottom-0 z-40"
          initial={{ height: "140vh" }}
          animate={{
            height: "0vh",
            transition: { delay: 0.5, ease: "easeOut" },
          }}
        />
        <div className="h-24">
          <Navbar />
        </div>
        <div className="h-[calc(100vh-6rem)]">{children}</div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
