import { Stethoscope, GraduationCap, Gavel, ShoppingBag, Trophy, TentTree } from 'lucide-react';

const industries = [
  { name: 'Healthcare', icon: Stethoscope },
  { name: 'Sports', icon: Trophy },
  { name: 'Travel', icon: TentTree },
  { name: 'Education', icon: GraduationCap },
  { name: 'Legal', icon: Gavel },
  { name: 'Retail', icon: ShoppingBag },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="industries-section">
      <div className="relative z-10">
        <h2 className="industries-title">
          Industries I <span className="other-accent">Worked In.</span>
        </h2>
        
        <div className="industries-grid">
          {industries.map((industry) => (
            <div key={industry.name} className="industry-card">
              <div className="industry-icon-wrap">
                <industry.icon size={60} strokeWidth={1.25} />
              </div>
              <div className="industry-name">{industry.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
