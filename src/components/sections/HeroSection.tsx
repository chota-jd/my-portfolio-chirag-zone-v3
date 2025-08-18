/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Photo from '@/assets/photo.jpeg';
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openResume = () => {
    // Replace with actual resume URL
    window.open('/resume.pdf', '_blank');
  };

  return (
<section id="home" className="min-h-0 sm:min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left side - Avatar */}
          <motion.div
            className="flex justify-center lg:justify-end order-2 lg:order-1 pb-5"
            variants={avatarVariants}
          >
            <div className="relative">
              {/* Glowing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#4fc1c6] glow"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
              />

              {/* Avatar container - Made responsive */}
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-[#4fc1c6] overflow-hidden max-w-[calc(100vw-2rem)] max-h-[calc(100vw-2rem)]">
                <Image
                  src={Photo}
                  alt="Chirag - Developer"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Target icon */}
                <motion.div
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white rounded-full relative">
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            className="text-center lg:text-left order-1 lg:order-2"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center justify-center lg:justify-start mb-4"
              variants={itemVariants}
            >
              {/* <span className="text-xl sm:text-2xl mr-2">👋</span> */}
              <span className="text-lg sm:text-xl text-[#4fc1c6] font-medium">Hello, I&apos;m</span>
            </motion.div>

            <motion.h1
              className="text-6xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text pb-3 leading-tight"
              variants={itemVariants}
            >
              Chirag Prajapati
            </motion.h1>

            <motion.div
              className="text-lg sm:text-xl text-gray-300 mb-6 font-medium"
              variants={itemVariants}
            >
              Passionate • Curious • Innovative
            </motion.div>

            <motion.p
              className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              Crafting world-class digital experiences with cutting-edge technologies.
              I transform ideas into powerful, scalable solutions that make a difference.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8 w-full md:flex-col lg:flex-row xl:flex-row"
              variants={itemVariants}
            >
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
                onClick={scrollToContact}

              >
                {/* Background glow effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-accent to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>

                {/* Button content */}
                <div className="relative flex items-center space-x-2 justify-center">
                  <MessageCircle size={20} />
                  <span>Let&apos;s Connect</span>
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

              {/* <motion.button
                className="group relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-accent  text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-900"
                whileHover={{
                  boxShadow: '0 10px 30px rgba(79, 193, 198, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={openResume}

              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-accent to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>

                <div className="relative flex items-center space-x-2 justify-center">
                  <Download size={20} />                    
                  <span>View Resume</span>
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

                <div className="absolute inset-0 -top-[2px] -bottom-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.button> */}
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-start space-x-4 sm:space-x-6"
              variants={itemVariants}
            >
              <motion.a
                href="https://github.com/chota-jd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#4fc1c6] hover:text-[#4fc1c6] glow-hover transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} className="sm:w-6 sm:h-6" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/chirag-prajapati-a5ab7a268/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#4fc1c6] hover:text-[#4fc1c6] glow-hover transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} className="sm:w-6 sm:h-6" />
              </motion.a>

              <motion.button
                onClick={scrollToContact}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#4fc1c6] hover:text-[#4fc1c6] glow-hover transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} className="sm:w-6 sm:h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}