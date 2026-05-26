'use client';

import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const experiences = [
  {
    id: 1,
    company: 'Version Labs LLP.',
    role: 'Software engineer',
    period: '2024 - Present',
    location: 'Ahmedabad, India',
    description:
      'Developer experienced in building scalable web applications. Joined as an early-stage team member to develop core products from scratch, working closely with founders to translate business requirements into effective solutions. Skilled in mentoring junior developers, implementing best practices, and optimizing performance. Started with diverse client projects, gaining hands-on experience and a strong foundation in professional software development.',
    achievements: [
      'Built 30+ responsive web applications',
      'Designed and implemented scalable solutions, improving system reliability and user experience.',
      'Mentored junior developers, enhancing team productivity and code quality.',
      'Contributed to end-to-end product development from concept to launch.',
    ],
    logo: '🚀',
    color: '#f59e0b',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          titleClassName="gradient-text-reverse"
          subtitle="My professional journey through various roles and companies, building expertise and delivering impactful solutions."
        >
          Work Experience
        </SectionHeading>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700">
            <div className="w-full h-full bg-[#4fc1c6]" />
          </div>

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative flex items-start">
                <div className="absolute left-6 w-4 h-4 rounded-full border-4 border-[#4fc1c6] bg-black z-10 scale-100" />

                <div className="ml-20 w-full">
                  <div className="glass p-6 rounded-lg border border-gray-700 hover:border-[#4fc1c6] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(79,193,198,0.2)] transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-2xl">{exp.logo}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                          <h4 className="text-lg text-[#4fc1c6] font-semibold">{exp.role}</h4>
                        </div>
                      </div>
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

                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                    <div>
                      <h5 className="text-sm font-semibold text-[#4fc1c6] mb-3">Key Achievements:</h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start space-x-3 text-gray-300 text-sm">
                            <span className="w-1.5 h-1.5 bg-[#4fc1c6] rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            type="button"
            className="inline-flex items-center space-x-2 text-[#4fc1c6] font-medium cursor-pointer hover:text-white transition-colors hover:scale-105 active:scale-95"
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Want to know more about my experience?</span>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
