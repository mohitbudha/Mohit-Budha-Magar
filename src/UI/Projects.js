import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ProjectSection = () => {

  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {

    const fetchProjects = async () => {

      try {

        const res = await api.get("/projects");
        setProjects(res.data);

      } catch (err) {

        console.error("Error fetching projects:", err);

      }
    };

    fetchProjects();

  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 100, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="px-6 md:px-16 py-16 md:py-24 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
    >

      {/* Heading */}
      <motion.h2
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        My <span className="text-blue-500">Projects</span>
      </motion.h2>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >

        {projects.length > 0 ? (

          projects.slice(0, visibleProjects).map((project, index) => (

            <motion.div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl"
              variants={cardVariants}
            >

              <img
                src={project.img}
                alt={project.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 space-y-3">

                <h3 className="text-2xl font-bold">{project.title}</h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">

                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full"
                    >
                      {t}
                    </span>
                  ))}

                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                  View Project
                </a>

              </div>

            </motion.div>

          ))

        ) : (

          <p className="text-center text-gray-500">
            No projects available.
          </p>

        )}

      </motion.div>

      {/* Load More Button */}
      {visibleProjects < projects.length && (
        <div className="text-center mt-10">

          <button
            onClick={() => setVisibleProjects(visibleProjects + 3)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Load More
          </button>

        </div>
      )}

    </section>
  );
};

export default ProjectSection;