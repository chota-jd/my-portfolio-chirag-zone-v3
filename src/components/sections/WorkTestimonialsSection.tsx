/* eslint-disable @next/next/no-img-element */
'use client';

const testimonials = [
  {
    quote: "Working with you was a fantastic experience. Your attention to detail and commitment to quality are unmatched!",
    name: "Jane Doe",
    title: "Product Manager, HealthTech Inc.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "You brought our vision to life with creativity and technical expertise. Highly recommended!",
    name: "John Smith",
    title: "CTO, FitLife Solutions",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "A true professional who delivers on time and exceeds expectations every time.",
    name: "Emily Chen",
    title: "Lead Designer, EduSpark",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    quote: "Your work ethic and positive attitude made a huge difference in our project’s success.",
    name: "Carlos Rivera",
    title: "Project Lead, LegalEase",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg"
  }
];

export default function WorkTestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Work Testimonials
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#4fc1c6] via-cyan-400 to-[#a259f7] mx-auto rounded-full" />
        </div>
        <div className="relative flex flex-col items-center">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-[#4fc1c6] via-cyan-400 to-[#a259f7] opacity-30 z-0" style={{transform: 'translateY(-50%)'}} />
          <div className="flex flex-row flex-wrap justify-center gap-12 w-full z-10">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col items-center relative min-w-[260px] max-w-xs">
                {/* Avatar with glow */}
                <div className="relative mb-4">
                  <span className="absolute inset-0 rounded-full blur-xl bg-gradient-to-tr from-[#4fc1c6] via-cyan-400 to-[#a259f7] opacity-40 scale-110" />
                  <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover relative z-10" />
                </div>
                <div className="relative mb-4">
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-tr from-[#4fc1c6] to-[#a259f7] opacity-30 rounded-full blur-lg z-0" />
                  <blockquote className="relative z-10 px-6 py-4 bg-gradient-to-br from-[#23272f] to-[#18181b] text-gray-100 italic rounded-2xl shadow-xl border border-cyan-900/30 before:content-[''] before:absolute before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:w-6 before:h-6 before:bg-gradient-to-br before:from-[#23272f] before:to-[#18181b] before:rounded-br-3xl before:rotate-45">
                    “{t.quote}”
                  </blockquote>
                </div>
                <div className="font-semibold text-white text-lg text-center drop-shadow-md">{t.name}</div>
                <div className="text-sm text-cyan-300 text-center mb-2">{t.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}