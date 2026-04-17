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
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
                  variants={containerVariants}
                >
                  {displayedSkills.map((skill, skillIndex) => {
                    return (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        className="group relative w-full h-full"
                      >
                        <div className="relative p-6 rounded-2xl bg-[#0a0a0f] border border-white/5 overflow-hidden transition-all duration-500 h-full flex flex-col items-center justify-center min-h-[140px] hover:border-white/10 z-0">
                          {/* Ambient Glowing Orb */}
                          <div 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-700 blur-2xl z-0 pointer-events-none"
                            style={{ backgroundColor: skill.color }}
                          />
                          {/* High-tech top edge gradient */}
                          <div 
                            className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none"
                            style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
                          />
                          {/* Subtle surface gradient */}
                          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
                          
                          {/* Hover Glow Shadow */}
                          <div 
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                            style={{ boxShadow: `inset 0 0 20px -10px ${skill.color}40`, border: `1px solid ${skill.color}10` }}
                          />

                          <div className="relative z-10 flex flex-col items-center">
                            <div className="mb-4 transform group-hover:-translate-y-1 transition-transform duration-500">
                              {"src" in skill.icon ? (
                                <Image
                                  src={VN}
                                  alt="VN Editor"
                                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain filter invert opacity-70 group-hover:opacity-100 transition-all duration-300 drop-shadow-sm"
                                />
                              ) : (
                                <skill.icon
                                  size={44}
                                  className="opacity-70 group-hover:opacity-100 transition-all duration-300"
                                  style={{ color: skill.color, filter: `drop-shadow(0 4px 6px rgba(0,0,0,0.4))` }}
                                />
                              )}
                            </div>
                            <h4 className="text-gray-400 font-medium group-hover:text-white transition-colors duration-300 text-sm sm:text-base tracking-wide">
                              {skill.name}
                            </h4>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  <AnimatePresence>
                    {showAll && remainingSkills.map((skill, skillIndex) => {
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
                          className="group relative w-full h-full"
                        >
                          <div className="relative p-6 rounded-2xl bg-[#0a0a0f] border border-white/5 overflow-hidden transition-all duration-500 h-full flex flex-col items-center justify-center min-h-[140px] hover:border-white/10 z-0">
                            {/* Ambient Glowing Orb */}
                            <div 
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-700 blur-2xl z-0 pointer-events-none"
                              style={{ backgroundColor: skill.color }}
                            />
                            {/* High-tech top edge gradient */}
                            <div 
                              className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none"
                              style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
                            />
                            {/* Subtle surface gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
                            
                            {/* Hover Glow Shadow */}
                            <div 
                              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                              style={{ boxShadow: `inset 0 0 20px -10px ${skill.color}40`, border: `1px solid ${skill.color}10` }}
                            />

                            <div className="relative z-10 flex flex-col items-center">
                              <div className="mb-4 transform group-hover:-translate-y-1 transition-transform duration-500">
                                {"src" in skill.icon ? (
                                  <Image
                                    src={VN}
                                    alt="VN Editor"
                                    className="w-10 h-10 sm:w-11 sm:h-11 object-contain filter invert opacity-70 group-hover:opacity-100 transition-all duration-300 drop-shadow-sm"
                                  />
                                ) : (
                                  <skill.icon
                                    size={44}
                                    className="opacity-70 group-hover:opacity-100 transition-all duration-300"
                                    style={{ color: skill.color, filter: `drop-shadow(0 4px 6px rgba(0,0,0,0.4))` }}
                                  />
                                )}
                              </div>
                              <h4 className="text-gray-400 font-medium group-hover:text-white transition-colors duration-300 text-sm sm:text-base tracking-wide">
                                {skill.name}
                              </h4>
                            </div>
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

        <div className="relative mt-40 mb-32 w-full flex flex-col items-center justify-center">
           {/* Pure Cinematic Typographic Lockup */}
           <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
             <div className="w-[150%] md:w-[80%] h-[200px] md:h-[400px] bg-[#4fc1c6] blur-[120px] md:blur-[200px] rounded-[100%] opacity-[0.15] mix-blend-screen" />
           </div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32"
           >
             {/* Stat 1 */}
             <div className="flex flex-col items-center group cursor-default">
               <div className="relative">
                 <span className="text-8xl md:text-[140px] leading-none font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-[#050505] tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all duration-700">
                   2<span className="text-[#4fc1c6] drop-shadow-[0_0_30px_rgba(79,193,198,0.4)] group-hover:drop-shadow-[0_0_50px_rgba(79,193,198,0.8)] transition-all duration-700">+</span>
                 </span>
               </div>
               <div className="mt-6 flex flex-col items-center">
                 <span className="text-[#4fc1c6] font-extrabold tracking-[0.5em] uppercase text-sm md:text-base drop-shadow-[0_0_10px_rgba(79,193,198,0.3)] group-hover:text-cyan-300 transition-colors duration-500">
                   Years
                 </span>
                 <span className="mt-2 text-gray-500 font-medium tracking-[0.4em] uppercase text-[10px] md:text-sm group-hover:text-gray-400 transition-colors duration-500">
                   Experience
                 </span>
               </div>
             </div>
             
             {/* Divider */}
             <motion.div 
               initial={{ height: 0, opacity: 0 }}
               whileInView={{ height: 200, opacity: 0.5 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 0.4, ease: "anticipate" }}
               className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-[#4fc1c6] to-transparent" 
             />
             <motion.div 
               initial={{ width: 0, opacity: 0 }}
               whileInView={{ width: 200, opacity: 0.5 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 0.4, ease: "anticipate" }}
               className="md:hidden h-[1px] bg-gradient-to-r from-transparent via-[#4fc1c6] to-transparent my-4" 
             />

             {/* Stat 2 */}
             <div className="flex flex-col items-center group cursor-default">
               <div className="relative">
                 <span className="text-8xl md:text-[140px] leading-none font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-[#050505] tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all duration-700">
                   30<span className="text-[#4fc1c6] drop-shadow-[0_0_30px_rgba(79,193,198,0.4)] group-hover:drop-shadow-[0_0_50px_rgba(79,193,198,0.8)] transition-all duration-700">+</span>
                 </span>
               </div>
               <div className="mt-6 flex flex-col items-center">
                 <span className="text-[#4fc1c6] font-extrabold tracking-[0.5em] uppercase text-sm md:text-base drop-shadow-[0_0_10px_rgba(79,193,198,0.3)] group-hover:text-cyan-300 transition-colors duration-500">
                   Projects
                 </span>
                 <span className="mt-2 text-gray-500 font-medium tracking-[0.4em] uppercase text-[10px] md:text-sm group-hover:text-gray-400 transition-colors duration-500">
                   Delivered
                 </span>
               </div>
             </div>
           </motion.div>
        </div>

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