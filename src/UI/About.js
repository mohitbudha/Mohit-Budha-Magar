import React from "react";
import { motion } from "framer-motion";
import AboutImg from "../Photos/am.png";
import htmlLogo from "../Photos/html.png";
import cssLogo from "../Photos/css.png";
import jsLogo from "../Photos/java.png";
import reactLogo from "../Photos/react1.png";

const AboutMe = () => {
  return (
    <section
      id="about"
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-24 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white overflow-hidden"
    >
      {/* Left Image with Animation */}
      <motion.div
        className="flex-1 text-center md:text-left space-y-6 "
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}  // once=false to repeat animation
        transition={{ duration: 1, ease: "easeOut" }}

>           <h2 className="text-4xl md:text-5xl font-bold">
          About <span className="text-blue-500">Me</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
          I’m a passionate <span className="font-semibold">Web Developer</span> who loves building
          interactive and responsive websites using modern technologies.
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          Skilled in both frontend and backend development, always learning and
          improving to deliver the best digital experiences.
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-6">
          {[
            { src: htmlLogo, name: "HTML" },
            { src: cssLogo, name: "CSS" },
            { src: jsLogo, name: "JavaScript" },
            { src: reactLogo, name: "React" },
          ].map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center hover:scale-110 transition-transform duration-300"
            >
              <img
                src={skill.src}
                alt={skill.name}
                className="w-12 h-12 border border-blue-500 rounded-lg mb-2"
              />
              <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
       
      </motion.div>

      {/* Right Content with Animation */}
      <motion.div
        className="flex-1 flex justify-center mb-8 md:mb-0"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}  // once=false here also
        transition={{ duration: 1, ease: "easeOut" }}
      >
     
         <img
          src={AboutImg}
          alt="About Me"
          className="w-68 h-68 md:w-96 md:h-96 object-cover border-2 border-blue-500 rounded-lg shadow-lg"
        />
      </motion.div>
    </section>
  );
};

export default AboutMe;
