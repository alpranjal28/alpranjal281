"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const text: string = "Say hello";

  const formRef = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess(false);
    setError(false);

    const SERVICE_EMAIL_ID = process.env.NEXT_PUBLIC_SERVICE_EMAIL_ID as string;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY as string;

    if (formRef.current) {
      emailjs
        .sendForm(SERVICE_EMAIL_ID, TEMPLATE_ID, formRef.current, {
          publicKey: PUBLIC_KEY,
        })
        .then(
          (result) => {
            setSuccess(true);
            if (formRef.current) {
              formRef.current.reset();
            }
          },
          (error) => {
            setError(true);
          }
        );
    }
  };
  return (
    <motion.div
      className=" h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.5 }}
    >
      <div className=" overflow-scroll h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* TEXT CONTAINER */}
        <div className=" h-1/3 lg:h-full lg:w-1/2 flex items-center justify-center text-6xl">
          <motion.div className="">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: index * 0.1,
                  repeat: Infinity,
                }}
              >
                {letter}
              </motion.span>
            ))}
            !!
          </motion.div>
        </div>

        {/* FORM CONTAINER */}
        <form
          className="lg:h-full lg:w-1/2 flex flex-col gap-8 justify-center bg-red-50 rounded-xl text-xl p-16 relative"
          ref={formRef}
          onSubmit={sendEmail}
        >
          <span>Dear Pranjal Lakra,</span>

          <textarea
            name="user_message"
            rows={4}
            className="bg-red-100 rounded-md  border-b-2 border-b-black outline-none resize-none"
            required
          />

          <span>My email address is: </span>

          <input
            type="email"
            name="user_email"
            className="rounded-md bg-red-100  border-b-2 border-b-black outline-none resize-none"
            required
          />

          <span>Regards</span>

          <button className="bg-red-200 rounded font-semibold text-gray-600 p-4">
            Send
          </button>
          {success && (
            <p className=" text-green-600 font-semibold">
              Your message has been sent successfully!
            </p>
          )}
          {error && (
            <p className=" text-red-600 font-semibold">Something went wrong!</p>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
