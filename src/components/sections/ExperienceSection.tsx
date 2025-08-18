'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    id: 1,
    company: 'Version Labs LLP.',
    role: 'Software engineer',
    period: '2024 - Present',
    location: 'Ahmedabad, India',
    description: 'Developer experienced in building scalable web applications. Joined as an early-stage team member to develop core products from scratch, working closely with founders to translate business requirements into effective solutions. Skilled in mentoring junior developers, implementing best practices, and optimizing performance. Started with diverse client projects, gaining hands-on experience and a strong foundation in professional software development.',
    achievements: [
      'Built 25+ responsive web applications',
      'Designed and implemented scalable solutions, improving system reliability and user experience.',
      'Mentored junior developers, enhancing team productivity and code quality.',
      'Contributed to end-to-end product development from concept to launch.'
    ],
    logo: '🚀',
    color: '#f59e0b'
  }
];

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
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const timelineVariants = {
  hidden: { height: 0 },
  visible: {
    height: '100%',
  },
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text-reverse mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-[#4fc1c6] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            My professional journey through various roles and companies, 
            building expertise and delivering impactful solutions.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700">
            <motion.div
              className="w-full bg-[#4fc1c6]"
              variants={timelineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative flex items-start"
                variants={itemVariants}
                custom={index}
              >
                <motion.div
                  className="absolute left-6 w-4 h-4 rounded-full border-4 border-[#4fc1c6] bg-black z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
                />

                <div className="ml-20 w-full">
                  <motion.div
                    className="glass p-6 rounded-lg border border-gray-700 hover:border-[#4fc1c6] transition-all duration-300"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 30px rgba(79, 193, 198, 0.2)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-2xl">
                          {exp.logo}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                          <h4 className="text-lg text-[#4fc1c6] font-semibold">{exp.role}</h4>
                        </div>
                      </div>
                      {/* <motion.button
                        className="text-gray-400 hover:text-[#4fc1c6] transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={20} />
                      </motion.button> */}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div>
                      <h5 className="text-sm font-semibold text-[#4fc1c6] mb-3">
                        Key Achievements:
                      </h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.li
                            key={achIndex}
                            className="flex items-start space-x-3 text-gray-300 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.3 + achIndex * 0.1 + 0.8 }}
                          >
                            <span className="w-1.5 h-1.5 bg-[#4fc1c6] rounded-full mt-2 flex-shrink-0"></span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center space-x-2 text-[#4fc1c6] font-medium cursor-pointer hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Want to know more about my experience?</span>
            <ExternalLink size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}