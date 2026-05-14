'use client';

import { Stethoscope, GraduationCap, Gavel, ShoppingBag, Trophy, TentTree } from 'lucide-react';

const industries = [
  { name: 'Healthcare', color: '#4fc1c6', icon: Stethoscope },
  { name: 'Sports', color: '#f59e42', icon: Trophy },
  { name: 'Travel', color: '#a259f7', icon: TentTree },
  { name: 'Education', color: '#f5426c', icon: GraduationCap },
  { name: 'Legal', color: '#42f5b9', icon: Gavel },
  { name: 'Retail', color: '#f5e642', icon: ShoppingBag },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Industries I Worked In</h2>
          <div className="w-24 h-1 bg-[#4fc1c6] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-12 justify-items-center">
          {industries.map((industry) => (
            <div key={industry.name} className="flex flex-col items-center group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mb-3 flex items-center justify-center transition-transform duration-700 ease-out group-hover:rotate-[360deg]">
                <industry.icon size={90} color={industry.color} strokeWidth={2.5} />
              </div>
              <div className="mt-1 text-base sm:text-lg font-semibold text-white text-center">{industry.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
