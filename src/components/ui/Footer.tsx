/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/chota-jd',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/chirag-prajapati-a5ab7a268/',
    icon: Linkedin,
  },
  {
    name: 'Email',
    url: 'mailto:chirag.work@gmail.com',
    icon: Mail,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo/Name */}
          {/* <motion.div
            className="text-2xl font-bold text-[#4fc1c6] cursor-pointer"
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Chirag
          </motion.div> */}

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#4fc1c6] hover:text-[#4fc1c6] transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  boxShadow: '0 0 20px rgba(79, 193, 198, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon size={18} />
              </motion.a>
            ))}
          </div>

          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

          <div className="flex items-center text-gray-400 text-sm gap-2">
            <span>© {currentYear} Chirag Prajapati </span>
            <motion.span
              className="ml-auto text-gray-500"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            >
              →
            </motion.span>
            <span>All rights reserved.</span>

          </div>

          <motion.button
            onClick={scrollToTop}
            className="text-xs text-gray-500 hover:text-[#4fc1c6] transition-colors cursor-pointer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑ Back to top
          </motion.button>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#4fc1c6] rounded-full opacity-5 blur-3xl" />
      </div>
    </footer>
  );
}