"use client";

import Brain from "@/components/brain";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";

const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef(null);
  // const isSkillRefInView = useInView(skillRef, { once: true });
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef(null);
  // const isExperienceRefInView = useInView(experienceRef, { once: true });
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <motion.div
      className=" h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.5 }}
    >
      {/* CONTAINER */}
      <div className=" h-full overflow-scroll lg:flex" ref={containerRef}>
        {/* TEXT CONTAINER */}
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 xl:p-48 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64 lg:w-2/3 lg:pr-0 xl:w-1/2">
          {/* BIOGRAPHY CONTAINER */}
          <div className="flex flex-col gap-12 justify-center">
            {/* BIOGRAPHY TITLE */}
            <h1 className=" font-bold text-2xl">BIOGRAPHY</h1>
            {/* BIOGRAPHY DESCRIPTION */}
            <p className="text-lg">
              &nbsp;&nbsp;&nbsp;&nbsp; With an M.Sc. in Plant Biotechnology,
              I&apos;ve explored the intricacies of plant genetics to enhance
              sustainable agriculture. Venturing into Full Stack Web
              Development, I mastered HTML, CSS, JavaScript, Node.js, and
              MongoDB, blending analytical thinking from my scientific
              background with creative problem-solving.
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp; Transitioning into the dynamic field of
              web development, I&apos;m excited to contribute my diverse skills
              to innovative projects. My biography encapsulates a journey from
              plant biotechnology to full stack web development, reflecting a
              passion for continuous learning and a commitment to making
              meaningful contributions to evolving landscapes. Let&apos;s
              connect and explore opportunities to collaborate in this exciting
              realm.
            </p>
            {/* BIOGRAPHY QUOTE  */}
            <span className=" italic">
              &quot;To lose patience is to lose the battle.&quot; - MK Gandhi
            </span>
            {/* BIOGRAPHY SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>

          {/* SKILLS CONTAINER */}
          <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
            {/* SKILL TITLE  */}
            <motion.h2
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              // transition={{ delay: 0.2, duration: 0.4 }}
              className="font-bold text-2xl"
            >
              SKILLS
            </motion.h2>
            {/* SKILL LIST  */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              // transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                JavaScript
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                TypeScript
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                MongoDB
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                Express
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                React.js
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                Node.js
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                Next.js
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                HTML
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                CSS
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                Tailwind
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                MySQL
              </div>
              <div className=" w-fit rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-gray-700 hover:text-white">
                Git
              </div>
            </motion.div>
            {/* SKILL SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>

          {/* EXPERIENCE CONTAINER */}
          <div
            className="flex flex-col gap-12 justify-center"
            ref={experienceRef}
          >
            {/* EXPERIENCE TITLE  */}
            <motion.h2
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: 0 } : {}}
              // transition={{ delay: 0.2, duration: 0.4 }}
              className="font-bold text-2xl"
            >
              EXPERIENCES SO FAR
            </motion.h2>

            {/* EXPERIENCE LIST  */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: 0 } : {}}
              // transition={{ delay: 0.1, duration: 0.4 }}
              className=""
            >
              {/* EXPERIENCE LIST ITEM  */}
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className=" w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-s-lg rounded-b-lg">
                    Delta 2.0 by Apna College
                  </div>
                  {/* JOB DESCRIPTION */}
                  <div className="p-3 text-sm italic">
                    Aspiring to find a job in IT
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-600 text-sm font-semibold">
                    2022 - Present
                  </div>
                  {/* JOB LOCATION */}
                  <div className="p-3 w-fit rounded bg-white text-sm font-semibold">
                    Remote
                  </div>
                </div>
                {/* CENTER */}
                <div className=" w-1/6 flex justify-center">
                  {/* LINE  */}
                  <div className="w-1 h-full bg-gray-700 rounded relative flex justify-center">
                    {/* LINE CIRCLE  */}
                    <div className=" -top-2 absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className=" w-1/3"></div>
              </div>
              <div className="flex justify-between h-48 ">
                {/* LEFT */}
                <div className=" w-1/3 "></div>
                {/* CENTER */}
                <div className=" w-1/6 flex justify-center">
                  {/* LINE  */}
                  <div className="w-1 h-full bg-gray-700 rounded relative flex justify-center">
                    {/* LINE CIRCLE  */}
                    <div className=" -top-2 absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className=" w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-e-lg rounded-b-lg">
                    Web Developer
                  </div>
                  {/* JOB DESCRIPTION */}
                  <div className="p-3 text-sm italic">
                    Aspiring to find a job in Web Dev
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-600 text-sm font-semibold">
                    2023 - Present
                  </div>
                  {/* JOB LOCATION */}
                  <div className="p-3 w-fit rounded bg-white text-sm font-semibold">
                    Remote
                  </div>
                </div>
              </div>
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className=" w-1/3">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-s-lg rounded-b-lg">
                    Delta 2.0 by Apna College
                  </div>
                  {/* JOB DESCRIPTION */}
                  <div className="p-3 text-sm italic">
                    Aspiring to find a job in Web Dev
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-600 text-sm font-semibold">
                    2023 - 2024
                  </div>
                  {/* JOB LOCATION */}
                  <div className="p-3 w-fit rounded bg-white text-sm font-semibold">
                    Remote
                  </div>
                </div>
                {/* CENTER */}
                <div className=" w-1/6 flex justify-center">
                  {/* LINE  */}
                  <div className="w-1 h-full bg-gray-700 rounded relative flex justify-center">
                    {/* LINE CIRCLE  */}
                    <div className=" -top-2 absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className=" w-1/3"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SVG CONTAINER */}
        <div className=" hidden lg:block w-1/3 xl:w-1/2 sticky top-0 z-30">
          <Brain scrollYProgress={scrollYProgress}></Brain>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
