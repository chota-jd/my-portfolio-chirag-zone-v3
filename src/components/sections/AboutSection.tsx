'use client';

export default function AboutSection() {
  return (
    <section id="about" className="py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">About Me</h2>
          <div className="w-24 h-1 bg-[#4fc1c6] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                As a developer with a love for creating innovative digital solutions. My journey in technology started with
                curiosity and has evolved into a career dedicated to building exceptional user experiences.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                I specialize in full-stack development, with expertise in modern JavaScript frameworks, cloud technologies,
                and scalable architecture design. I believe in writing clean, maintainable code and staying up-to-date
                with the latest industry trends.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community. I&apos;m always eager to take on new challenges and
                collaborate on exciting projects.
              </p>

              <div className="grid grid-cols-3 gap-0 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4fc1c6] mb-2">2+</div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4fc1c6] mb-2">30+</div>
                  <div className="text-gray-400 text-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4fc1c6] mb-2">100%</div>
                  <div className="text-gray-400 text-sm">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold gradient-text-reverse mb-8">What I Bring to the Table</h3>

            <div className="space-y-6">
              <div className="p-6 glass rounded-lg border border-gray-700 hover:border-[#4fc1c6]/60 hover:shadow-[0_0_30px_rgba(79,193,198,0.2)] transition-all duration-300">
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-accent rounded-full mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Problem-solving mindset</h4>
                      <p className="text-sm">Analytical approach with attention to detail and creative solutions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-accent rounded-full mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Strong communication</h4>
                      <p className="text-sm">Excellent collaboration skills and clear technical documentation</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-accent rounded-full mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Continuous learning</h4>
                      <p className="text-sm">Always adapting to new technologies and industry best practices</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-accent rounded-full mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Quality commitment</h4>
                      <p className="text-sm">Dedicated to delivering high-quality, scalable solutions</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="text-center p-6 glass rounded-lg border border-gray-700 hover:border-[#4fc1c6]/60 hover:shadow-[0_0_30px_rgba(79,193,198,0.2)] transition-all duration-300">
                <h4 className="text-lg font-semibold text-accent mb-3">Ready to collaborate?</h4>
                <p className="text-gray-300 text-sm mb-4">Let&apos;s build something amazing together</p>
                <button
                  type="button"
                  className="group relative overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-accent text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-[0.98]"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center space-x-2">
                    <span>Get In Touch</span>
                  </div>
                  <div className="absolute inset-0 -top-[2px] -bottom-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
