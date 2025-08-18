'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';



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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};



export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-10 px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-[#4fc1c6] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6">
              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                As a developer with a love for creating innovative digital solutions.
                My journey in technology started with curiosity and has evolved into a career
                dedicated to building exceptional user experiences.
              </motion.p>

              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                I specialize in full-stack development, with expertise in modern JavaScript
                frameworks, cloud technologies, and scalable architecture design. I believe
                in writing clean, maintainable code and staying up-to-date with the latest
                industry trends.
              </motion.p>

              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                variants={itemVariants}
              >
                When I&apos;m not coding, you can find me exploring new technologies, contributing
                to open-source projects, or sharing knowledge with the developer community.
                I&apos;m always eager to take on new challenges and collaborate on exciting projects.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-0 pt-8"
                variants={itemVariants}
              >
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-bold text-[#4fc1c6] mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    2+
                  </motion.div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-bold text-[#4fc1c6] mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    25+
                  </motion.div>
                  <div className="text-gray-400 text-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-bold text-[#4fc1c6] mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    100%
                  </motion.div>
                  <div className="text-gray-400 text-sm">Client Satisfaction</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - What I Bring */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-2xl font-bold gradient-text-reverse mb-8"
              variants={itemVariants}
            >
              What I Bring to the Table
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                className="p-6 glass rounded-lg border border-gray-700"
                variants={itemVariants}
                whileHover={{
                  borderColor: '#4fc1c6',
                  boxShadow: '0 0 30px rgba(79, 193, 198, 0.2)'
                }}
              >
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-accent rounded-full mr-4 mt-1 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Problem-solving mindset</h4>
                      <p className="text-sm">Analytical approach with attention to detail and creative solutions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-accent rounded-full mr-4 mt-1 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Strong communication</h4>
                      <p className="text-sm">Excellent collaboration skills and clear technical documentation</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-accent rounded-full mr-4 mt-1 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Continuous learning</h4>
                      <p className="text-sm">Always adapting to new technologies and industry best practices</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-accent rounded-full mr-4 mt-1 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Quality commitment</h4>
                      <p className="text-sm">Dedicated to delivering high-quality, scalable solutions</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="text-center p-6 glass rounded-lg border border-gray-700"
                variants={itemVariants}
                whileHover={{
                  borderColor: '#4fc1c6',
                  boxShadow: '0 0 30px rgba(79, 193, 198, 0.2)'
                }}
              >
                <h4 className="text-lg font-semibold text-accent mb-3">
                  Ready to collaborate?
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Let&apos;s build something amazing together
                </p>
                <motion.button
                  className="group relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-accent  text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-900"
                  whileHover={{
                    // scale: 1.05,
                    boxShadow: '0 10px 30px rgba(79, 193, 198, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {/* Background glow effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-accent to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>

                  {/* Button content */}
                  <div className="relative flex items-center space-x-2">
                    <span>Get In Touch</span>
                    <motion.div
                      className="flex items-center"
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                    >
                    </motion.div>
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-[2px] -bottom-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}