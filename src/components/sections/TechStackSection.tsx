/* eslint-disable @typescript-eslint/no-unused-vars */

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiAngular,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiFirebase,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiAdobelightroom,
  SiCanva,
  SiAdobe
} from 'react-icons/si';
import VN from '@/assets/vn.png';
import Image, { StaticImageData } from 'next/image';
import type { IconType } from "react-icons";
import { FaJsSquare } from 'react-icons/fa';

const techStack = {
  "Code & Creativity": [
    { name: "React", icon: SiReact, level: 95, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, level: 90, color: "#ffffff" },
    { name: "TypeScript", icon: SiTypescript, level: 88, color: "#3178C6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, level: 92, color: "#06B6D4" },
    { name: "Angular", icon: SiAngular, level: 85, color: "#DD0031" },
    { name: "HTML5", icon: SiHtml5, level: 95, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, level: 90, color: "#1572B6" },
    { name: "JavaScript", icon: FaJsSquare, level: 93, color: "#F7DF1E" },
    { name: "Firebase", icon: SiFirebase, level: 82, color: "#FFCA28" },
    { name: "Node.js", icon: SiNodedotjs, level: 87, color: "#339933" },
    { name: "Git", icon: SiGit, level: 92, color: "#F05032" },
    { name: "Github", icon: SiGithub, level: 92, color: "#ffffff" },
    { name: "Lightroom", icon: SiAdobelightroom, level: 88, color: "#31A8FF" },
    { name: "Canva", icon: SiCanva, level: 90, color: "#00C4CC" },
    { name: "Adobe", icon: SiAdobe, level: 87, color: "#FF0000" },
    { name: "VN Editor", icon: VN, level: 85, color: "#ffffff" }, // Image
  ]
};

type Skill = {
  name: string;
  icon: IconType | StaticImageData;
  level: number;
  color: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="techstack" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={categoryVariants}>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text pb-4">
            Technologies & Skills
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I use to build exceptional digital experiences.
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(techStack).map(([category, skills], categoryIndex) => {
            const displayedSkills = showAll ? skills : skills.slice(0, 8);
            const remainingSkills = showAll ? [] : skills.slice(8);

            return (
              <motion.div
                key={category}
                variants={categoryVariants}
                className="relative"
              >
                <motion.div
                  className="flex items-center mb-8"
                  variants={categoryVariants}
                >
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                  <h3 className="px-6 text-2xl font-bold gradient-text-reverse">
                    {category}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6"
                  variants={containerVariants}
                >
                  {displayedSkills.map((skill, skillIndex) => {
                    const IconComponent = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        whileHover={{
                          scale: 1.05,
                          y: -5,
                          boxShadow: '0 20px 40px rgba(79, 193, 198, 0.3)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative w-full"
                      >
                        <div className="glass p-4 sm:p-6 rounded-xl border border-gray-700 hover:border-accent transition-all duration-300 cursor-pointer h-full flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px]">
                          <div className="flex justify-center mb-3 sm:mb-4">
                            {"src" in skill.icon ? (
                              // It's an image
                              <Image
                                src={VN}
                                alt="VN Editor"
                                className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300 filter invert"
                              />
                            ) : (
                              // It's a react-icon component
                              <skill.icon
                                size={40}
                                className="group-hover:scale-110 transition-transform duration-300 sm:w-12 sm:h-12"
                                style={{ color: skill.color }}
                              />
                            )}
                          </div>

                          {/* Skill Name */}
                          <h4 className="text-sm sm:text-lg font-semibold text-white text-center mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300 leading-tight">
                            {skill.name}
                          </h4>

                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                        </div>
                      </motion.div>
                    );
                  })}

                  <AnimatePresence>
                    {showAll && remainingSkills.map((skill, skillIndex) => {
                      const IconComponent = skill.icon;
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            y: 0,
                            transition: { 
                              duration: 0.4,
                              delay: skillIndex * 0.1
                            }
                          }}
                          exit={{ opacity: 0, scale: 0.8, y: -20 }}
                          whileHover={{
                            scale: 1.05,
                            y: -5,
                            boxShadow: '0 20px 40px rgba(79, 193, 198, 0.3)'
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="group relative w-full"
                        >
                          <div className="glass p-4 sm:p-6 rounded-xl border border-gray-700 hover:border-accent transition-all duration-300 cursor-pointer h-full flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px]">
                            <div className="flex justify-center mb-3 sm:mb-4">
                              {"src" in skill.icon ? (
                                // It's an image
                                <Image
                                  src={VN}
                                  alt="VN Editor"
                                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300 filter invert"
                                />
                              ) : (
                                // It's a react-icon component
                                <skill.icon
                                  size={40}
                                  className="group-hover:scale-110 transition-transform duration-300 sm:w-12 sm:h-12"
                                  style={{ color: skill.color }}
                                />
                              )}
                            </div>

                            {/* Skill Name */}
                            <h4 className="text-sm sm:text-lg font-semibold text-white text-center mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300 leading-tight">
                              {skill.name}
                            </h4>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {!showAll && remainingSkills.length > 0 && (
                  <motion.div
                    className="flex justify-center mt-8"
                    variants={buttonVariants}
                  >
                    <motion.button
                      onClick={toggleShowAll}
                      className="group relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-accent  text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-900"
                      whileHover={{ 
                        // scale: 1.05,
                        boxShadow: '0 10px 30px rgba(79, 193, 198, 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {/* Background glow effect */}
                      <div 
                      className="absolute inset-0 bg-gradient-to-r from-accent to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>
                      
                      {/* Button content */}
                      <div className="relative flex items-center space-x-2">
                        <span>View More</span>
                        <motion.div
                          className="flex items-center"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.5,
                            ease: "easeInOut"
                          }}
                        >
                          <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M19 9l-7 7-7-7" 
                            />
                          </svg>
                        </motion.div>
                        {/* <div className="bg-white/20 text-xs px-2 py-1 rounded-full">
                          +{remainingSkills.length}
                        </div> */}
                      </div>

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -top-[2px] -bottom-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </motion.button>
                  </motion.div>
                )}

                {showAll && (
                  <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.button
                      onClick={toggleShowAll}
                      className="group relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold transition-all duration-300 hover:from-gray-500 hover:to-gray-600 hover:shadow-lg hover:shadow-gray-500/30 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 10px 30px rgba(107, 114, 128, 0.3)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative flex items-center space-x-2">
                        <span>View Less</span>
                        <motion.div
                          className="flex items-center"
                          animate={{ x: [0, -3, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.5,
                            ease: "easeInOut"
                          }}
                        >
                          <svg 
                            className="w-5 h-5 transform rotate-180" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M19 9l-7 7-7-7" 
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          variants={categoryVariants}
        >
          <div className="glass p-8 rounded-2xl border border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold gradient-text mb-6">
              Core Competencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">2+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">10+</div>
                <div className="text-gray-300">Technologies Mastered</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">25+</div>
                <div className="text-gray-300">Projects Delivered</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          variants={categoryVariants}
        >
          <div className="inline-flex items-center space-x-2 text-accent font-medium cursor-pointer hover:text-white transition-colors group">
            <span>🚀</span>
            <span>Always learning, always growing</span>
            <motion.span
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}