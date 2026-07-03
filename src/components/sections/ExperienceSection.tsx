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
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-section-inner relative z-10">
        <h2 className="experience-title text-white">
          Work <span className="other-accent">Experience.</span>
        </h2>

        <div className="experience-list">
          {experiences.map((exp) => (
            <article key={exp.id} className="experience-row">
              <div className="experience-entry">
                <div className="experience-rail" aria-hidden="true">
                  <span className="experience-rail-marker" />
                  <span className="experience-rail-line" />
                </div>

                <div className="experience-entry-body">
                  <div className="experience-company-wrap experience-headline-wrap">
                    <div>
                      <h3 className="experience-company text-white">{exp.company}</h3>
                      <span className="experience-role text-accent-orange">{exp.role}</span>
                    </div>
                  </div>

                  <div className="experience-meta-row text-text-muted">
                    <span>{exp.period}</span>
                    <span aria-hidden="true">•</span>
                    <span>{exp.location}</span>
                  </div>

                  <div className="experience-detail-wrap">
                    <p className="experience-desc text-white/80">{exp.description}</p>

                    <h4 className="experience-achievements-title text-accent-orange">Key Achievements</h4>
                    <ul className="experience-achievements-list">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="experience-achievement-item text-white/90">
                          <span
                            className="experience-achievement-bullet bg-accent-orange shadow-[0_0_10px_rgba(255,30,0,0.55)]"
                            aria-hidden="true"
                          />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#contact" className="inline-flex cursor-pointer">
            <ChrHover text="Want to know more? Contact me 🡺" />
          </a>
        </div>
      </div>
    </section>
  );
}
