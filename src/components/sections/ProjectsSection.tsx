'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, Tag, Button } from 'antd';
import { Github, ExternalLink, Eye } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution built with Next.js, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and admin dashboard.',
    image: '/api/placeholder/400/250',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/example/ecommerce',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    category: 'Full Stack'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React and Socket.io.',
    image: '/api/placeholder/400/250',
    technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/example/taskmanager',
    liveUrl: 'https://taskmanager-demo.herokuapp.com',
    featured: true,
    category: 'Web App'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps. Integrates with multiple weather APIs for accurate data.',
    image: '/api/placeholder/400/250',
    technologies: ['Vue.js', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    githubUrl: 'https://github.com/example/weather',
    liveUrl: 'https://weather-dashboard-demo.netlify.app',
    featured: false,
    category: 'Frontend'
  },
  {
    id: 4,
    title: 'Social Media Analytics',
    description: 'A comprehensive analytics platform for social media managers to track engagement, analyze trends, and generate reports across multiple platforms.',
    image: '/api/placeholder/400/250',
    technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/example/analytics',
    liveUrl: 'https://analytics-demo.com',
    featured: true,
    category: 'Full Stack'
  },
  {
    id: 5,
    title: 'Mobile Fitness Tracker',
    description: 'A React Native mobile app for tracking workouts, nutrition, and health metrics. Features offline sync and integration with wearable devices.',
    image: '/api/placeholder/400/250',
    technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit'],
    githubUrl: 'https://github.com/example/fitness',
    liveUrl: 'https://apps.apple.com/fitness-tracker',
    featured: false,
    category: 'Mobile'
  },
  {
    id: 6,
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool that helps creators generate blog posts, social media content, and marketing copy using advanced language models.',
    image: '/api/placeholder/400/250',
    technologies: ['Next.js', 'OpenAI API', 'Prisma', 'Vercel', 'Stripe'],
    githubUrl: 'https://github.com/example/ai-content',
    liveUrl: 'https://ai-content-generator.com',
    featured: false,
    category: 'AI/ML'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-[#4fc1c6] mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects that demonstrate 
            my skills in various technologies and problem-solving approaches.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
        >
                     {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card
                className="h-full bg-gray-900 border-gray-700 overflow-hidden hover:border-[#4fc1c6] transition-all duration-300"
                cover={
                  <div className="relative overflow-hidden h-48">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <div className="text-6xl opacity-50">🚀</div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#4fc1c6] flex items-center justify-center text-black hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={20} />
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#4fc1c6] flex items-center justify-center text-black hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>
                }
              >
                <div className="p-2">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#4fc1c6] transition-colors">
                      {project.title}
                    </h3>
                    <Tag color="cyan" className="text-xs">
                      {project.category}
                    </Tag>
                  </div>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Tag
                        key={tech}
                        className="text-xs bg-gray-800 border-gray-600 text-gray-300"
                      >
                        {tech}
                      </Tag>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      size="small"
                      icon={<Github size={16} />}
                      className="border-[#4fc1c6] text-[#4fc1c6] hover:bg-[#4fc1c6] hover:text-black"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      Code
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      icon={<Eye size={16} />}
                      className="bg-[#4fc1c6] border-[#4fc1c6]"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      Live Demo
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold gradient-text-reverse mb-8 text-center">
            Other Projects
          </h3>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={containerVariants}
          >
                         {otherProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card
                  className="h-full bg-gray-900 border-gray-700 hover:border-[#4fc1c6] transition-all duration-300"
                  size="small"
                >
                  <div className="p-2">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white group-hover:text-[#4fc1c6] transition-colors">
                        {project.title}
                      </h4>
                      <Tag color="cyan" className="text-xs">
                        {project.category}
                      </Tag>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Tag
                          key={tech}
                          className="text-xs bg-gray-800 border-gray-600 text-gray-300"
                        >
                          {tech}
                        </Tag>
                      ))}
                      {project.technologies.length > 3 && (
                        <Tag className="text-xs bg-gray-800 border-gray-600 text-gray-300">
                          +{project.technologies.length - 3}
                        </Tag>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#4fc1c6] transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={18} />
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#4fc1c6] transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={18} />
                      </motion.a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center space-x-2 text-[#4fc1c6] font-medium cursor-pointer hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github size={20} />
            <span>View all projects on GitHub</span>
            <ExternalLink size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}