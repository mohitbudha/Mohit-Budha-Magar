import React from "react";
import { motion } from "framer-motion";
import I from "../Photos/ma.png";

const Hero = () => {
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50, scale: 0.9, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50, scale: 0.9, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section
      id="home"
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-white overflow-hidden"
    >
      {/* Left Content */}
      <motion.div
        className="flex-1 text-center md:text-left space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInLeft}
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Hi, I’m <span className="text-blue-500">Mohit Budha Magar</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          A Passionate <span className="font-semibold">Web Developer</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto md:mx-0">
          I specialize in creating beautiful, functional, and user-friendly websites.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="#contact"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Hire Me
          </a>
          <a
            href="/cv.pdf"
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition"
          >
            Download CV
          </a>
        </div>
      </motion.div>

      {/* Profile Image */}
      <motion.div
        className="flex-1 mt-10 md:mt-0 flex justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInRight}
      >
        <img
          src={I}
          alt="Profile"
          className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-blue-500 shadow-lg transform transition duration-500 hover:scale-110 hover:border-blue-600"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
