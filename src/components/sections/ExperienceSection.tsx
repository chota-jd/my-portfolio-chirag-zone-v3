import { ChrHover } from '@/components/ui/ChrHover';

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
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="experience-section">
      <div className="relative z-10">
        <h2 className="experience-title">
          Work <span className="other-accent">Experience.</span>
        </h2>

        <div className="experience-list">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-row">
              <div className="experience-period">{exp.period}</div>
              
              <div className="experience-company-wrap">
                <h3 className="experience-company">{exp.company}</h3>
                <span className="experience-role">{exp.role}</span>
                <span className="experience-company-meta">{exp.location}</span>
              </div>

              <div className="experience-detail-wrap">
                <p className="experience-desc">{exp.description}</p>
                
                <h4 className="experience-achievements-title">Key Achievements</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="experience-achievement-item">
                      <span className="experience-achievement-bullet" style={{ fontFamily: 'sans-serif' }}>→</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            style={{ display: 'inline-flex', cursor: 'pointer' }}
          >
            <ChrHover text="Want to know more? Contact me 🡺" />
          </a>
        </div>
      </div>
    </section>
  );
}
